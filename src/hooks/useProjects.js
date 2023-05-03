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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getProjectBySlug");
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getProjectById");
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getAllUserStories")
        }
        const data = response.data;
        return(data);
    }        

    const getAllUserStoriesStatus = async (project_id) => {
        const response = await axios.get(`${API_HOST}/userstory-statuses?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getAllUserStoriesStatus")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in updateUserStoryStatus")
        }
        return response.data;
    }

    const getAllTasks = async (project_id) => {
        const response = await axios.get(`${API_HOST}/tasks?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getAllTasks")
        }
        const data = response.data;
        return(data);
    }

    const getAllTasksStatus = async (project_id) => {
        const response = await axios.get(`${API_HOST}/task-statuses?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getAllTasksStatus")
        }
        const data = response.data;
        return(data);
    }

    const updateTaskStatus = async (taskId, version, newStatus) => {

        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`${API_HOST}/tasks/${taskId}`, {
            "status": newStatus,
            "version": version
        });
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in updateTaskStatus")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in createProject")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in deleteProject")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in editProject")
        }
        return response.data;
    }

    const getProjectMembers = async (project_id) => {
        const response = await axios.get(`${API_HOST}/memberships?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getProjectMembers")
        }
        const data = response.data;
        return(data);
    }

    const getProjectRoles = async (project_id) => {
        const response = await axios.get(`${API_HOST}/roles?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getProjectRoles")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in setMemberRole")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in inviteMember")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in deleteProjectMember")
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
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in createUserStory")
        }
        return response.data;
    }

    const createTask = async (task) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.post(`${API_HOST}/tasks`, task);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in createTask")
        }
        return response.data;
    }

    const getProjectPoints = async (project_id) => {
        const response = await axios.get(`${API_HOST}/points?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getProjectPoints")
        }
        const data = response.data;
        return(data);
    }

    const getUserStory = async (userStoryId) => {
        const response = await axios.get(`${API_HOST}/userstories/${userStoryId}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getUserStory")
        }
        const data = response.data;
        return(data);
    }

    const editUserStory = async (userStoryId, userStory) => {
        const token = await getAuth().auth_token;
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.patch(`${API_HOST}/userstories/${userStoryId}`, userStory);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in editUserStory")
        }
        return response.data;
    }

    const getSprints = async (project_id) => {
        const response = await axios.get(`${API_HOST}/milestones?project=${project_id}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getSprints")
        }
        const data = response.data;
        return(data);
    }
    
    const getTasksByUserStory = async (userStoryId) => {
        const response = await axios.get(`${API_HOST}/tasks?user_story=${userStoryId}`);
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 400 || response.status == 500) {
            console.log("Error in getTasksByUserStory")
        }
        const data = response.data;
        return(data);
    }

    const editTask = async (taskId, task) => {
        const token = await getAuth().auth_token;
        console.log(taskId)
        if(task.description == null || task.description == undefined) {
            task.description = ""
        }
        axios.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        if(task.assigned_to == null || task.assigned_to == undefined) {
            delete task.assigned_to
        }
        console.log(task)
        const response = await axios.patch(`${API_HOST}/tasks/${taskId}`, task);
        console.log(response.data)
        if (response.status == 401) {
            signOut();
        }
        if (response.status == 404 || response.status == 500 || response.status == 400) {
            console.log("Error in editTask")
        }
        return response.data;
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
        getProjectPoints,
        getUserStory,
        editUserStory,
        getSprints,
        getTasksByUserStory,
        createTask,
        editTask
    };
}

export default useProjects;