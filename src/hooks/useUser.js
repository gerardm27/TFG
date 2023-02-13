import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
const useUserSettings = () => {
    const { saveUserSettings, language } = useContext(UserContext);
    const setLanguage = (language) => {
        saveUserSettings({ language });
    }

    const editUser = async (language, fullName, username, bio, email, profileImage) => {
        try{
            
            const user_id = user.id;
            const response = await axios.put(`https://api.taiga.io/api/v1/users/${user_id}`, {
                //This content has to have all the info from the variable user + email from authContext + read_new_terms = true
                username: username,
                full_name: fullName,
                full_name_display: fullName,
                bio: bio,
                lang: language,
                email: email,
                photo: profileImage,
            });
            const data = response.data;
            return(data);
        }
        catch(error){
            console.log(error);
        }
    }

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

    useEffect(()=>{},[language])
    return { setLanguage, language };
}

export default useUserSettings;