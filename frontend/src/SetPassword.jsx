import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SetPassword = () => {
    const [password, setPassword] = useState("");
    const { user_id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/set_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, password })
        });
        const data = await response.json();
        if (response.ok) {
            navigate("/login");
        } else {
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Set Password
            </button>
        </form>
    );
};

export default SetPassword;
