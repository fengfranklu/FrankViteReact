import AddTodoForm from './AddTodoForm';

export default function AddTodoFormHost() {
  const handleSubmit = (title: string) => {
    alert(`New todo added: ${title}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">AddTodoForm Component Demo</h1>
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Add a New Todo</h2>
        <AddTodoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}