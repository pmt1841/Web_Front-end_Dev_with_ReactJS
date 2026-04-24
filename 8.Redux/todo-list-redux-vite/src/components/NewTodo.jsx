import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";

export default function NewTodo() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        if(text.trim() !== "") {
            dispatch(
                addTodoAction({
                    id: uuidv4(),
                    text: text,
                })
            );
            setText("");
        }
    };

    return (
        <div className="d-flex">
            <div className="col-md-6">
                <input
                    type="text"
                    placeholder="📝 Enter a new task"
                    className="form-control"
                    value={text}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mx-sm-3 mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    ➕ Add
                </button>
            </div>
        </div>
    );
}