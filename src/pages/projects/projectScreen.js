import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStyleSheet.js';
import { ScrollView } from 'react-native-gesture-handler';

function ProjectScreen({navigation, route}) {

    const [usuario, setUser] = useState(null);
    const [project, setProject] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);

    const generateProjectView = (project) => {
        return (    
            <Text>{project.slug}</Text>
        ) 
    }

    const { getAuth } = useAuth();
    
    useEffect(() => {    
        getAuth().then(user=>{
            setUser(user)
            setProject(route.params.project)
        })
        
    }, []);   
    
    return(
        <View style={[customStyles.mainContainer, {height: "100%"}]}>
            { project ? 
                <ScrollView>
                    {generateProjectView(route.params.project)}
                </ScrollView>
                
                :
                <Text>Loading your projects...</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    projectInfo: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "100%",
        padding: "1%",
    },
    textView: {
        marginHorizontal: "3%",
        flexShrink: 1,
    },
})

export { ProjectScreen }