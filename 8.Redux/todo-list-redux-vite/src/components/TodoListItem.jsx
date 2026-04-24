import {useDispatch} from "react-redux";
import {deleteTodoAction} from "../redux/actions";

export default function TodoListItem({todo}) {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(deleteTodoAction(todo.id));
    };

    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <h5>📌 {todo.text}</h5>
            <button className="btn btn-danger" onClick={handleRemove}>
                ❌ Remove
            </button>
        </div>
    );
}