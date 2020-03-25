import React from 'react';
import axios from 'axios';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';
import { toast } from 'react-toastify';

import errorInfo from './errorInfo';

const DragHandle = sortableHandle(() => <i className="handle-icon fas fa-grip-lines"></i>);
const SortableElement = sortableElement(({ 
    task, 
    sortedTasks, 
    setCurrentTask, 
    setIsAddingOrIsUpdating,
    setReload }) => {
    const [completed, setCompleted] = React.useState(task.completed);

    async function deleteTask (id) {
        try {
            const res = await axios.delete(`http://localhost:8000/api/delete-task/${id}`);
            setReload(prevReload => !prevReload);
            toast.success(res.data);
        } catch (error) {
            errorInfo(toast.error(error));
        }
    }

    async function toggleComplete (id) {
        try {
            const res = await axios.put(`http://localhost:8000/api/toggle-task/${id}`, { completed });
            setCompleted(res.data.task.completed);
            setReload(prevReload => !prevReload);
            toast.success(res.data.message);
        } catch (error) {
            errorInfo(toast.error(error));
        }
    }
    
    return (
        <li className="App_list_item">
            <div className="dragHelper">
                <div className="main">
                    <DragHandle />
                    
                    <div className="task-group">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => {
                                setCompleted(!completed);
                                toggleComplete(task._id);
                            }}
                        />
                        <p className={`App_copy ${completed && 'lineThrough'}`}>{task.text}</p>
                    </div>

                    {/* Task action buttons (edit & delete) */}
                    <ul className="menu">
                        {!task.completed && (
                            <li className="menu-item">
                                <i
                                    className="fas fa-edit"
                                    onClick={() => {
                                        setCurrentTask({ ...task, text: task.text});
                                        setIsAddingOrIsUpdating(true);
                                    }}></i>
                            </li>
                        )}

                        <li className="menu-item">
                            <i 
                                className="fas fa-trash" 
                                onClick={() => deleteTask(task._id)}
                            ></i>
                        </li>
                    </ul>
                </div>

                {/* Task statusbar holding the creation and upadating timestamps */}
                {!task.completed ? (
                    <div className="status-bar">
                        <div className="timestamp-created">
                            <p>created on
                            <span> {task.createdDateAndTime.date} </span> at
                                <span> {task.createdDateAndTime.time}</span>
                            </p>
                        </div>
                    </div>
                ) : null}

                {/* Task divider */}
                {sortedTasks.indexOf(task) < sortedTasks.length - 1 && (
                    <div className="divider">
                        <div className="dark"></div>
                        <div className="light"></div>
                    </div>
                )}
            </div>
        </li>
    );
});

export default SortableElement;
