import { dumyData } from "./data/todos";
import TodoItem from "./components/TodoItem";
function App() {

  return (
    <main className="py-10 h-screen">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="text-center py-10 max-w-lg mx-auto">
        <div className="space-y-2">
          {dumyData.map((todo) => (
            <div key={todo.id} className="text-lg py-2">
              <p>{todo.title}</p>
              <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </main> )
}

export default App
