import { ComponentType } from 'react';

import AddTodoFormHost from '../../hostcomponents/AddTodoFormHost';
import TodoItemHost from '../../hostcomponents/TodoItemHost';
import TodoListHost from '../../hostcomponents/TodoListHost';
import TodoSummaryHost from '../../hostcomponents/TodoSummaryHost';
import SampleAddTodoFormHost from '../samplehosts/SampleAddTodoFormHost';
import SampleTodoItemHost from '../samplehosts/SampleTodoItemHost';
import SampleTodoListHost from '../samplehosts/SampleTodoListHost';
import SampleTodoSummaryHost from '../samplehosts/SampleTodoSummaryHost';

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