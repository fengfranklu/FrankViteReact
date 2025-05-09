import { ComponentInfo } from '../types';
import { createComponentRegistration } from '../config/components';

const todoComponents: ComponentInfo[] = [
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
  },
  // Sample Components
  {
    id: 'sampletodolist',
    name: 'SampleTodoList',
    path: '/components/sampletodolist',
    description: 'A sample component for managing and displaying a list of todo items'
  },
  {
    id: 'sampleaddtodoform',
    name: 'SampleAddTodoForm',
    path: '/components/sampleaddtodoform',
    description: 'A sample form component for adding new todo items'
  },
  {
    id: 'sampletodoitem',
    name: 'SampleTodoItem',
    path: '/components/sampletodoitem',
    description: 'A sample component for displaying and managing individual todo items'
  },
  {
    id: 'sampletodosummary',
    name: 'SampleTodoSummary',
    path: '/components/sampletodosummary',
    description: 'A sample component that shows todo completion statistics'
  }
];

export const todoComponentRegistration = createComponentRegistration(todoComponents); 