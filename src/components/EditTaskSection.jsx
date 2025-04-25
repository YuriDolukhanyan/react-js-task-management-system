import React, { useEffect, useState } from "react";
import { TASK_PRIORITY } from "../constants/taskPriority";
import { TASK_STATUS } from "../constants/taskStatus";
import "../styles/editTask.css";

const EditTaskSection = ({ onSaveTaskButtonClick, onCancelButtonClick, selectedTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setPriority(selectedTask.priority);
            setStatus(selectedTask.status);
        }
    }, [selectedTask]);

    const handleSave = () => {
        if (!title.trim() || !description.trim() || !priority.trim()) {
            alert('Error: Fill all the needed fields before editing the task...');
            return;
        }
        onSaveTaskButtonClick({
            ...selectedTask,
            title,
            description,
            priority,
            status
        });
        onCancelButtonClick();
    };

    return (
        <div className="edit-task-section">
            <div className="form-container">
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
                                checked={priority === cur}
                                onChange={() => setPriority(cur)}
                            />
                            {cur}
                        </label>
                    ))}
                </div>

                <div className="status-group">
                    <span>Status:</span>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={TASK_STATUS.TODO}>To Do</option>
                        <option value={TASK_STATUS.DOING}>Doing</option>
                        <option value={TASK_STATUS.DONE}>Done</option>
                        <option value={TASK_STATUS.BLOCKED}>Blocked</option>
                    </select>
                </div>

                <button className="save-btn" onClick={handleSave}>Save Task</button>
                <button className="cancel-btn" onClick={onCancelButtonClick}>Cancel</button>
            </div>
        </div>
    );
};

export default EditTaskSection;
