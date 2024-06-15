// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserLogin = ({ onLogin }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Login attempt with username:", username);
    
//         const requestBody = { username, password };
//         console.log("Request Body:", requestBody);
    
//         const response = await fetch("http://127.0.0.1:5000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(requestBody)
//         });
    
//         const data = await response.json();
//         console.log("Response data:", data);
    
//         if (response.ok) {
//             if (data.message === "Password not set") {
//                 console.log("Redirecting to set password for user:", data.user_id);
//                 navigate(`/set_password/${data.user_id}`);
//             } else {
//                 console.log("Login successful, token received");
//                 onLogin(data.access_token);
//             }
//         } else {
//             console.log("Invalid credentials provided");
//             alert("Invalid credentials");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
//             <div className="mb-4">
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>
//             <div className="mb-6">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>
//             <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                 Login
//             </button>
//         </form>
//     );
// };

// export default UserLogin;
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import SetPassword from "./SetPassword"; // Import SetPassword component

const UserLogin = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSetPassword, setShowSetPassword] = useState(false); // State to control SetPassword component visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempt with username:", username);

        const requestBody = { username, password };
        console.log("Request Body:", requestBody);

        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
            if (data.message === "Password not set") {
                console.log("Redirecting to set password for user:", data.user_id);
                setShowSetPassword(true); // Set state to true to show SetPassword component
            } else {
                console.log("Login successful, token received");
                onLogin(data.access_token);
            }
        } else if (response.status === 401) {
            console.log("Unauthorized access. Please check your credentials.");
            alert("Unauthorized access. Please check your credentials.");
        } else {
            console.log("An error occurred. Please try again later.");
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div>
            {showSetPassword ? ( // Conditionally render SetPassword component
                <SetPassword />
            ) : (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserLogin;
