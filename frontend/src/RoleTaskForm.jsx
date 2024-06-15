import React, { useState } from "react";

const RoleTaskForm = ({ contact, updateCallback }) => {
    const [role, setRole] = useState(contact.role || "");
    const [task, setTask] = useState(contact.task || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/assign_role_task/${contact.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role, task })
        });
        if (response.status === 200) {
            alert("Role and task assigned successfully!");
            updateCallback();
        } else {
            const data = await response.json();
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="task">Task:</label>
                <input
                    type="text"
                    id="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
            <button type="submit">Assign Role/Task</button>
        </form>
    );
};

export default RoleTaskForm;
