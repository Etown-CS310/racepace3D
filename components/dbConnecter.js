import axios from 'axios';
import { createContext } from 'react';

const API_KEY = '';

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: (token) => {this.token=token; this.isLoggedIn=true;},
    logout: () => {this.token=null; this.isLoggedIn=false;},
});

async function auth(email,password,mode)
{
    console.log(API_KEY);
    const url = mode === 'login' ?
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    //console.log(email,password,mode)
    const response = await axios.post(url,{
        email: email,
        password: password,
        returnSecureToken: true
    });
    console.log(response.data.idToken);
    return response.data.idToken;
}


export async function login(email, password) 
    {
        AuthContext.login(auth(email, password, 'login'));
        return AuthContext.isLoggedIn;
    }

export async function signUp(email, password) 
    {
        AuthContext.login(auth(email, password, 'signup'));
        return AuthContext.isLoggedIn;
    }

