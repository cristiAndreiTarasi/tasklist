import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import Google from './Google';
import Facebook from './Facebook';
import { envVars } from '../../config';

export default function ({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function informParent (response) {
        authenticate(response, () => {
            history.push('/private');
        });
    }

    function handleSignin (evt) {
        evt.preventDefault();

        axios({
            method: 'POST',
            url: `${envVars.REACT_APP_API}/signin`, 
            data: { email, password }
        }).then(response => {
            console.log('SIGNIN SUCCESS', `Welcome ${response.data.user.name}`);
            authenticate(response, () => {
                setEmail('');
                setPassword('');
                history.push('/private');
            });
        })
        .catch(err => {
            console.log('SIGNUP ERROR', err);
        });
    }
    
    return (
        <div className="App">
            {isAuth() ? <Redirect to='/' /> : null}
            
            <h1 className="App_heading">Signin</h1>

            <form className="App_form">
                <div className="App_form_login_group">
                    <Google informParent={informParent} />
                    <Facebook informParent={informParent} />
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
                    onClick={handleSignin}
                    style={{ fontWeight: 400 }}
                >Submit</button>

                <Link to='/auth/password/forgot' className='App_form_button _no_value'>Forgot Password ?</Link>
            </form>  

        </div>
    )
}
