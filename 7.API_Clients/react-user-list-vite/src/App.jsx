import {useEffect, useState} from "react";
import axios from "axios";
import "./UserList.css";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/users")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log("Lỗi khi gọi API: ", err);
            });
    }, []);


    return (
        <div className="user-list-container">
            <div className="user-list-card">
                <h1 className="user-list-title">
                    <span className="title-icon">📋</span>
                </h1>

                <div className="user-list-content">
                    {users.length > 0 ? (
                        <ul className="user-list">
                            {users.map((user) => (
                                <li key={user.id} className="user-item">
                                    <div className="user-avatar">
                                        <span className="avatar-icon">👤</span>
                                    </div>
                                    <div className="user-info">
                                        <h3 className="user-name">{user.name}</h3>
                                        <p className="user-birthday">Sinh năm {user.birthday}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="loading">
                            <div className="loading-spinner"></div>
                            <p>Đang tải danh sách người dùng...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App
