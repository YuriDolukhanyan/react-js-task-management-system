import React, { useState, useEffect, useContext } from "react";
import TaskList from "./TaskList";
import CreateTaskSection from "./CreateTaskSection";
import SaveTaskSection from "./SaveTaskSection";
import EditTaskSection from "./EditTaskSection";
import { StorageService } from "../services/StorageService";
import { TASK_STORAGE_KEY } from "../constants/storageKeys";
import { TASK_STATUS } from "../constants/taskStatus";
import { ACTIONS } from "../constants/reducerActions";
import { TaskContext } from "../contexts/TaskContext";

const getInitialState = () => {
    return JSON.parse(StorageService.getItem(TASK_STORAGE_KEY)) ?? [];
};

const TaskContainer = () => {
    const { tasks: allTasks, dispatch } = useContext(TaskContext);
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
        if (allTasks.length === 1) {
            setCurrentStatus(TASK_STATUS.TODO);
            cancelTaskEdit();
        } 
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
        setEditStatus(false);
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

export default TaskContainer;
