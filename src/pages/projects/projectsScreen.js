import { View, Text, Image } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStyleSheet';

function ProjectsScreen() {

    const [usuario, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);

    const generateProjectList = (projects) => {
        return projects.map((project) => {
            return (
                <View style={customStyles.coolBlockContainer}>
                    <View style={customStyles.coolBlockImageContainer}>
                        {project.logo_big_url ? 
                            <Image style={customStyles.coolBlockImage} source={project.logo_big_url}/>
                            :
                            <Image style={customStyles.coolBlockImage} source={require('../../../assets/images/logo.png')}/>
                        }
                    </View>
                    <View style={customStyles.coolBlockTitleContainer}>
                        <Text style={customStyles.coolBlockTitleContainer}>{project.name}</Text>
                        <Text>{project.description}</Text>
                    </View>
                </View>
            ) 
        })
    }

    const { getAuth } = useAuth();
    const { getProjects } = useProjects();
    
    useEffect(() => {    
        getAuth().then(item=>{
            setUser(item)
            new Promise(r => setTimeout(r, 100)).then(() => {
                getProjects(item?.id).then(proj=>{
                    setProjects(proj);
                    console.log(proj);
                })
            })
        })
        
    }, []);   
    
    return(
        <View style={[customStyles.mainContainer, {height: "100%"}]}>
            { projects ? 
                generateProjectList(projects)
                :
                <Text>Loading your projects...</Text>
            }
        </View>
    )
}


export { ProjectsScreen }