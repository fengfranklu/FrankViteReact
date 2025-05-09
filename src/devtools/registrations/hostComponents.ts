import { ComponentType } from 'react';
import AddTodoFormHost from '../hosts/AddTodoFormHost';
import TodoItemHost from '../hosts/TodoItemHost';
import TodoListHost from '../hosts/TodoListHost';
import TodoSummaryHost from '../hosts/TodoSummaryHost';
import SampleAddTodoFormHost from '../hosts/SampleAddTodoFormHost';
import SampleTodoItemHost from '../hosts/SampleTodoItemHost';
import SampleTodoListHost from '../hosts/SampleTodoListHost';
import SampleTodoSummaryHost from '../hosts/SampleTodoSummaryHost';

// Map of component IDs to their host components
export const hostComponents: Record<string, ComponentType> = {
  todolist: TodoListHost,
  addtodoform: AddTodoFormHost,
  todoitem: TodoItemHost,
  todosummary: TodoSummaryHost,
  sampletodolist: SampleTodoListHost,
  sampleaddtodoform: SampleAddTodoFormHost,
  sampletodoitem: SampleTodoItemHost,
  sampletodosummary: SampleTodoSummaryHost
}; 