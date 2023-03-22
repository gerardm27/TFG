import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';
const useAuth = () => {

    const { auth, setAuth, logout, getAuthState } = useContext(AuthContext);
    
    //const signIn = async (user) => {
    //    const { email, password } = user;
    //    
    //    const response = await axios.post(`http://192.168.228.231:9000/api/v1/auth`, {
    //        headers: {
    //            'Content-Type': 'application/json',
    //            'Accept':'*/*'
    //        },
    //        password: password,
    //        type:'normal',
    //        username: email,
    //    })
    //    console.log(response);
    //    const data = response.data;
    //    setAuth(data);   
    //}

    const signIn = async (user) => {
        const { email, password } = user;
    
        const response = await fetch('http://192.168.228.231:9000/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'normal',
                username: email,
                password: password,
            })
        });
    
        
        const data = await response.json()
        setAuth(data);   
    }
    

    const signUp = async (user) => {
        const { name, email, password, username } = user;
        await axios.post(`${API_HOST}/api/auth/register`, {
            "accepted_terms": "true",
            "email": email,
            "full_name": name,
            "password": password,
            "type": "public",
            "username": username
        })
    }

    const getAuth = async () => {
        return auth;
    }

    const signOut = async () => {
        logout();
    }

    return { signIn, signOut, signUp, getAuth };
}

export default useAuth;