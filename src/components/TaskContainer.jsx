import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import CreateTaskSection from "./CreateTaskSection";
import SaveTaskSection from "./SaveTaskSection";
import EditTaskSection from "./EditTaskSection";
import { StorageService } from "../services/StorageService";
import { TASK_STORAGE_KEY } from "../constants/storageKeys";
import { TASK_STATUS } from "../constants/taskStatus";

const generateId = () => Math.floor(Math.random() * Date.now());

const getInitialState = () => {
    return JSON.parse(StorageService.getItem(TASK_STORAGE_KEY)) ?? [];
};

export const TaskContainer = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('');
    const [editStatus, setEditStatus] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const data = getInitialState();
        setAllTasks(data);
        if (!data.length) setCurrentStatus(TASK_STATUS.TODO);
    }, []);

    const addTask = (newTask) => {
        setAllTasks(prev => [...prev, { id: generateId(), ...newTask }]);
        setCurrentStatus(null);
    };

    const deleteTask = (id) => {
        if (allTasks.length === 1) setCurrentStatus(TASK_STATUS.TODO);
        setAllTasks(prev => prev.filter(task => task.id !== id));
    };

    const editTask = (task) => {
        setAllTasks(prev => prev.map(item =>
            item.id === task.id ? task : item
        ));
    };

    const saveTask = () => {
        console.log('All tasks were saved to localStorage!')
        StorageService.setItem(TASK_STORAGE_KEY, JSON.stringify(allTasks));
    };

    const cancelTaskCreation = () => {
        setCurrentStatus(null);
    };

    const cancelTaskEdit = () => {
        setEditStatus(null);
    };

    return (
        <div className="tasks">
            <SaveTaskSection onSaveTaskButtonClick={saveTask} />
            <br />
            {currentStatus && (
                <CreateTaskSection
                    onAddTaskButtonClick={addTask}
                    taskCreationStatus={currentStatus}
                    onCancelButtonClick={cancelTaskCreation}
                    currentLength={allTasks.length}
                />
            )}
            {editStatus && (
                <EditTaskSection
                    onSaveTaskButtonClick={editTask}
                    onCancelButtonClick={cancelTaskEdit}
                    selectedTask={selectedTask}
                />
            )}
            <TaskList
                tasks={allTasks}
                onStatusButtonClick={(status) => {
                    if (!editStatus)
                        setCurrentStatus(status);
                    else
                        alert('Please finish editing before adding a new task...');
                }}
                onDeleteTaskButtonClick={deleteTask}
                onEditTaskClick={(val) => {
                    if (!currentStatus)
                        setEditStatus(val);
                    else
                        alert('Please finish creating a task before editing...');
                }}
                setSelectedTask={setSelectedTask}
            />
        </div>
    );
};
