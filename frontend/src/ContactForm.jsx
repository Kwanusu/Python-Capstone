// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import useHistory from React Router

// import ContactList from "./ContactList";

// const ContactForm = ({ existingContact = {}, updateCallback }) => {
//     const [firstName, setFirstName] = useState(existingContact.firstName || "");
//     const [lastName, setLastName] = useState(existingContact.lastName || "");
//     const [email, setEmail] = useState(existingContact.email || "");
//     const [role, setRole] = useState(existingContact.role || "");
//     const [tasks, setTasks] = useState(existingContact.tasks || []);
//     const [taskInput, setTaskInput] = useState(""); // State for new task input
//     const [userId, setUserId] = useState("");  

//     const updating = Object.entries(existingContact).length !== 0;
//     const handleTaskChange = (index, value) => {
//         const newTasks = [...tasks];
//         newTasks[index] = value;
//         setTasks(newTasks);
//     };

//     const addTask = () => {
//         if (taskInput.trim() !== "") {
//             setTasks([...tasks, taskInput]);
//             setTaskInput(""); // Clear task input after adding task
//             // Provide feedback to the user (optional)
//             alert("Task added successfully!");
//         } else {
//             // Provide feedback to the user (optional)
//             alert("Task description cannot be empty!");
//         }
//     };

//     const removeTask = (index) => {
//         const newTasks = tasks.filter((_, i) => i !== index);
//         setTasks(newTasks);
//         // Provide feedback to the user (optional)
//         alert("Task removed successfully!");
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();

//         // Check if email already exists
//         const exists = await checkEmailExists(email);
//         if (exists) {
//             alert("User with this email already exists.");
//             return;
//         }

//         // Generate user_id automatically
//         const generatedUserId = generateUserId();
//         setUserId(generatedUserId);

//         const data = {
//             firstName,
//             lastName,
//             email,
//             role,
//             tasks,
//             user_id: generatedUserId  // Include user ID in the data object
//         };

//         const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
//         const options = {
//             method: updating ? "PATCH" : "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         };

//         const response = await fetch(url, options);
//         if (response.status === 401) {
//             alert("Unauthorized access. Please check your credentials.");
//         } else if (response.status !== 201 && response.status !== 200) {
//             const errorData = await response.json();
//             alert(errorData.message);
//         } else {
//             // Append the new contact to the contact list
//             const newContact = await response.json();
//             updateCallback(newContact);
//         }
//     };

    
//     const handleSuspend = async () => {
//         const url = `http://127.0.0.1:5000/suspend_contact/${existingContact.id}`;
//         const options = {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ suspended: true })
//         };

//         const response = await fetch(url, options);
//         if (response.status === 200) {
//             alert("Contact suspended successfully");
//             updateCallback(await response.json());
//         } else {
//             const errorData = await response.json();
//             alert(errorData.message);
//         }
//     };

//     const handleDelete = async () => {
//         const url = `http://127.0.0.1:5000/delete_contact/${existingContact.id}`;
//         const options = {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         };

//         const response = await fetch(url, options);
//         if (response.status === 200) {
//             alert("Contact deleted successfully");
//             updateCallback(null);
//         } else {
//             const errorData = await response.json();
//             alert(errorData.message);
//         }
//     };

//     const checkEmailExists = async (email) => {
//         // Perform a check if email exists in the database
//         // Implement your logic here (e.g., fetch request to the backend)
//         return false; // Return true if email exists, false otherwise
//     };

//     const generateUserId = () => {
//         return Math.floor(Math.random() * 1000) + 1; // Example: Random number between 1 and 1000
//     };

//     const logout = () => {
//         return <Link to="/home" />; // Navigate back to the homepage
//     };

//     return (
//         <div>
//             <form onSubmit={onSubmit} className="space-y-6 p-6 bg-white shadow-md rounded-md border border-gray-300 max-w-md mx-auto">
                // <div className="space-y-4">
                //     <div className="flex items-center">
                //         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 w-1/4">First Name:</label>
                //         <input
                //             type="text"
                //             id="firstName"
                //             value={firstName}
                //             onChange={(e) => setFirstName(e.target.value)}
                //             className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //     </div>
                //     <div className="flex items-center">
                //         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 w-1/4">Last Name:</label>
                //         <input
                //             type="text"
                //             id="lastName"
                //             value={lastName}
                //             onChange={(e) => setLastName(e.target.value)}
                //             className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //     </div>
                //     <div className="flex items-center">
                //         <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-1/4">Email:</label>
                //         <input
                //             type="email"
                //             id="email"
                //             value={email}
                //             onChange={(e) => setEmail(e.target.value)}
                //             className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //     </div>
                //     <div className="flex items-center">
                //         <label htmlFor="role" className="block text-sm font-medium text-gray-700 w-1/4">Role:</label>
                //         <input
                //             type="text"
                //             id="role"
                //             value={role}
                //             onChange={(e) => setRole(e.target.value)}
                //             className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //     </div>
                //     <div>
                //         <label className="block text-sm font-medium text-gray-700">Tasks:</label>
                //         {tasks.map((task, index) => (
                //             <div key={index} className="flex items-center space-x-2 mt-2">
                //                 <input
                //                     type="text"
                //                     value={task}
                //                     onChange={(e) => handleTaskChange(index, e.target.value)}
                //                     className="block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //                 <button type="button" onClick={() => removeTask(index)} className="text-red-500">Remove</button>
                //             </div>
                //         ))}
                //         <div className="flex items-center space-x-2 mt-2">
                //             <input
                //                 type="text"
                //                 value={taskInput}
                //                 onChange={(e) => setTaskInput(e.target.value)}
                //                 className="block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                //             <button type="button" onClick={addTask} className="text-indigo-500">Add Task</button>
                //         </div>
                //     </div>
                // </div>
