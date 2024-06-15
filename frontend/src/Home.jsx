import React from "react";
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Welcome to the Task Management System
        </h1>
        <Link to="/login" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Login
        </Link>
    </div>
);

export default Home;
