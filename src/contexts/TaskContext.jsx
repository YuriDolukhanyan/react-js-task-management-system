import React, { createContext, useReducer } from "react";
import { ACTIONS } from "../constants/reducerActions";

const generateId = () => Math.floor(Math.random() * Date.now());

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

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
