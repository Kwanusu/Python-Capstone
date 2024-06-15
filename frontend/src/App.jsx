import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import SetPassword from "./SetPassword";

const App = () => {
    const [authToken, setAuthToken] = useState(null);
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        if (authToken) {
            try {
                const response = await fetch('http://127.0.0.1:5000/contacts', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (response.status === 401) {
                    setAuthToken(null);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch contacts');
                }

                const data = await response.json();
                setContacts(data.contacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [authToken]);

    const appendContact = (newContact) => {
        setContacts([...contacts, newContact]);
    };

    const updateContact = (updatedContact) => {
        setContacts(contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact)));
    };

    const updateCallback = () => {
        fetchContacts();
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/login" 
                    element={
                        authToken ? (
                            <Navigate to="/contacts" />
                        ) : (
                            <LoginPage onLogin={setAuthToken} />
                        )
                    }
                />
                <Route 
                    path="/set_password/:user_id" 
                    element={<SetPassword onLogin={setAuthToken} />} 
                />
                <Route 
                    path="/contacts" 
                    element={
                        authToken ? (
                            <>
                                <ContactForm updateCallback={appendContact} />
                                <ContactList 
                                    contacts={contacts} 
                                    updateContact={updateContact} 
                                    updateCallback={updateCallback} 
                                    appendContact={appendContact}
                                    onSuspend={updateCallback} 
                                />
                            </>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
  