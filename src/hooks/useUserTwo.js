

const useUser2 = () => {
  
    const noFaRes = () => {
        console.log('Polken TOntito');
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

    const editUser = async (language, fullName, username, bio, email, profileImage) => {
        try{
            const user_id = user.id;
            const response = await axios.put(`https://api.taiga.io/api/v1/users/${user_id}`, {
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

    return { noFaRes, getUser, editUser };
}

export default useUser2;