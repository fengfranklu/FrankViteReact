import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import TodoListHost from './hostcomponents/TodoListHost';
import TodoItemHost from './hostcomponents/TodoItemHost';
import AddTodoFormHost from './hostcomponents/AddTodoFormHost';
import TodoSummaryHost from './hostcomponents/TodoSummaryHost';
import { todoComponentRegistration } from './devtools/registrations/todoComponents';

// Map component IDs to their host components
const hostComponentMap: Record<string, React.ComponentType> = {
  'todolist': TodoListHost,
  'todoitem': TodoItemHost,
  'addtodoform': AddTodoFormHost,
  'todosummary': TodoSummaryHost
};

// Create routes for all registered components
const routes = todoComponentRegistration.components.map(component => ({
  path: component.path,
  element: hostComponentMap[component.id] ? React.createElement(hostComponentMap[component.id]) : null
}));

// Add the main todo list route
routes.unshift({
  path: '/',
  element: <TodoListHost />
});

export const router = createBrowserRouter(routes); 