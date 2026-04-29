import {useEffect, useState} from 'react';
import axios from "axios";

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then(
                response => {
                    setTodos(response.data);
                }
            ).catch(error => console.log(error));
    }, []);

    const handleSubmit = () => {
        if (!task.trim()) {
            return;
        }

        axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                title: task,
                completed: false,
                userId: 1
            })
            .then(response => {
                alert(`Successfully added new task`);
                setTodos([response.data, ...todos]);
                setTask("");
            })
            .catch(error => console.log(error)
            );
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Todo List</h1>

            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Input task..."
                style={{ padding: "8px", width: "250px" }}
            />
            <br /><br />
            <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
                Submit
            </button>
            <div style={{ textAlign: "left", maxWidth: "400px", margin: "30px auto" }}>
                {
                    todos.map((todo) => (
                        <p key={todo.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                            • {todo.title}
                        </p>
                    ))
                }
            </div>
        </div>
    );
}

export default App
