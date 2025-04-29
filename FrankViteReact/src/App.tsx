import { dumyData } from "./data/todos";
import TodoItem from "./components/TodoItem";
import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
function App() {

  const [todos, setTodos] = useState(dumyData);

//   function setTodoCompleted (id: number, completed: boolean){
//    setTodos((prevTodos) => {
//     return prevTodos.map((todo) => {
//       if (todo.id === id) {
//         return { ...todo, completed };
//       }
//       return todo;
//     })
//   })
// }

  function setTodoCompleted (id:number, completed:boolean){
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed} : todo))
    );
  }

  function addTodo(title: string){
    setTodos((prevTodos) => [ 
      { id: prevTodos.length + 1, 
        title, 
        completed: false 
      },
      ...prevTodos,
    ]);
  }

  

  return (
    <main className="py-10 h-screen space-y-5">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="text-center py-10 max-w-lg mx-auto bg-slate-100 rounded-md p-5">
        <AddTodoForm 
        onSubmit={addTodo}
        />
        <div className="space-y-2">
          {todos.map((todo) => (
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
