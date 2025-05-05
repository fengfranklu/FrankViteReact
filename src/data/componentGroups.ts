export interface ComponentInfo {
    id: string;
    name: string;
    path: string;
    description: string;
    groupId: string | null;
  }
  
  export interface ComponentGroup {
    id: string;
    name: string;
  }
  
  
  export const initialComponents: ComponentInfo[] = [
    {
      id: '1',
      name: 'TodoList',
      path: '/components/todolist',
      description: 'A component for managing and displaying a list of todo items',
      groupId: null
    },
    {
      id: '2',
      name: 'AddTodoForm',
      path: '/components/addtodoform',
      description: 'A form component for adding new todo items',
      groupId: null
    },
    {
      id: '3',
      name: 'TodoItem',
      path: '/components/todoitem',
      description: 'A component for displaying and managing individual todo items',
      groupId: null
    },
    {
      id: '4',
      name: 'TodoSummary',
      path: '/components/todosummary',
      description: 'A component that shows todo completion statistics',
      groupId: null
    }
  ];

  
  export const initialGroups: ComponentGroup[] = [
    {
      id: '1',
      name: 'Todo Components'
    }
  ];