import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import { AuthContext } from '../context/authContext';
const useAuth = () => {

    const { auth, setAuth, logout, getAuthState } = useContext(AuthContext);
    const signIn = async (user) => {
        const { email, password } = user;
        const response = await fetch(`${API_HOST}/auth`, {
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