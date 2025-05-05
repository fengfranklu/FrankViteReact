import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus, Edit, Save, Trash2 } from 'lucide-react';

// Define item types for drag and drop
const ItemTypes = {
  COMPONENT: 'component'
};

interface ComponentInfo {
  id: string;
  name: string;
  path: string;
  description: string;
}

interface ComponentGroup {
  id: string;
  name: string;
  componentIds: string[];
}

interface ComponentState {
  components: Record<string, ComponentInfo>;
  groups: ComponentGroup[];
  ungroupedComponentIds: string[];
}

// Initial components data
const initialComponents: ComponentInfo[] = [
  {
    id: 'todolist',
    name: 'TodoList',
    path: '/components/todolist',
    description: 'A component for managing and displaying a list of todo items'
  },
  {
    id: 'addtodoform',
    name: 'AddTodoForm',
    path: '/components/addtodoform',
    description: 'A form component for adding new todo items'
  },
  {
    id: 'todoitem',
    name: 'TodoItem',
    path: '/components/todoitem',
    description: 'A component for displaying and managing individual todo items'
  },
  {
    id: 'todosummary',
    name: 'TodoSummary',
    path: '/components/todosummary',
    description: 'A component that shows todo completion statistics'
  }
];

// Convert array to record for easier access
const componentsRecord = initialComponents.reduce((acc, component) => {
  acc[component.id] = component;
  return acc;
}, {} as Record<string, ComponentInfo>);

// Initial state with all components ungrouped
const initialState: ComponentState = {
  components: componentsRecord,
  groups: [],
  ungroupedComponentIds: initialComponents.map(c => c.id)
};

// Storage key for localStorage
const STORAGE_KEY = 'componentGroups';

// Function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage is not available:', e);
    return false;
  }
};

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
        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          {component.name}
        </h2>
        <p className="text-gray-600">{component.description}</p>
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
        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          {component.name}
        </h2>
        <p className="text-gray-600">{component.description}</p>
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
}

