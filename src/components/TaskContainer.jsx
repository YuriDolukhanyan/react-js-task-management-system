import React, { useState, useEffect, useReducer } from "react";
import TaskList from "./TaskList";
import CreateTaskSection from "./CreateTaskSection";
import SaveTaskSection from "./SaveTaskSection";
import EditTaskSection from "./EditTaskSection";
import { StorageService } from "../services/StorageService";
import { TASK_STORAGE_KEY } from "../constants/storageKeys";
import { TASK_STATUS } from "../constants/taskStatus";
import { ACTIONS } from "../constants/reducerActions";

const generateId = () => Math.floor(Math.random() * Date.now());

const getInitialState = () => {
    return JSON.parse(StorageService.getItem(TASK_STORAGE_KEY)) ?? [];
};

const tasksReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_TASK:
            return action.payload;
        case ACTIONS.ADD_TASK:
            return [...state, { id: generateId(), ...action.payload }];
        case ACTIONS.DELETE_TASK:
            return state.filter(task => task.id !== action.payload);
        case ACTIONS.EDIT_TASK:
            return state.map(task => 
                task.id === action.payload.id ? action.payload : task
            );
        default:
            return state;
    }
};

export const TaskContainer = () => {
    const [allTasks, dispatch] = useReducer(tasksReducer, []);
    const [currentStatus, setCurrentStatus] = useState('');
    const [editStatus, setEditStatus] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const data = getInitialState();
        dispatch({ type: ACTIONS.SET_TASK, payload: data });
        if (!data.length) setCurrentStatus(TASK_STATUS.TODO);
    }, []);

    const addTask = (newTask) => {
        dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
    };

    const deleteTask = (id) => {
        if (allTasks.length === 1) setCurrentStatus(TASK_STATUS.TODO);
        dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    };

    const editTask = (task) => {
        dispatch({ type: ACTIONS.EDIT_TASK, payload: task });
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
