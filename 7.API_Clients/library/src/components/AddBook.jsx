import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function AddBook(){
    const [book, setBook] = useState({"title": "", "quantity": 0});
    const navigate = useNavigate();

    const handleAddBook = () => {
        if (!book.title || book.title === "") {
            alert("Please enter a title");
            return;
        }

        axios
        .post(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books`, book)
            .then(res=>{
                alert("Book added successfully");
                navigate("/");
            })
            .catch(err=>{
                console.log(err);
                alert("Failed to add book");
            })
    }

    return (
        <div>
            <h1>Add A New Book</h1>
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
                <button type="button" onClick={handleAddBook}>Add</button>
            </form>
        </div>
    )
}

export default AddBook;