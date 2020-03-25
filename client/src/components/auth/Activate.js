import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function Activate ({ match }) {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);

        if (token) {
            setName(name);
            setToken(token);
        }
    }, [match.params.token, token]);

    function handleSubmit (evt) {
        evt.preventDefault();

        axios({
            method: 'POST',
            url: `http://localhost:8000/api/account-activation`, 
            data: { token }
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response.data.message);
            })
            .catch(err => {
                console.log('ACCOUNT ACTIVATION ERROR', err.response.data.message);
            });
    }
    
    return (
        <div className="col-md-6 offset-md-3 text-center">
            <h1 className="p-5 text-center">Activate your account, { name }.</h1>

            <div>
                <button className="btn btn-outline-primary" onClick={handleSubmit}>Activate account</button>
            </div>
        </div>
    )
}
