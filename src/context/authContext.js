import axios from "axios";
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const initialState = {
        isSignedIn: false,
        auth_token: null,
        big_photo: null,
        bio: null,
        color: null,
        date_joined: null,
        email: null,
        full_name: null,
        full_name_display: null,
        gravatar_id: null,
        id: null,
        is_active: true,
        lang: null,
        max_memberships_private_projects: null,
        max_memberships_public_projects: null,
        max_private_projects: null,
        max_public_projects: null,
        photo: null,
        read_new_terms: false,
        refresh: null,
        roles: null,
        theme: "",
        timezone: "",
        total_private_projects: 0,
        total_public_projects: 0,
        username: null,
        uuid: null
    }

    const [auth, setAuthState] = useState(initialState);

    const getAuthState = async () => {
        try {
            const authDataString = await AsyncStorage.getItem("auth");
            const authData = JSON.parse(authDataString);

            configureAxiosHeaders(authData.auth_token);
            setAuthState({
                ...authData
            });
        } catch (error) {
           setAuthState(initialState); 
        }
    }

    const setAuth = async (auth) => {
        try {
            auth.isSignedIn = true;
            await AsyncStorage.setItem("auth", JSON.stringify(auth));
            configureAxiosHeaders(auth.auth_token);
            setAuthState(auth);
            console.log(auth);
        } catch (error) {
            Promise.reject(error);  
        }
    }

    const logout = async () => {
        try {
           setAuthState(initialState);
           await AsyncStorage.removeItem("auth");
           configureAxiosHeaders(null);
        } catch (error) {
           Promise.reject(error); 
        }
    }

    const configureAxiosHeaders = (token) => {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '*/*';
    }

    useEffect(() => {
        getAuthState();
    },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }