import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function AddContact() {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        image: ""
    });

    const handleAdd = () => {
        if (contact.name === "" || !contact.name) {
            alert("Please enter a name");
            return;
        }

        axios
            .post(`https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts`)
        .then(res => {
            alert("Contact added successfully");
            navigate("/contacts");
        })
        .catch(err => {
            console.log(err);
            alert("Failed to add contact");
        })
    }

    return (
        <div>
            <h1>Add Contact</h1>
            <img src={contact.image} alt="Profile Avatar"></img>
            <form>
                <div>
                    <label>Image: </label>
                    <input name="image"
                           value={contact.image}
                           onChange={(e) => setContact(
                               {...contact, image: e.target.value})}
                    />
                </div>
                <div>
                    <label>Name: </label>
                    <input name="name"
                           value={contact.name}
                           onChange={(e) => setContact(
                               {...contact, name: e.target.value})}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input name="email"
                           value={contact.email}
                           onChange={(e) => setContact(
                               {...contact, email: e.target.value})}
                    />
                </div>
                <div>
                    <label>Phone: </label>
                    <input name="phone"
                           value={contact.phone}
                           onChange={(e) => setContact(
                               {...contact, phone: e.target.value})}
                    />
                </div>
                <button type="button" onClick={handleAdd}>Add</button>
            </form>
        </div>
    )
}

export default AddContact;