//                 <div className="flex justify-center space-x-4 mt-4">
//                     <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                         {updating ? "Update" : "Create"}
//                     </button>
//                     {updating && (
//                         <>
//                             <button type="button" onClick={handleSuspend} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
//                                 Suspend
//                             </button>
//                             <button type="button" onClick={handleDelete} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
//                                 Delete
//                             </button>
//                         </>
//                     )}
//                 </div>
//             <div>
//             <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={logout}>Logout</button> {/* Button to trigger logout */}
//         </div>
//             </form>
//             <div className="mt-8">
//                 <h2 className="text-lg leading-6 font-medium text-gray-900">Employees Contact List</h2>
//                 <ContactList updateContact={updateCallback} />
//             </div>
//         </div>
//     );
// };

// export default ContactForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactList from "./ContactList";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [role, setRole] = useState(existingContact.role || "");
    const [tasks, setTasks] = useState(existingContact.tasks || []);
    const [taskInput, setTaskInput] = useState(""); // State for new task input
    const [userId, setUserId] = useState("");
    
    const navigate = useNavigate();

    const updating = Object.entries(existingContact).length !== 0;
    const handleTaskChange = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
    };

    const addTask = () => {
        if (taskInput.trim() !== "") {
            setTasks([...tasks, taskInput]);
            setTaskInput(""); // Clear task input after adding task
            alert("Task added successfully!");
        } else {
            alert("Task description cannot be empty!");
        }
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        alert("Task removed successfully!");
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const exists = await checkEmailExists(email);
        if (exists) {
            alert("User with this email already exists.");
            return;
        }

        const generatedUserId = generateUserId();
        setUserId(generatedUserId);

        const data = {
            firstName,
            lastName,
            email,
            role,
            tasks,
            user_id: generatedUserId
        };

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        if (response.status === 401) {
            alert("Unauthorized access. Please check your credentials.");
        } else if (response.status !== 201 && response.status !== 200) {
            const errorData = await response.json();
            alert(errorData.message);
        } else {
            const newContact = await response.json();
            updateCallback(newContact);
        }
    };

    const handleSuspend = async () => {
        const url = `http://127.0.0.1:5000/suspend_contact/${existingContact.id}`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ suspended: true })
        };

        const response = await fetch(url, options);
        if (response.status === 200) {
            alert("Contact suspended successfully");
            updateCallback(await response.json());
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };

    const handleDelete = async () => {
        const url = `http://127.0.0.1:5000/delete_contact/${existingContact.id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, options);
        if (response.status === 200) {
            alert("Contact deleted successfully");
            updateCallback(null);
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };

    const checkEmailExists = async (email) => {
        return false; // Implement your logic here
    };

    const generateUserId = () => {
        return Math.floor(Math.random() * 1000) + 1; // Example: Random number between 1 and 1000
    };

    const logout = async () => {
        const response = await fetch('http://127.0.0.1:5000/logout', {
            method: 'GET',
            credentials: 'include' // To include cookies in the request
        });
        if (response.ok) {
            localStorage.removeItem('authToken'); // Example: Removing authentication token
            navigate('/login'); // Redirect to login page after logout
        } else {
            alert("Logout failed. Please try again.");
        }
    };

    const viewContactList = () => {
        navigate("/contact-list");
    };


    return (
        <div>
            <div className="space-y-6 p-6 bg-white shadow-md rounded-md border border-gray-300 max-w-md mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 w-1/4">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 w-1/4">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-1/4">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 w-1/4">Role:</label>
                            <input
                                type="text"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tasks:</label>
                            {tasks.map((task, index) => (
                                <div key={index} className="flex items-center space-x-2 mt-2">
                                    <input
                                        type="text"
                                        value={task}
                                        onChange={(e) => handleTaskChange(index, e.target.value)}
                                        className="block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    <button type="button" onClick={() => removeTask(index)} className="text-red-500">Remove</button>
                                </div>
                            ))}
                            <div className="flex items-center space-x-2 mt-2">
                                <input
                                    type="text"
                                    value={taskInput}
                                    onChange={(e) => setTaskInput(e.target.value)}
                                    className="block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <button type="button" onClick={addTask} className="text-indigo-500">Add Task</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {updating ? "Update Contact" : "Create Contact"}
                        </button>
                            <button
                                type="button"
                                onClick={viewContactList}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                View Contact List
                            </button>
                        <button type="button" onClick={logout} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Logout
                        </button>
                    </div>
                </form>
                {updating && (
                    <div className="mt-6">
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleSuspend} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">Suspend</button>
                            <button onClick={handleDelete} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
                        </div>
                    </div>
                )}
            </div>
            <ContactList />
        </div>
    );
};

export default ContactForm;
