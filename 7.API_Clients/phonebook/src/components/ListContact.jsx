import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ListContact() {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts`)
            .then(res => {
                setContacts(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Failed to fetch contacts");
            })
    }, []);

    const handleDelete = (id) => {
        const isConfirm = window.confirm("Are you sure you want to delete this contact?");
        if (!isConfirm) return;

        axios
            .delete(`https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`)
            .then(res => {
                const remainingContacts = contacts.filter((contact) => contact.id === id);
                setContacts(remainingContacts);
                alert("Deleted contact successfully!");
            })
            .catch(err => {
                console.log(err);
                alert("Failed to delete contact ID: " + id);
            });
    };

    return (
        <div>
            <h1>Contacts</h1>
            <button onClick={() => navigate(`/add`)}>Add Contact</button>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                            <button onClick={() => navigate(`/contacts/${contact.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListContact;