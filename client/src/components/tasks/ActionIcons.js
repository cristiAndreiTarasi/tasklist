import React from 'react';
import useDeleteTask from '../shared/hooks/useDeleteTask';
import useEditTask from '../shared/hooks/useEditTask';

export default function ({ task, text, setText, setIsAddingOrIsUpdating }) {
    const [remove] = useDeleteTask();
    const [update] = useEditTask();
    
    return (
        <ul className="menu">
            <li className="menu-item">
                <i
                    className="fas fa-edit"
                    onClick={() => update(task._id, text, setText, setIsAddingOrIsUpdating)}></i>
            </li>

            <li className="menu-item">
                <i className="fas fa-trash" onClick={() => remove(task._id)}></i>
            </li>
        </ul>
    );
}
