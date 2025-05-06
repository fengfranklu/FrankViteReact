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
  }
];

export const todoComponentRegistration = createComponentRegistration(todoComponents); 