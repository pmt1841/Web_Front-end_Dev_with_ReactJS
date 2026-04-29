import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ListBook() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/codegym-vn/mock-api-books/books')
            .then(res => setBooks(res.data))
            .catch(err => {
                console.log(err);
                alert("Failed to fetch books");
            })
    }, []);

    const handleDelete = (id) => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?");
        if (!isConfirm) return;

        axios.delete(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`)
            .then(res => {
                alert("Deleted successfully");
                const remainingBooks = books.filter((book) => book.id !== id);
                setBooks(remainingBooks);
            })
            .catch(err => {
                console.log(err);
                alert("Failed to delete book ID: " + id);
            });
    };

    return (
        <div>
            <h1>Library</h1>
            <button onClick={() => navigate(`/add`)}>Add a new book</button>
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                {
                    books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.quantity}</td>
                            <td>
                                <button onClick={() => navigate(`/edit/${book.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListBook;