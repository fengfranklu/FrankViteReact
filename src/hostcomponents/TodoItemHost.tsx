import { useState } from 'react';
import TodoItem from '../components/TodoItem';
import { Todo } from '../types/todo';

export default function TodoItemHost() {
  const [todo, setTodo] = useState<Todo>({
    id: 1,
    title: "Example Todo Item",
    completed: false
  });

  const handleCompletedChange = (id: number, completed: boolean) => {
    setTodo((prev: Todo) => ({ ...prev, completed }));
  };

  const handleDelete = (id: number) => {
    alert('Delete clicked! In a real app, this would delete the todo.');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">TodoItem Component Demo</h1>
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Interactive Todo Item</h2>
        <TodoItem 
          todo={todo}
          onCompletedChange={handleCompletedChange}
          onDelete={handleDelete}
        />
        <div className="mt-4 text-sm text-gray-600">
          <p>Try:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Checking/unchecking the checkbox</li>
            <li>Clicking the delete button</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 