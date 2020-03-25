import React, { useEffect, useState } from 'react';
import axios from 'axios';

import getCurrentDateTime from '../shared/getTime';
import errorInfo from './errorInfo';
import { toast } from 'react-toastify';

export default function ({ setReload, currentTask, setCurrentTask, setIsAddingOrIsUpdating }) {
    const [text, setText] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => (currentTask.text ? setText(currentTask.text) : setText('')), [currentTask, setText]);

    async function handleSubmit (evt) {
        evt.preventDefault();

        if (currentTask.text) {
            try {
                const res = await axios.put(`http://localhost:8000/api/update-task/${currentTask._id}`, { text });

                setText('');
                setCurrentTask({});
                setIsAddingOrIsUpdating(false);
                setReload(prevReload => !prevReload);
                toast.success(res.data);
            } catch (error) {
                errorInfo(toast.error(error));
            }
        } else {
            try {
                const res = await axios.post('http://localhost:8000/api/create-task', {
                    text,
                    createdDateAndTime: {
                        date: `${getCurrentDateTime().day}/${getCurrentDateTime().month}/${getCurrentDateTime().year}`,
                        time: `${getCurrentDateTime().hours}:${getCurrentDateTime().minutes}:${getCurrentDateTime().seconds}`
                    },
                    creator: currentUser._id,
                });

                setText('');
                setIsAddingOrIsUpdating(false);
                setReload(prevReload => !prevReload);
                toast.success(res.data);
            } catch (error) {
                errorInfo(toast.error(error));
            }
        }
    }

    return (
        <form
            className="App_form"
            onSubmit={handleSubmit}
            style={{ flexDirection: 'row', }}
        >
            <input
                type="text"
                className="App_input"
                placeholder="Type Task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                className={text === '' ? 'App_form_button _no_value' : 'App_form_button _submit'}
                type='submit'
                style={{ padding: 0, margin: 0, fontWeight: 400 }}
            >
                    {!currentTask.text ? 'Submit' : 'Update'}
            </button>
        </form>
    );
}
