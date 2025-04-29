import { dumyData } from "./data/todos";
import TodoItem from "./components/TodoItem";
function App() {

  function setTodoCompleted (id: number, completed: boolean){
    alert(
      `Todo with id ${id} is now ${completed ? "coompleted" : "not completed"}`
    )
  }

  return (
    <main className="py-10 h-screen space-y-5">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="text-center py-10 max-w-lg mx-auto bg-slate-100 rounded-md p-5">
        <div className="space-y-2">
          {dumyData.map((todo) => (
            <div>        
              <TodoItem 
              key={todo.id}
              todo={todo}
              onCompletedChange={setTodoCompleted} />
            </div>
          ))}
        </div>
      </div>
    </main> )
}

export default App
