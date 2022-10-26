import { View, Text } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import { CardStyleInterpolators } from '@react-navigation/stack';

function ProjectsScreen() {
    
    const [usuario, setUser] = useState(null);
    const [projects, setProjects] = useState(null);

    const { getAuth } = useAuth();
    const { getProjects } = useProjects();
    
    useEffect(() => {    
        getAuth().then(item=>{
            setUser(item)
            new Promise(r => setTimeout(r, 100)).then(() => {
                getProjects(item?.id).then(proj=>{
                    setProjects(proj)
                })
            })
        })
        
    })   

    return(
        <View>
            <Text>Your projects are: {projects[0]?.name}</Text>
        </View>
    )
}


export { ProjectsScreen }