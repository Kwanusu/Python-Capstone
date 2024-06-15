import React from "react";

const EmailReader = ({ email, onReply, onDelete }) => {
    return (
        <div>
            <h2>Email Reader</h2>
            <div>
                <h4>From: {email.sender}</h4>
                <h5>Subject: {email.subject}</h5>
                <p>{email.body}</p>
                {email.attachments && (
                    <div>
                        <h5>Attachments:</h5>
                        <ul>
                            {email.attachments.map((attachment, index) => (
                                <li key={index}>{attachment.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => onReply(email)}>Reply</button>
                <button onClick={() => onDelete(email.id)}>Delete</button>
            </div>
        </div>
    );
};

export default EmailReader;
