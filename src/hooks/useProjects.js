import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
const useProjects = () => {



    const getAllProjects = async (user_id) => {
        const response = await axios.get(`https://api.taiga.io/api/v1/projects?member=${user_id}`);
        const data = response.data;
        return(data);
    }

    const getProjectBySlug = async (user_id, project_slug) => {
        const response = await axios.get(`https://api.taiga.io/api/v1/projects?member=${user_id}`);
        const data = response.data;
        return(data);
    }

    const getNumberOfProjects = async( user_id ) => {
        const projects = await getAllProjects(user_id);
        return projects.length;
    }

    return { getAllProjects, getProjectBySlug, getNumberOfProjects };
}

export default useProjects;