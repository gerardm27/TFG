import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStylesheet';
import { ScrollView } from 'react-native-gesture-handler';

function ProjectScreen() {

    const [usuario, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);

    const generateProjectList = (projects) => {
        return projects.map((project) => {
            return (    
                    <TouchableOpacity style={customStyles.coolBlockContainer} onPress={()=> {console.log(project.slug);}}>
                        <View style={[customStyles.coolBlockTitleContainer, {height: 50}]}>
                            <Text style={customStyles.title}>{project.name}</Text>
                        </View>
                        <View style={customStyles.coolBlockImageContainer}>
                            {project.logo_big_url ? 
                                <Image style={customStyles.coolBlockImage} source={project.logo_big_url}/>
                                :
                                <Image style={customStyles.coolBlockImage} source={require('../../../assets/images/logo.png')}/>
                            }
                        </View>
                        <View style={customStyles.blockContentContainer}>
                            <View style={styles.projectInfo}>
                                <View style={styles.textView}>
                                    <Text style={customStyles.normalText}>{project.description}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
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
                <ScrollView>
                    {generateProjectList(projects)}
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