const ComponentContainer = ({ containerId, componentIds, components, onDrop }: ComponentContainerProps) => {
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
      className={`min-h-[200px] p-2 ${isOver ? 'bg-blue-50' : ''}`}
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

export default function ComponentIndex() {
  const [state, setState] = useState<ComponentState>(initialState);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Check if localStorage is available
  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
  }, []);

  // Load state from localStorage on component mount
  useEffect(() => {
    if (!storageAvailable) return;
    
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      console.log('Raw saved state:', savedState);
      
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        console.log('Parsed state:', parsedState);
        
        // Validate the structure of the parsed state
        if (
          parsedState &&
          typeof parsedState === 'object' &&
          'components' in parsedState &&
          'groups' in parsedState &&
          'ungroupedComponentIds' in parsedState
        ) {
          console.log('Valid state structure, applying saved state');
          
          // Force a clean state update to ensure React properly applies the state
          setTimeout(() => {
            setState(parsedState);
            console.log('State updated from localStorage');
          }, 0);
        } else {
          console.warn('Invalid state structure in localStorage, using default state');
        }
      } else {
        console.log('No saved state found, using default state');
      }
    } catch (e) {
      console.error('Failed to parse saved component groups', e);
    }
  }, [storageAvailable]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!storageAvailable) return;
    
    try {
      const stateToSave = JSON.stringify(state);
      console.log('Saving state to localStorage:', stateToSave);
      localStorage.setItem(STORAGE_KEY, stateToSave);
      
      // Verify the save was successful
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState !== stateToSave) {
        console.warn('State verification failed - saved state does not match');
      } else {
        console.log('State successfully saved to localStorage');
      }
    } catch (e) {
      console.error('Failed to save component groups to localStorage', e);
    }
  }, [state, storageAvailable]);

  // Test function to verify localStorage is working
  const testLocalStorage = useCallback(() => {
    if (!storageAvailable) {
      alert('localStorage is not available in this browser');
      return;
    }
    
    try {
      // Save current state
      const currentState = JSON.stringify(state);
      localStorage.setItem('__test_state__', currentState);
      
      // Read it back
      const readState = localStorage.getItem('__test_state__');
      
      if (readState === currentState) {
        alert('localStorage test passed! Data can be saved and retrieved.');
      } else {
        alert('localStorage test failed! Saved data does not match retrieved data.');
      }
      
      // Clean up
      localStorage.removeItem('__test_state__');
    } catch (e) {
      alert(`localStorage test error: ${e.message}`);
    }
  }, [state, storageAvailable]);

  // Force reload state from localStorage
  const forceReloadFromStorage = useCallback(() => {
    if (!storageAvailable) {
      alert('localStorage is not available');
      return;
    }
    
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (!savedState) {
        alert('No saved state found in localStorage');
        return;
      }
      
      const parsedState = JSON.parse(savedState);
      setState(parsedState);
      alert('State reloaded from localStorage');
    } catch (e) {
      alert(`Error reloading state: ${e.message}`);
    }
  }, [storageAvailable]);

  // Handle component drop
  const handleDrop = (
    item: { id: string; sourceId: string; index: number }, 
    targetId: string, 
    targetIndex: number
  ) => {
    // Create a copy of the current state
    const newState = { ...state };
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
    if (!newGroupName.trim()) return;
    
    const newGroup: ComponentGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      componentIds: []
    };
    
    setState(prev => ({
      ...prev,
      groups: [...prev.groups, newGroup]
    }));
    
    setNewGroupName('');
  };

  // Delete a group and move its components to ungrouped
  const handleDeleteGroup = (groupId: string) => {
    setState(prev => {
      const group = prev.groups.find(g => g.id === groupId);
      if (!group) return prev;
      
      return {
        ...prev,
        groups: prev.groups.filter(g => g.id !== groupId),
        ungroupedComponentIds: [...prev.ungroupedComponentIds, ...group.componentIds]
      };
    });
  };

  // Start editing a group name
  const handleStartEditGroup = (group: ComponentGroup) => {
    setEditingGroupId(group.id);
    setEditingGroupName(group.name);
  };

  // Save edited group name
  const handleSaveGroupName = () => {
    if (!editingGroupId || !editingGroupName.trim()) {
      setEditingGroupId(null);
      return;
    }
    
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(g => 
        g.id === editingGroupId ? { ...g, name: editingGroupName } : g
      )
    }));
    
    setEditingGroupId(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 max-w-6xl">
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
          <div className="flex">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Group name"
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddGroup}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={20} />
            </button>
          </div>
          
          {/* Debug buttons - only visible in development */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="flex space-x-2">
              <button 
                onClick={testLocalStorage}
                className="mt-2 px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Test Storage
              </button>
              <button 
                onClick={forceReloadFromStorage}
                className="mt-2 px-3 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
              >
                Force Reload
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ungrouped components */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ungrouped Components</h2>
            <ComponentContainer
              containerId="ungrouped"
              componentIds={state.ungroupedComponentIds}
              components={state.components}
              onDrop={handleDrop}
            />
          </div>
          
          {/* Groups */}
          <div className="space-y-6">
            {state.groups.map((group) => (
              <div key={group.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  {editingGroupId === group.id ? (
                    <div className="flex flex-grow mr-2">
                      <input
                        type="text"
                        value={editingGroupName}
                        onChange={(e) => setEditingGroupName(e.target.value)}
                        className="flex-grow px-3 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSaveGroupName}
                        className="px-3 py-1 bg-green-600 text-white rounded-r-md hover:bg-green-700"
                      >
                        <Save size={16} />
                      </button>
                    </div>
                  ) : (
                    <h2 className="text-xl font-semibold">{group.name}</h2>
                  )}
                  
                  <div className="flex space-x-2">
                    {editingGroupId !== group.id && (
                      <button
                        onClick={() => handleStartEditGroup(group)}
                        className="p-1 text-gray-600 hover:text-blue-600 focus:outline-none"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-1 text-gray-600 hover:text-red-600 focus:outline-none"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <ComponentContainer
                  containerId={group.id}
                  componentIds={group.componentIds}
                  components={state.components}
                  onDrop={handleDrop}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}