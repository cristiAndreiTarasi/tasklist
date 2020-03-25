
import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { envVars } from '../../config';

export default function ({ informParent = f => f }) {
    function responseFacebook (response) {
        axios({
            method: 'POST',
            url: `${envVars.REACT_APP_API}/facebook-login`,
            data: { 
                userID: response.userID,
                accessToken: response.accessToken,
            },
        }).then(response => {
            informParent(response);
        }).catch(error => {
            console.log(`FACEBOOK SIGNIN FAILURE`, error);
        });
    }
    
    return (
        <div>
            <FacebookLogin
                appId={envVars.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                icon="fa-facebook"
                cssClass="App_form_oauth_button"
            />
        </div>
    );
}

