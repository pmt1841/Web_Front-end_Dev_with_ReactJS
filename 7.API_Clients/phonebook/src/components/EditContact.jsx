import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function EditContact() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        image: ""
    });

    useEffect(() => {
        axios
            .get(`https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`)
            .then(res => {
                setContact(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to fetch contact ID: " + id);
            })
    }, [id])

    const handleEdit = () => {
        if (contact.name !== "" && !contact.name) {
            alert("Name is required");
            return;
        }

        axios
            .put(`https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`)
            .then(res => {
                alert("Successfully updated contact");
                navigate("/contacts");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to update contact ID: " + id);
            })
    }

    return (
        <div>
            <h1>Edit Contact</h1>
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
                <button type="button" onClick={handleEdit}>Save</button>
            </form>
        </div>
    )
}

export default EditContact;