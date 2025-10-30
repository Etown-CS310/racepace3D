import axios from 'axios';
import { createContext } from 'react';
import { API_KEY } from './apikey';
import * as SecureStore from 'expo-secure-store';



export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: (token) => {this.token=token; this.isLoggedIn=true;},
    logout: () => {this.token=null; this.isLoggedIn=false;},
});

async function auth(email,password,mode)
{
    //console.log(API_KEY);
    const url = mode === 'login' ?
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    //console.log(email,password,mode)
    const response = await axios.post(url,{
        email: email,
        password: password,
        returnSecureToken: true
    });
    //console.log(response.data);
    AuthContext.token= response.data.idToken;
    AuthContext.isLoggedIn= true;
    await SecureStore.setItemAsync('token',response.data.refreshToken);
    //console.log(await SecureStore.getItemAsync('token'));
    return response.data.idToken;
}

export async function refreshToken()
{
    const token = await SecureStore.getItemAsync('token');
    //console.log(token);
    if(token == null)
        return false;
    const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
    const response = await axios.post(url,
        {
            grant_type: 'refresh_token',
            refresh_token: token
        }
    )
    //console.log(response.data.id_token);
    AuthContext.token= response.data.id_token;
    AuthContext.isLoggedIn= true;
    await SecureStore.setItemAsync('token',response.data.refresh_token);
    return true;
}


export async function login(email, password) 
    {
        const id = await auth(email, password, 'login');
        if(id!=null)
            return true;
    }

export async function signUp(email, password) 
    {
        const id = await auth(email, password, 'signup');
        if(id!=null)
            return true;
    }

async function queryDB(token,Purpose)
{
    const api_url = `https://racepace3d-default-rtdb.firebaseio.com/${Purpose}.json?auth=${token}`;

    const response = await axios.get(api_url);
    //console.log(response.data);
    return response.data;
}

export async function getTeams()
{
    const token = AuthContext.token;
    return await queryDB(token,'Teams');
}

