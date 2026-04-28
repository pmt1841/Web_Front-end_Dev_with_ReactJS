import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Users.css";

export default function Users() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    return (
        <div className="users-container">
            <div className="users-card">
                <h1 className="users-title">📋 Danh sách người dùng</h1>
                <div className="users-list">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user.id}
                                className="users-item"
                                onClick={() => navigate(`/user/${user.id}`)}
                            >
                                <div className="users-item-info">
                                    <div className="users-item-name">👤 {user.name}</div>
                                    <div className="users-item-birthday">
                                        Sinh nhật: {new Date(user.birthday).toLocaleDateString("vi-VN")}
                                    </div>
                                </div>
                                <div className="users-item-action">
                                    Xem chi tiết →
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="users-empty">
                            Chưa có người dùng nào 🤷‍♂️
                        </div>
                    )}
                </div>
                <button
                    onClick={() => navigate("/user/add")}
                    className="users-create-btn"
                >
                    ➕ Thêm người dùng mới
                </button>
            </div>
        </div>
    );
}