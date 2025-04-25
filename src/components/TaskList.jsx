import React from "react";
import TaskItem from "./TaskItem";
import { TASK_STATUS } from "../constants/taskStatus";
import "../styles/task.css";

const TaskList = ({ tasks, onStatusButtonClick, onDeleteTaskButtonClick, onEditTaskClick, setSelectedTask }) => {
    if (!tasks.length) {
        return (
            <>
                <br />
                <div>There are no TASKS currently! Loading...</div>
            </>
        );
    }

    const grouped = {
        todo: tasks.filter(task => task.status === TASK_STATUS.TODO),
        doing: tasks.filter(task => task.status === TASK_STATUS.DOING),
        done: tasks.filter(task => task.status === TASK_STATUS.DONE),
        blocked: tasks.filter(task => task.status === TASK_STATUS.BLOCKED),
    };

    const handleTaskEdit = (item) => {
        setSelectedTask(item);
        onEditTaskClick(true);
    };

    console.log(tasks);

    return (
        <div className="task-grid">
            {Object.values(TASK_STATUS).map(status => (
                <div key={status} className="task-column">
                    <h3>{status.toUpperCase()}</h3>
                    {grouped[status].map((item) => (
                        <div
                            key={item.id}
                            className="task-item"
                            style={{ cursor: "pointer" }}
                        >
                            <div onClick={() => handleTaskEdit(item)}>
                                <TaskItem
                                    title={item.title}
                                    description={item.description}
                                    status={item.status}
                                    priority={item.priority}
                                />
                            </div>
                            <button onClick={() => onDeleteTaskButtonClick(item.id)}>Delete</button>
                        </div>
                    ))}
                    {status !== TASK_STATUS.BLOCKED && <div>
                        <button onClick={() => onStatusButtonClick(status)}>
                            <strong>+ Add a New Task with status '{status}'</strong>
                        </button>
                    </div>}
                </div>
            ))}
        </div>
    );
};

export default TaskList;
