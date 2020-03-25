import React, { useState } from 'react';
import axios from 'axios';

export default function () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit (evt) {
        evt.preventDefault();

        axios({
            method: 'POST',
            url: `http://localhost:8000/api/signup`, 
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response.data.message);
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch(err => {
                console.log('SIGNUP ERROR', err);
            });
    }

    return (
        <div className="App">
            <h1 className="App_heading">Signup</h1>

            <form className="App_form">
                <div className="App_form_group">
                    <label className="App_copy">Name</label>
                    <input type="text" className="App_input" name="email" value={name} onChange={evt => setName(evt.target.value)} />
                </div>

                <div className="App_form_group">
                    <label className="App_copy">Email</label>
                    <input type="email" className="App_input" name="email" value={email} onChange={evt => setEmail(evt.target.value)} />
                </div>

                <div className="App_form_group">
                    <label className="App_copy">Password</label>
                    <input type="text" className="App_input" name="email" value={password} onChange={evt => setPassword(evt.target.value)} />
                </div>

                <button 
                    className="App_form_button _submit" 
                    onClick={handleSubmit}
                    style={{ fontWeight: 400 }}
                >Submit</button>
            </form>     
        </div>
    );
}