import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
    const todos = useSelector((state) => state.todos);

    return (
        <div>
            {todos.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}