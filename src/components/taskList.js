// components/TaskList.js
import React, { useState, useEffect } from 'react';
import taskStore from '../fluxComponents/taskStore';
import { addTask, editTask, deleteTask } from '../fluxComponents/taskActions';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function TaskList({ tasks, handleEditTask, onDeleteTask }) {
    console.log("TaskList-->", tasks);

    function handleEdit(updatedTask) {
        handleEditTask(updatedTask);
    }

    function handleDelete(taskId) {
        onDeleteTask(taskId);
    }

    const formatDate = (date) => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <>
            <div>
                {
                    tasks.map(task => (
                        task ?
                        <div key={task.id} className='container task-container'>
                            <div className='title-div'>
                                <div>{task.title}</div>
                                <div>
                                    <svg onClick={() => handleEdit(task)} className='edit-icon cursor-pointer bi bi-pencil-square' xmlns="http://www.w3.org/2000/svg" width="16" height="16" title="Edit Task" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    <svg onClick={() => handleDelete(task)} title="Delete Task" className='cursor-pointer bi bi-trash-fill' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg>
                                </div>
                            </div>
                            <div className='description-div'>
                                {task.description}
                            </div>
                            <div className='task-footer-section'>
                                <div className=''>
                                    <Badge pill bg="primary">
                                        {task.state}
                                    </Badge>
                                </div>
                                <div className=''>Date: {formatDate(task.date)}</div>
                            </div>
                        </div> : ''
                    ))
                }
            </div>
        </>
    );
}

export default TaskList;
