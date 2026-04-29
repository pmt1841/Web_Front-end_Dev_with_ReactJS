import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function EditBook() {
    const {id} = useParams();
    const [book, setBook] = useState({"title": "", "quantity": 0});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`)
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to fetch book ID: " + id);
            })
    }, [id]);

    const handleUpdateBook = () => {
        if (!book.title || book.title === "") {
            alert("Please enter a title");
            return;
        }

        axios
            .put(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`, book)
            .then((res) => {
                alert("Successfully updated book ID: " + id);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to update book ID: " + id);
            })
    }

    return (
        <div>
            <h1>Edit Book ID: {id}</h1>
            <form>
                <div>
                    <label>Title: </label>
                    <input name="title"
                           value={book.title}
                           onChange={(e) => setBook(
                               {...book, title: e.target.value})}
                    />
                </div>
                <div>
                    <label>Quantity: </label>
                    <input name="quantity"
                           value={book.quantity}
                           onChange={(e) => setBook(
                               {...book, quantity: e.target.value === "" ? "" : Number(e.target.value)})}
                    />
                </div>
                <button type="button" onClick={handleUpdateBook}>Update</button>
            </form>
        </div>
    )
}

export default EditBook;