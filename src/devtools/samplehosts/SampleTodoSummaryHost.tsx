import { useState } from 'react';
import SampleTodoSummary from '../samplecomponents/SampleTodoSummary';
import { Todo } from '../../types/todo';

export default function SampleTodoSummaryHost() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build awesome apps", completed: true },
    { id: 3, title: "Master TypeScript", completed: false },
  ]);

  const handleDeleteAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Sample TodoSummary Component Demo</h1>
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Todo Statistics</h2>
        <SampleTodoSummary 
          todos={todos} 
          deleteAllCompleted={handleDeleteAllCompleted}
        />
      </div>
    </div>
  );
} 