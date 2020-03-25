import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { envVars } from '../../config';

export default function ({ match }) {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [buttonText, setButtonText] = useState('Reset password');

    useEffect(() => {
        let token = match.params.token;

        if ( token ) {
            setToken(token);
        }
    }, [match.params.token]);

    function handleResetPassword (evt) {
        evt.preventDefault();

        axios({
            method: 'PUT',
            url: `${envVars.REACT_APP_API}/reset-password`, 
            data: { newPassword, resetPasswordLink: token },
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS');
                setButtonText('Reseted');
            })
            .catch(err => {
                console.log('FORGOT PASSWORD ERROR', err);
            });
    }
    
    return (
        <div className="App">
            <h1 className="App_heading">Reset Password</h1>

            <form className="App_form" onSubmit={handleResetPassword}>
                <div className="App-form_group">
                    <label className="App_copy">Email</label>
                    <input 
                        type="password" 
                        className="App_input" 
                        name="password" 
                        value={newPassword} 
                        onChange={evt => setNewPassword(evt.target.value)} 
                        placeholder='Type new password'
                        required
                    />
                </div>

                <button 
                    className="App_form_button _submit" 
                    style={{ fontWeight: 400 }}
                >{buttonText}</button>
            </form>  
        </div>
    )
}
