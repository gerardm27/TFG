import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import useAuth from './useAuth';
import RNRestart from 'react-native-restart';

const useProjects = () => {

    const {signOut, getAuth} = useAuth();

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

    const getAllUserStoriesStatus = async (project_id) => {
        const response = await axios.get(`https://api.taiga.io/api/v1/userstory-statuses?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const updateUserStoryStatus = async (userStoryId, version, newStatus) => {
        console.log(userStoryId);
        console.log(newStatus);
        console.log("version: " + version);
        const token = await getAuth().auth_tokenL;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`https://api.taiga.io/api/v1/userstories/${userStoryId}`, {
            status_extra_info: {
                name: newStatus
            },
            "version": version
        });
        console.log(response);
        if (response.status == 401) {
            signOut();
        }
        return response;
    }

    return { getAllProjects, getProjectBySlug, getNumberOfProjects, getAllUserStories, updateUserStoryStatus, getAllUserStoriesStatus };
}

export default useProjects;