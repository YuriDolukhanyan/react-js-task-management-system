import React from 'react'
import './App.css';
import ContentContainer from "./components/ContentContainer";
import { TaskProvider } from './contexts/TaskContext';

function App() {
    return (
        <div className='App'>
            <h1>Task Management SYSTEM - React WEB APP</h1>
            <TaskProvider>
                <ContentContainer />
            </TaskProvider>
        </div>
    );
}

export default App;
