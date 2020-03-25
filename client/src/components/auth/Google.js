import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { envVars } from '../../config';

export default function ({ informParent = f => f }) {
    function responseGoogle (response) {
        axios({
            method: 'POST',
            url: `${envVars.REACT_APP_API}/google-login`,
            data: { idToken: response.tokenId },
        }).then(response => {
            informParent(response);
        }).catch(error => {
            console.log(`GOOGLE SIGNIN FAILURE`, error);
        });
    }
    
    return (
        <div >
            <GoogleLogin
                clientId={envVars.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

