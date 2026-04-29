import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = axios.get("http://localhost:3001/users");
        const getArticles = axios.get("http://localhost:3001/articles");

        axios
            .all([getUsers, getArticles])
            .then(
                axios.spread((res1, res2) => {
                    const userData = res1.data.map((user) => {
                        const userArticles = res2.data.filter(
                            (article) => article.userId == user.id
                        );
                        return {
                            ...user,
                            articles: userArticles
                        };
                    });
                    setUsers(userData);
                })
            )
            .catch((err) => {
                console.log("Lỗi khi gọi API: ", err);
            });
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>📋 Danh sách người dùng và số bài viết</h1>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.headerCell}>👤 Tên người dùng</th>
                        <th style={styles.headerCell}>🎂 Năm sinh</th>
                        <th style={styles.headerCell}>📝 Số bài viết</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={styles.bodyRow}>
                            <td style={styles.cell}>{user.name}</td>
                            <td style={{...styles.cell, textAlign: "center"}}>
                                {user.birthday}
                            </td>
                            <td style={{...styles.cell, textAlign: "center"}}>
                                {user.articles.length}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        maxWidth: "700px",
        width: "100%"
    },
    title: {
        marginBottom: "20px",
        textAlign: "center",
        color: "#2c3e50",
        fontSize: "1.6rem"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    headerRow: {
        backgroundColor: "#0070f3",
        color: "white"
    },
    headerCell: {
        padding: "14px",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: "1rem"
    },
    bodyRow: {
        backgroundColor: "#f9f9f9",
        transition: "background-color 0.2s ease"
    },
    cell: {
        padding: "12px",
        borderTop: "1px solid #ddd"
    }
};

export default App
