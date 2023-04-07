import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
import useAuth from './useAuth';
import RNRestart from 'react-native-restart';

const useProjects = () => {
    const {signOut, getAuth} = useAuth();

    const getAllProjects = async (user_id) => {
        try{
            const response = await axios.get(`${API_HOST}/projects?member=${user_id}`);
            const data = response.data;
            return(data);
        }
        catch(error){
            console.log(error);
            if (error.response.status == 401) {
                signOut();
            }
        }
    }

    const getProjectBySlug = async (user_id, project_slug) => {
        const response = await axios.get(`${API_HOST}/projects?member=${user_id}`);
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
        const response = await axios.get(`${API_HOST}/userstories?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }        

    const getAllUserStoriesStatus = async (project_id) => {
        const response = await axios.get(`${API_HOST}/userstory-statuses?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const updateUserStoryStatus = async (userStoryId, version, newStatus) => {
        const token = await getAuth().auth_token;
        console.log("llego aqui");
        console.log(userStoryId, version, newStatus);
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`${API_HOST}/userstories/${userStoryId}`, {
            status: newStatus,
            "version": version
        });
        if (response.status == 401) {
            signOut();
        }
        console.log(response.status);
        return response.data;
    }

    const getAllTasks = async (project_id) => {
        const response = await axios.get(`${API_HOST}/tasks?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const getAllTasksStatus = async (project_id) => {
        const response = await axios.get(`${API_HOST}/task-statuses?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const updateTaskStatus = async (taskId, version, newStatus) => {
        const token = await getAuth().auth_tokenL;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`${API_HOST}/tasks/${taskId}`, {
            status_extra_info: {
                name: newStatus
            },
            "version": version
        });
        if (response.status == 401) {
            signOut();
        }
        return response.data;
    }

    const createProject = async (project) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.post(`${API_HOST}/projects`, project);
        if (response.status == 401) {
            signOut();
        }
        return response.data;
    }

    const deleteProject = async (project_id) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.delete(`${API_HOST}/projects/${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        console.log(response.data);
        return response.data;
    }

    const editProject = async (project_id, project) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`${API_HOST}/projects/${project_id}`, project);
        if (response.status == 401) {
            signOut();
        }
        console.log(response.data);
        return response.data;
    }
    




    return { 
        getAllProjects, 
        getProjectBySlug, 
        getNumberOfProjects, 
        getAllUserStories, 
        updateUserStoryStatus, 
        getAllUserStoriesStatus,
        getAllTasks,
        getAllTasksStatus,
        updateTaskStatus,
        createProject,
        deleteProject,
        editProject
    };
}

export default useProjects;