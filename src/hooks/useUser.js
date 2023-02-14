import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from "axios";

const useUser = () => {
    const { auth } = useContext(AuthContext);

    const getUser = async (user_id) => {
        try{
            const response = await axios.get(`https://api.taiga.io/api/v1/users/${user_id}`);
            const data = response.data;
            return(data);
        }
        catch(error){
            if (error.response.status == 401) {
                signOut();
            }
        }
    }

    const editUser = async (language, fullName, username, bio, email, profileImage) => {
        try{
            const user_id = auth.id;
            const response = await axios.put(`https://api.taiga.io/api/v1/users/${user_id}`, {
                username: username,
                full_name: fullName,
                full_name_display: fullName,
                bio: bio,
                lang: language,
                email: email,
                photo: profileImage,
                read_new_terms: auth.read_new_terms
            });
            const status = response.status;
            console.log(status);
            return(status);
        }
        catch(error){
            console.log(error);
        }
    }

    return { getUser, editUser };
}

export default useUser;