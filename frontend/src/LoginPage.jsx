import React, { useState } from "react";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import ContactForm from "./ContactForm";
import UserPanel from "./UserPanel";

const LoginPage = ({ onLogin }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAdminLogin = () => {
        setIsAdmin(true);
        setIsLoggedIn(true);
        if (onLogin) {
            onLogin();
        }
    };

    const handleUserLogin = () => {
        setIsAdmin(false);
        setIsLoggedIn(true);
        if (onLogin) {
            onLogin();
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 className="mb-4 text-4xl p-2 font-semibold">Employee Manager</h1>
            {!isLoggedIn && (
                <div style={{ display: "flex", justifyContent: "space-around", border: "solid 1px", borderRadius: "5px" , margin: "30px 60px"}}>
                    <div>
                        <h2 className="mb-2 text-2xl p-1 font-semibold">User Login</h2>
                        <UserLogin onLogin={handleUserLogin} />
                    </div>
                    <div>
                        <h2 className="mb-2 text-2xl p-1 font-semibold">Admin Login</h2>
                        <AdminLogin onLogin={handleAdminLogin} />
                    </div>
                </div>
            )}
            {isLoggedIn && isAdmin && <ContactForm />}
            {isLoggedIn && !isAdmin && <UserPanel />}
        </div>
    );
};

export default LoginPage;

