import React, { useState } from "react";
import { TASK_PRIORITY } from "../constants/taskPriority";
import "../styles/createTask.css";

const CreateTaskSection = ({ onAddTaskButtonClick, taskCreationStatus, onCancelButtonClick, currentLength }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

    const handleAddTask = () => {
        if (!title.trim() || !description.trim() || !priority.trim()) {
            alert('Error: Fill all the needed fields before creating the task...');
            setTitle('');
            setDescription('');
            return;
        }
        onAddTaskButtonClick({
            title,
            description,
            priority,
            status: taskCreationStatus
        });
        setTitle('');
        setDescription('');
        setPriority('');
        onCancelButtonClick();
    };

    return (
        <div className="create-task-section">
            <div className="form-container">
                <span>Status: '{taskCreationStatus}'</span>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="priority-group">
                    <span>Priority:</span>
                    {Object.values(TASK_PRIORITY).map((cur) => (
                        <label key={cur}>
                            <input
                                type="radio"
                                name="priority"
                                onChange={() => setPriority(cur)}
                            />
                            {cur}
                        </label>
                    ))}
                </div>

                <button className="add-btn" onClick={handleAddTask}>Add Task</button>
                {currentLength ? <button className="cancel-btn" onClick={onCancelButtonClick}>Cancel</button> : ""}
            </div>
        </div>
    );
};

export default CreateTaskSection;
