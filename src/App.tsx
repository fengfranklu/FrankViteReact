import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoListHost from './components/TodoListHost';
import AddTodoFormHost from './components/AddTodoFormHost';
import TodoItemHost from './components/TodoItemHost';
import TodoSummaryHost from './components/TodoSummaryHost';
import ComponentIndex from './pages/ComponentIndex';
import HomePage from './pages/HomePage';


function ComponentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bg-white shadow-md p-4 mb-4">
        <div className="container mx-auto">
          <Link to="/devindex" className="text-blue-600 hover:text-blue-800">Back to Component Library</Link>
        </div>
      </nav>
      {children}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devindex" element={
            <>
              <nav className="bg-white shadow-md p-4 mb-4">
                <div className="container mx-auto flex justify-between items-center">
                  <Link to="/" className="text-blue-600 hover:text-blue-800">Back to App</Link>
                  <span className="text-gray-600">Component Library</span>
                </div>
              </nav>
              <ComponentIndex />
            </>
          } />
          <Route path="/components/todolist" element={
            <ComponentLayout>
              <TodoListHost />
            </ComponentLayout>
          } />
          <Route path="/components/addtodoform" element={
            <ComponentLayout>
              <AddTodoFormHost />
            </ComponentLayout>
          } />
          <Route path="/components/todoitem" element={
            <ComponentLayout>
              <TodoItemHost />
            </ComponentLayout>
          } />
          <Route path="/components/todosummary" element={
            <ComponentLayout>
              <TodoSummaryHost />
            </ComponentLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
} 
