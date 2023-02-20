import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import useAuth from './useAuth';
import RNRestart from 'react-native-restart';

const useProjects = () => {

    const {signOut} = useAuth();

    const getAllProjects = async (user_id) => {
        try{
            const response = await axios.get(`https://api.taiga.io/api/v1/projects?member=${user_id}`);
            const data = response.data;
            return(data);
        }
        catch(error){
            if (error.response.status == 401) {
                signOut();
            }
        }
    }

    const getProjectBySlug = async (user_id, project_slug) => {
        const response = await axios.get(`https://api.taiga.io/api/v1/projects?member=${user_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const getNumberOfProjects = async( user_id ) => {
        const projects = await getAllProjects(user_id);
        return projects.length;
    }

    const getAllUserStories = async (project_id) => {
        const response = await axios.get(`https://api.taiga.io/api/v1/userstories?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    return { getAllProjects, getProjectBySlug, getNumberOfProjects, getAllUserStories };
}

export default useProjects;