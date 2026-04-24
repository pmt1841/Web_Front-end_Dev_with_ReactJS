import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
      <div className="container" style={{ marginTop: 40 }}>
        <h1>🗂️ Todo List</h1>
        <NewTodo />
        <hr />
        <TodoList />
      </div>
  );
}

export default App;