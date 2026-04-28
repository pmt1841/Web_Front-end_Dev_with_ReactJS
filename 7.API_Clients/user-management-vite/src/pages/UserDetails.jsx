import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetails.css";

export default function UserDetails() {

    const { userId } = useParams();

    const navigate = useNavigate();

    const isCreate = !userId;

    const [user, setUser] = useState({
        id: "",
        name: "",
        birthday: ""
    });

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:3001/users/${userId}`)
                .then((res) => setUser(res.data))
                .catch((err) => console.error("Error loading user:", err));
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = isCreate
            ? axios.post("http://localhost:3001/users", user)
            : axios.put(`http://localhost:3001/users/${userId}`, user);

        request
            .then((res) => {
                alert(`${isCreate ? "Tạo mới" : "Cập nhật"} người dùng thành công!`);
                navigate("/");
            })
            .catch((err) => console.error("Error submitting form:", err));
    };

    return (
        <div className="user-details-container">
            <div className="user-details-card">
                <h1 className="user-details-title">
                    {isCreate ? "➕ Thêm mới người dùng" : "✏️ Chỉnh sửa người dùng"}
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="user-details-form-group">
                        <label className="user-details-label">ID:</label>
                        <input
                            name="id"
                            value={user.id}
                            onChange={handleChange}
                            disabled={!isCreate}
                            className="user-details-input"
                        />
                    </div>

                    <div className="user-details-form-group">
                        <label className="user-details-label">Tên:</label>
                        <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="user-details-input"
                        />
                    </div>
                    <div className="user-details-form-group">
                        <label className="user-details-label">Ngày sinh:</label>
                        <input
                            type="date"
                            name="birthday"
                            value={user.birthday}
                            onChange={handleChange}
                            className="user-details-input"
                        />
                    </div>

                    <div className="user-details-button-container">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="user-details-btn user-details-btn-secondary"
                        >
                            🔙 Quay lại
                        </button>
                        <button
                            type="submit"
                            className="user-details-btn user-details-btn-primary"
                        >
                            ✅ {isCreate ? "Tạo mới" : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}