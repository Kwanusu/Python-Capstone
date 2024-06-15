import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import EmailReader from "./EmailReader";

const UserPanel = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [emails, setEmails] = useState([]);

    // Simulated fetch for tasks and emails
    useEffect(() => {
        const fetchTasks = async () => {
            // Fetch tasks from API
            const tasksData = await fetch("http://api.example.com/tasks");
            const tasks = await tasksData.json();
            setTasks(tasks);
        };

        const fetchEmails = async () => {
            // Fetch emails from API
            const emailsData = await fetch("http://api.example.com/emails");
            const emails = await emailsData.json();
            setEmails(emails);
        };

        fetchTasks();
        fetchEmails();
    }, []);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    return (
        <div>
            <h2>User Panel</h2>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                    <h3>Tasks</h3>
                    <TaskList tasks={tasks} onItemClick={handleTaskClick} />
                </div>
                <div style={{ flex: 1 }}>
                    <h3>Emails</h3>
                    <EmailReader emails={emails} />
                </div>
            </div>
            {selectedTask && (
                <div>
                    <h3>Selected Task</h3>
                    <p>{selectedTask.name}</p>
                    <p>{selectedTask.description}</p>
                    <button onClick={() => setSelectedTask(null)}>Close Task</button>
                </div>
            )}
            
        </div>
    );
};

export default UserPanel;
