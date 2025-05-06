import { Route, Link } from 'react-router-dom';
import { ComponentLayout } from './components/ComponentLayout';
import ComponentIndex from './components/ComponentIndex';
import AddTodoFormHost from './hosts/AddTodoFormHost';
import TodoItemHost from './hosts/TodoItemHost';
import TodoListHost from './hosts/TodoListHost';
import TodoSummaryHost from './hosts/TodoSummaryHost';

export const devToolsRoutes = [
  <Route 
    key="devindex" 
    path="/devindex" 
    element={
      <>
        <nav className="bg-white shadow-md p-4 mb-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Back to App</Link>
            <span className="text-gray-600">Component Library</span>
          </div>
        </nav>
        <ComponentIndex />
      </>
    } 
  />,
  <Route 
    key="todolist" 
    path="/components/todolist" 
    element={
      <ComponentLayout>
        <TodoListHost />
      </ComponentLayout>
    } 
  />,
  <Route 
    key="addtodoform" 
    path="/components/addtodoform" 
    element={
      <ComponentLayout>
        <AddTodoFormHost />
      </ComponentLayout>
    } 
  />,
  <Route 
    key="todoitem" 
    path="/components/todoitem" 
    element={
      <ComponentLayout>
        <TodoItemHost />
      </ComponentLayout>
    } 
  />,
  <Route 
    key="todosummary" 
    path="/components/todosummary" 
    element={
      <ComponentLayout>
        <TodoSummaryHost />
      </ComponentLayout>
    } 
  />
]; 