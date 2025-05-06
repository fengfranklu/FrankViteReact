import { useState } from 'react';
import TodoList from '../../components/TodoList';
import { Todo } from '../../types/todo';

export default function TodoListHost() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build awesome apps", completed: true },
    { id: 3, title: "Master TypeScript", completed: false },
  ]);

  const handleCompletedChange = (id: number, completed: boolean) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed } : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">TodoList Component Demo</h1>
      <div className="bg-white shadow-md rounded p-6">
        <TodoList 
          todos={todos}
          onCompletedChange={handleCompletedChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
