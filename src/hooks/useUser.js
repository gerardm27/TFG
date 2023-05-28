import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from "axios";
import { API_HOST, IMGBB_API_KEY } from "@env";

const useUser = () => {
    const { auth } = useContext(AuthContext);
    const getUser = async (user_id) => {
        try{
            const response = await axios.get(`${API_HOST}/users/${user_id}`);
            const data = response.data;
            return(data);
        }
        catch(error){
            console.log(error);
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
        try {
          const user_id = auth.id;
          const response = await fetch(`${API_HOST}/users/${user_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.auth_token,
            },
            body: JSON.stringify({
              username: username,
              full_name: fullName,
              full_name_display: fullName,
              bio: bio,
              lang: language,
              read_new_terms: auth.read_new_terms,
              email: email,
            }),
          });
          const status = response.status;
      
          const avatarResponse = await fetch(`${API_HOST}/users/change_avatar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.auth_token,
            },
            body: JSON.stringify({
              avatar: profileImage
            }),
          });
          const status2 = avatarResponse.status;
          return status;
        } catch (error) {
          console.log(error);
        }
      };
      
    return { getUser, editUser, uploadProfilePicture };
}

export default useUser;