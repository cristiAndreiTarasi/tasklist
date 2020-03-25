
import cookie from 'js-cookie';

//  set in cookie
function setCookie (key, value) {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
}

// remove the cookie
function removeCookie (key) {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
}

// get the stored token from the cookie
function getCookie (key, value) {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
}

// set in local storage
function setLocalStorage (key, value) {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// remove from local storage
function removeLocalStorage (key) {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
}

// authenticate user by passing data to cookie and local storage during signin
function authenticate (response, cb) {
    console.log(response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    cb();
}

// access user info from local storage
function isAuth () {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

function signout (cb) {
    removeCookie('token');
    removeLocalStorage('user');
    cb();
}

export { setCookie, removeCookie, getCookie, setLocalStorage, removeLocalStorage, authenticate, isAuth, signout };









