import React from "react";

const TaskList = ({ tasks, onItemClick }) => {
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} onClick={() => onItemClick(task)} style={{ cursor: "pointer", marginBottom: "10px" }}>
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
