import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus, Edit, Save, Trash2, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { ComponentInfo, ComponentGroup, ComponentState } from '../types';
import { getStorageKeys, isLocalStorageAvailable } from '../utils/storage';
import { defaultConfig } from '../config';
import { todoComponentRegistration } from '../registrations/todoComponents';
import '../styles/devtools.css';

// Define item types for drag and drop
const ItemTypes = {
  COMPONENT: 'component',
  GROUP: 'group'
};

// Get storage keys from config
const { STORAGE_KEY, COLLAPSED_GROUPS_KEY, UNGROUPED_COLLAPSED_KEY } = getStorageKeys(defaultConfig);

// Get initial state from registration
const initialState = todoComponentRegistration.getInitialState(defaultConfig);

// Draggable component card
interface ComponentCardProps {
  componentId: string;
  component: ComponentInfo;
  index: number;
}

const ComponentCard = ({ componentId, component, index }: ComponentCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { id: componentId, sourceId: 'ungrouped', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  
  drag(ref);
  
  return (
    <div 
      ref={ref} 
      className={`mb-4 ${isDragging ? 'opacity-50' : ''}`}
      data-handler-id={componentId}
    >
      <Link
        to={component.path}
        className="devtools-card"
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <h2 className="devtools-card-title">
          {component.name}
        </h2>
        <p className="devtools-card-description">{component.description}</p>
      </Link>
    </div>
  );
};

// Draggable component card within a group
interface GroupComponentCardProps {
  componentId: string;
  component: ComponentInfo;
  groupId: string;
  index: number;
}

const GroupComponentCard = ({ componentId, component, groupId, index }: GroupComponentCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { id: componentId, sourceId: groupId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  
  drag(ref);
  
  return (
    <div 
      ref={ref} 
      className={`mb-4 ${isDragging ? 'opacity-50' : ''}`}
      data-handler-id={componentId}
    >
      <Link
        to={component.path}
        className="devtools-card"
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <h2 className="devtools-card-title">
          {component.name}
        </h2>
        <p className="devtools-card-description">{component.description}</p>
      </Link>
    </div>
  );
};

// Droppable component container
interface ComponentContainerProps {
  containerId: string;
  componentIds: string[];
  components: Record<string, ComponentInfo>;
  onDrop: (item: { id: string; sourceId: string; index: number }, targetId: string, targetIndex: number) => void;
  className?: string;
}

const ComponentContainer = ({ containerId, componentIds, components, onDrop, className = '' }: ComponentContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item: { id: string; sourceId: string; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      
      // Don't replace items with themselves
      if (item.sourceId === containerId) {
        return;
      }
      
      // Determine where to insert the dropped item
      const targetIndex = componentIds.length;
      
      onDrop(item, containerId, targetIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });
  
  drop(ref);
  
  return (
    <div 
      ref={ref} 
      className={`p-2 ${isOver ? 'bg-blue-50' : ''} ${className}`}
    >
      {componentIds.map((componentId, index) => {
        const component = components[componentId];
        if (!component) return null;
        
        return containerId === 'ungrouped' ? (
          <ComponentCard 
            key={componentId} 
            componentId={componentId} 
            component={component} 
            index={index} 
          />
        ) : (
          <GroupComponentCard 
            key={componentId} 
            componentId={componentId} 
            component={component} 
            groupId={containerId}
            index={index} 
          />
        );
      })}
      {componentIds.length === 0 && (
        <div className="text-gray-400 text-center p-4">
          Drop components here
        </div>
      )}
    </div>
  );
};

// Draggable group container
interface GroupContainerProps {
  index: number;
  onMoveGroup: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const GroupContainer = ({ index, onMoveGroup, children }: GroupContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.GROUP,
    item: { type: ItemTypes.GROUP, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.GROUP,
    hover: (item: { type: string; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onMoveGroup(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`bg-gray-50 rounded-lg shadow-md transition-all duration-300 ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move' }}
    >
      {children}
    </div>
  );
};

export default function ComponentIndex() {
  const [state, setState] = useState<ComponentState | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);
  
  // Initialize collapse states from localStorage
  const [isUngroupedCollapsed, setIsUngroupedCollapsed] = useState(() => {
    const saved = localStorage.getItem(UNGROUPED_COLLAPSED_KEY);
    return saved ? saved === 'true' : false;
  });
  
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(COLLAPSED_GROUPS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      } catch {}
    }
    return new Set();
  });

  // Check if localStorage is available
  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
  }, []);

  // Load state from localStorage on component mount
  useEffect(() => {
    if (!storageAvailable) {
      setState(initialState);
      return;
    }
    
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        // Validate the structure of the parsed state
        if (
          parsedState &&
          typeof parsedState === 'object' &&
          'components' in parsedState &&
          'groups' in parsedState &&
          'ungroupedComponentIds' in parsedState
        ) {
          setState(parsedState);
        } else {
          console.warn('Invalid state structure in localStorage, using default state');
          setState(initialState);
        }
      } else {
        console.log('No saved state found, using default state');
        setState(initialState);
      }
    } catch (e) {
      console.error('Failed to parse saved component groups', e);
      setState(initialState);
    }
  }, [storageAvailable]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!storageAvailable || !state) return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save component groups to localStorage', e);
    }
  }, [state, storageAvailable]);

  // Save collapsedGroups to localStorage whenever it changes
  useEffect(() => {
    if (!storageAvailable) return;
    localStorage.setItem(COLLAPSED_GROUPS_KEY, JSON.stringify(Array.from(collapsedGroups)));
  }, [collapsedGroups, storageAvailable]);

  // Save isUngroupedCollapsed to localStorage whenever it changes
  useEffect(() => {
    if (!storageAvailable) return;
    localStorage.setItem(UNGROUPED_COLLAPSED_KEY, isUngroupedCollapsed.toString());
  }, [isUngroupedCollapsed, storageAvailable]);

  // Handle component drop
  const handleDrop = (
    item: { id: string; sourceId: string; index: number }, 
    targetId: string, 
    targetIndex: number
  ) => {
    if (!state) return;
    
    // Create a copy of the current state
    const newState: ComponentState = { ...state };
    const componentId = item.id;
    
    // Remove from source
    if (item.sourceId === 'ungrouped') {
      newState.ungroupedComponentIds = newState.ungroupedComponentIds.filter(id => id !== componentId);
    } else {
      const sourceGroup = newState.groups.find(g => g.id === item.sourceId);
      if (sourceGroup) {
        sourceGroup.componentIds = sourceGroup.componentIds.filter(id => id !== componentId);
      }
    }
    
    // Add to target
    if (targetId === 'ungrouped') {
      newState.ungroupedComponentIds.splice(targetIndex, 0, componentId);
    } else {
      const targetGroup = newState.groups.find(g => g.id === targetId);
      if (targetGroup) {
        targetGroup.componentIds.splice(targetIndex, 0, componentId);
      }
    }
    
    setState(newState);
  };

  // Add a new group
  const handleAddGroup = () => {
    if (!newGroupName.trim() || !state) return;
    
    const newGroup: ComponentGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      componentIds: []
    };
    
    setState({
      ...state,
      groups: [...state.groups, newGroup]
    });
    
    setNewGroupName('');
  };

  // Delete a group and move its components to ungrouped
  const handleDeleteGroup = (groupId: string) => {
    if (!state) return;
    
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return;
    
    setState({
      ...state,
      groups: state.groups.filter(g => g.id !== groupId),
      ungroupedComponentIds: [...state.ungroupedComponentIds, ...group.componentIds]
    });
  };

  // Start editing a group name
  const handleStartEditGroup = (group: ComponentGroup) => {
    setEditingGroupId(group.id);
    setEditingGroupName(group.name);
  };

  // Save edited group name
  const handleSaveGroupName = () => {
    if (!editingGroupId || !editingGroupName.trim() || !state) {
      setEditingGroupId(null);
      return;
    }
    
    setState({
      ...state,
      groups: state.groups.map(g => 
        g.id === editingGroupId ? { ...g, name: editingGroupName } : g
      )
    });
    
    setEditingGroupId(null);
  };

  // Handle group reordering
  const handleMoveGroup = (dragIndex: number, hoverIndex: number) => {
    if (!state) return;
    
    const newGroups = [...state.groups];
    const draggedGroup = newGroups[dragIndex];
    
    // Remove the dragged group
    newGroups.splice(dragIndex, 1);
    // Insert it at the new position
    newGroups.splice(hoverIndex, 0, draggedGroup);
    
    setState({
      ...state,
      groups: newGroups
    });
  };

  // If state is not yet loaded, show loading state
  if (!state) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="devtools-container">
        <h1 className="text-3xl font-bold mb-8">Component Library</h1>
        
        {/* Storage status indicator */}
        {!storageAvailable && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            Warning: Local storage is not available. Your changes will not be saved between sessions.
          </div>
        )}
        
        {/* Add new group form */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Group</h2>
          <div className="flex relative">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddGroup();
                }
              }}
              placeholder="Group name"
              className="devtools-input"
            />
            <button
              onClick={handleAddGroup}
              className="devtools-button-primary"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        <div className={`grid gap-6 ${isUngroupedCollapsed ? 'grid-cols-[1fr_60px]' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Groups */}
          <div className="space-y-6">
            {state.groups.map((group, index) => (
              <GroupContainer
                key={group.id}
                index={index}
                onMoveGroup={handleMoveGroup}
              >
                <div className="devtools-group">
                  <div className="devtools-group-header">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCollapsedGroups(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(group.id)) {
                              newSet.delete(group.id);
                            } else {
                              newSet.add(group.id);
                            }
                            return newSet;
                          });
                        }}
                        className="devtools-button"
                      >
                        {collapsedGroups.has(group.id) ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      {editingGroupId === group.id ? (
                        <div className="flex flex-grow mr-2">
                          <input
                            type="text"
                            value={editingGroupName}
                            onChange={(e) => setEditingGroupName(e.target.value)}
                            className="devtools-input"
                          />
                          <button
                            onClick={handleSaveGroupName}
                            className="devtools-button-primary"
                          >
                            <Save size={16} />
                          </button>
                        </div>
                      ) : (
                        <h2 className="text-xl font-semibold">{group.name}</h2>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {editingGroupId !== group.id && (
                        <button
                          onClick={() => handleStartEditGroup(group)}
                          className="devtools-button"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="devtools-button devtools-button-danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {!collapsedGroups.has(group.id) && (
                    <ComponentContainer
                      containerId={group.id}
                      componentIds={group.componentIds}
                      components={state.components}
                      onDrop={handleDrop}
                    />
                  )}
                </div>
              </GroupContainer>
            ))}
          </div>

          {/* Ungrouped components */}
          <div className={`devtools-group ${isUngroupedCollapsed ? 'w-[60px]' : ''}`}>
            <div className="devtools-group-header">
              {!isUngroupedCollapsed && (
                <h2 className="text-xl font-semibold">Ungrouped Components</h2>
              )}
              <button
                onClick={() => setIsUngroupedCollapsed(!isUngroupedCollapsed)}
                className="devtools-button"
              >
                {isUngroupedCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
            {!isUngroupedCollapsed && (
              <ComponentContainer
                containerId="ungrouped"
                componentIds={state.ungroupedComponentIds}
                components={state.components}
                onDrop={handleDrop}
                className="min-h-[400px]"
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}