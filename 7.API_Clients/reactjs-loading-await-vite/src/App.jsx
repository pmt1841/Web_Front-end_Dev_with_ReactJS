import {useEffect, useState} from "react";
import axios from "axios";
import "./styles/global.css";
import "./styles/loading.css";
import "./styles/userList.css";

export default function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return await axios.get("http://localhost:3001/users");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getUsers();
                setUsers(res.data);
            } catch (err) {
                console.log("Lỗi gọi API: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-card">
                    <div className="loading-spinner">⏳</div>
                    <p className="loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="main-container">
            <div className="content-card">
                <h1 className="page-title">📋 Danh sách người dùng</h1>
                <div className="users-section">
                    {users.length === 0 ? (
                        <p className="empty-state">Không có dữ liệu người dùng</p>
                    ) : (
                        <ul className="users-list">
                            {users.map((user) => (
                                <li key={user.id} className="user-item">
                                    <span className="user-icon">👤</span>
                                    <span className="user-name">{user.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}