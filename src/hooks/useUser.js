import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from "axios";
import { IMGBB_API_KEY } from "@env";

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


    const uploadProfilePicture = async (image64) => {
        try {
          var bodyData = new FormData();
          bodyData.append("image", image64);
          const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {
              method: "POST",
              body: bodyData,
            }
          );
          const data = await response.json();
          const imageUrl = data.data.display_url;
          return imageUrl;
        } catch (error) {
          console.log(error);
        }
      };

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

    return { getUser, editUser, uploadProfilePicture };
}

export default useUser;