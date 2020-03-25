// npm imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import arrayMove from 'array-move';

// components imports
import SVGPlus from '../shared/SVGPlus';
import errorInfo from './errorInfo';
import CreateOrUpdateForm from './CreateOrUpdateForm';
import SortableContainer from './List';

export default function () {
    const [currentTask, setCurrentTask] = useState({});
    const [isAddingOrIsUpdating, setIsAddingOrIsUpdating] = useState(false);
    const [sortedTasks, setSortedTasks] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'))._id;
    const [reload, setReload] = React.useState(null);

    useEffect(() => {
        async function populateTasks () {
            try {
                const res = await axios.get(`http://localhost:8000/api/all-tasks/${currentUser}`);
                setSortedTasks(res.data);
            } catch (error) {
               errorInfo(error);
            }
        }

        populateTasks();
    }, [reload, currentUser]);

    function onSortEnd ({oldIndex, newIndex}) {
        setSortedTasks(arrayMove(sortedTasks, oldIndex, newIndex));
    }

    return (
        <div className="App">
            {isAddingOrIsUpdating ? (
                <CreateOrUpdateForm
                    currentTask={currentTask}
                    sortedTasks={sortedTasks}
                    setCurrentTask={setCurrentTask}
                    isAddingOrIsUpdating={isAddingOrIsUpdating}
                    setIsAddingOrIsUpdating={setIsAddingOrIsUpdating}
                    setReload={setReload}
                />
            ) : (
                <div
                    className='App_add_task'
                    onClick={() => setIsAddingOrIsUpdating(true)}
                >
                    <SVGPlus width={25} />
                    <p className='App_copy'>New Task</p>
                </div>
            )}

            {sortedTasks.length 
                ? <SortableContainer
                    axis='y'
                    lockAxis='y'
                    helperClass='dragStyles'
                    useDragHandle
                    sortedTasks={sortedTasks}
                    setReload={setReload}
                    onSortEnd={onSortEnd}
                    setCurrentTask={setCurrentTask}
                    isAddingOrIsUpdating={isAddingOrIsUpdating}
                    setIsAddingOrIsUpdating={setIsAddingOrIsUpdating}
                /> 
                : <p className='App_copy' style={{ textAlign: 'center' }}>You haven't created any task yet.</p> 
            }
        </div>
    );
}
