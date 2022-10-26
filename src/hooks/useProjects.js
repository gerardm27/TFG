import React, { useContext } from 'react';
import axios from 'axios';
import {API_HOST} from '@env';
const useProjects = () => {



    const getProjects = async (id) => {
        const response = await axios.get(`https://api.taiga.io/api/v1/projects?member=${id}`);
        const data = response.data;
        return(data);
    }

    return { getProjects };
}

export default useProjects;