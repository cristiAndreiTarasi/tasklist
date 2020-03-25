import React, { useState } from 'react';
import axios from 'axios';
import { envVars } from '../../config';

export default function () {
    const [email, setEmail] = useState('');
    const [buttonText, setButtonText] = useState('Request password reset link');

    function handleForgotPassword (evt) {
        evt.preventDefault();

        axios({
            method: 'PUT',
            url: `${envVars.REACT_APP_API}/forgot-password`, 
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS');
                setButtonText('Requested');
                setEmail('');
            })
            .catch(err => {
                console.log('FORGOT PASSWORD ERROR', err);
                setButtonText('Request password reset link');
            });
    }
    
    return (
        <div className="App">
            <h1 className="App_heading">Forgot Password</h1>

            <form className="App_form" onSubmit={handleForgotPassword}>
                <div className="App-form_group">
                    <label className="App_copy">Email</label>
                    <input type="email" className="App_input" name="email" value={email} onChange={evt => setEmail(evt.target.value)} />
                </div>

                <button 
                    className="App_form_button _submit" 
                    style={{ fontWeight: 400 }}
                >{buttonText}</button>
            </form>  
        </div>
    )
}

