import { Link } from 'react-router-dom';

interface ComponentInfo {
  name: string;
  path: string;
  description: string;
}

const components: ComponentInfo[] = [
  {
    name: 'TodoList',
    path: '/components/todolist',
    description: 'A component for managing and displaying a list of todo items'
  },
  {
    name: 'AddTodoForm',
    path: '/components/addtodoform',
    description: 'A form component for adding new todo items'
  },
  {
    name: 'TodoItem',
    path: '/components/todoitem',
    description: 'A component for displaying and managing individual todo items'
  },
  {
    name: 'TodoSummary',
    path: '/components/todosummary',
    description: 'A component that shows todo completion statistics'
  }
];

export default function ComponentIndex() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Component Library</h1>
      <div className="grid gap-6">
        {components.map((component) => (
          <Link
            key={component.path}
            to={component.path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {component.name}
            </h2>
            <p className="text-gray-600">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}