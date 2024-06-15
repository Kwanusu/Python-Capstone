
import React, { useState, useEffect } from 'react';

const ContactList = ({ updateContact, updateCallback, appendContact, onSuspend }) => {
    const [contacts, setContacts] = useState([]);
    const [editContactId, setEditContactId] = useState(null);
    const [editField, setEditField] = useState("");
    const [editValue, setEditValue] = useState("");

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/contacts');
            if (response.ok) {
                const data = await response.json();
                setContacts(data.contacts);
            } else {
                console.error('Failed to fetch contacts');
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [appendContact, onSuspend]);

    const handleDelete = async (id) => {
        try {
            const options = { method: 'DELETE' };
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
            if (response.status === 200) {
                updateCallback();
            } else {
                console.error('Failed to delete');
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleSuspend = (id) => {
        onSuspend(id);
    };

    const handleEdit = (id, field) => {
        setEditContactId(id);
        setEditField(field);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/update_contact/${editContactId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [editField]: editValue })
            });
            if (response.ok) {
                setEditContactId(null);
                setEditField("");
                setEditValue("");
                updateCallback();
            } else {
                console.error('Failed to update contact');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h1 className="text-lg font-medium text-gray-900 mb-4">Employees</h1>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">First Name</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Last Name</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Email</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b border-gray-300">
                                {editContactId === contact.id && editField === "firstName" ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={handleEditChange}
                                        onBlur={handleEditSubmit}
                                    />
                                ) : (
                                    contact.firstName
                                )}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                                {editContactId === contact.id && editField === "lastName" ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={handleEditChange}
                                        onBlur={handleEditSubmit}
                                    />
                                ) : (
                                    contact.lastName
                                )}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                                {editContactId === contact.id && editField === "email" ? (
                                    <input
                                        type="email"
                                        value={editValue}
                                        onChange={handleEditChange}
                                        onBlur={handleEditSubmit}
                                    />
                                ) : (
                                    contact.email
                                )}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                                <button
                                    onClick={() => handleEdit(contact.id, "firstName")}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2 border p-1"
                                >
                                    Edit First Name
                                </button>
                                <button
                                    onClick={() => handleEdit(contact.id, "lastName")}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2 border p-1"
                                >
                                    Edit Last Name
                                </button>
                                <button
                                    onClick={() => handleEdit(contact.id, "email")}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2 border p-1"
                                >
                                    Edit Email
                                </button>
                                <button
                                    onClick={() => handleDelete(contact.id)}
                                    className="text-red-600 hover:text-red-900 mr-2 border p-1"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleSuspend(contact.id)}
                                    className="text-yellow-600 hover:text-yellow-900 border p-1"
                                >
                                    Suspend
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
