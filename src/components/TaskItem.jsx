import React from "react";
import { TASK_PRIORITY } from "../constants/taskPriority";

const TaskItem = ({ title, description, priority }) => {
    const getPriorityStyle = () => {
        switch (priority) {
            case TASK_PRIORITY.LOW:
                return { backgroundColor: '#add8e6', padding: '4px 8px', borderRadius: '6px' };
            case TASK_PRIORITY.MEDIUM:
                return { backgroundColor: '#90ee90', padding: '4px 8px', borderRadius: '6px' };
            case TASK_PRIORITY.HIGH:
                return { backgroundColor: '#ff7f7f', padding: '4px 8px', borderRadius: '6px' };
            default:
                return {};
        }
    };

    return (
        <>
            <div>
                <span style={{...getPriorityStyle(), fontSize: '0.875rem', fontStyle: 'italic'}}><strong>Priority: {priority}</strong></span>
                <br />
                <span>&nbsp;</span>
            </div>
            <div><strong>Title: </strong>{title.length > 15 ? title.slice(0, 15) + '...' : title}</div>
            <div><strong>Description: </strong>{description.length > 15 ? description.slice(0, 15) + '...' : description}</div>
        </>
    );
};

export default TaskItem;
