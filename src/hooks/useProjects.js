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

    const getProjectById = async (project_id) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.get(`${API_HOST}/projects/${project_id}`);
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
        return response.data;
    }

    const getProjectMembers = async (project_id) => {
        const response = await axios.get(`${API_HOST}/memberships?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const getProjectRoles = async (project_id) => {
        const response = await axios.get(`${API_HOST}/roles?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    const setMemberRole = async (member_id, role_id) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`${API_HOST}/memberships/${member_id}`, {
            role: role_id
        });
        if (response.status == 401) {
            signOut();
        }
        return response.data;
    }

    const inviteMember = async (project_id, role, username) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.post(`${API_HOST}/memberships`, {
            project: project_id,
            role: role,
            username: username
        });
        if (response.status == 401) {
            signOut();
        }
        return response.data;
    }

    const deleteProjectMember = async (member_id) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.delete(`${API_HOST}/memberships/${member_id}`);
        if (response.status == 401) {
            signOut();
        }
        return response.data;
    }

    const createUserStory = async (userStory) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.post(`${API_HOST}/userstories`, userStory);
        if (response.status == 401) {
            signOut();
        }
        return response.data;
    }

    const getProjectPoints = async (project_id) => {
        const response = await axios.get(`${API_HOST}/points?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        const data = response.data;
        return(data);
    }

    return { 
        getAllProjects, 
        getProjectBySlug, 
        getProjectById,
        getNumberOfProjects, 
        getAllUserStories, 
        updateUserStoryStatus, 
        getAllUserStoriesStatus,
        getAllTasks,
        getAllTasksStatus,
        updateTaskStatus,
        createProject,
        deleteProject,
        editProject,
        getProjectMembers,
        getProjectRoles,
        setMemberRole,
        inviteMember,
        deleteProjectMember,
        createUserStory,
        getProjectPoints
    };
}

export default useProjects;