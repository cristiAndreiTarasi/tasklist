import React from 'react';
import { sortableContainer } from 'react-sortable-hoc';
import SortableElement from './ListItem';

const SortableContainer = sortableContainer(({ 
    sortedTasks, 
    setCurrentTask, 
    setIsAddingOrIsUpdating,
    setReload }) => {
    return (
        <ul className="App_list">
            {sortedTasks.map((task, index) => (
                <SortableElement 
                    key={`task-${task.text}`}
                    index={index}
                    task={task}
                    sortedTasks={sortedTasks}
                    setReload={setReload}
                    setCurrentTask={setCurrentTask}
                    setIsAddingOrIsUpdating={setIsAddingOrIsUpdating}
                />
            ))}
        </ul>
    )
});

export default SortableContainer;
