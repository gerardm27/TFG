import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStyleSheet.js';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from "react-i18next";
import CreateProjectModal from './projectComponents/createProjectModal';
import DeleteProjectModal from './projectComponents/deleteProjectModal';
function ProjectListScreen({navigation}) {

    const [usuario, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const generateProjectList = (projects) => {
        return projects.map((project) => {
            return (    
                    <TouchableOpacity key={project.slug} style={customStyles.coolBlockContainer} onPress={()=> {navigation.navigate('Projects', {project: project})}}>
                        <View style={[customStyles.coolBlockTitleContainer, {height: 50}]}>
                            <Text style={customStyles.title}>{project.name}</Text>
                        </View>
                        <TouchableOpacity style={projectListStyles.coolBlockDeleteButton} onPress={()=> {setDeleteModalVisible(true); setProjectToDelete(project.id)}}>
                            <Image style={projectListStyles.coolBlockDeleteButtonImage} source={require('../../../assets/images/delete.png')}/>
                        </TouchableOpacity>
                        <View style={customStyles.coolBlockImageContainer}>
                            {project.logo_big_url ? 
                                <Image style={customStyles.coolBlockImage} source={project.logo_big_url}/>
                                :
                                <Image style={customStyles.coolBlockImage} source={require('../../../assets/images/logo.png')}/>
                            }
                        </View>
                        <View style={customStyles.blockContentContainer}>
                            <View style={projectListStyles.projectInfo}>
                                <View style={projectListStyles.textView}>
                                    <Text style={customStyles.normalText}>{project.description}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
            ) 
        })
    }

    const { getAuth } = useAuth();
    const { getAllProjects, createProject, deleteProject } = useProjects();
    
    useEffect(() => {    
        getAuth().then(item=>{
            setUser(item)
            new Promise(r => setTimeout(r, 100)).then(() => {
                getAllProjects(item?.id).then(proj=>{
                    setProjects(proj);
                })
            })
        })
        
    }, []);   
    
    return(
        <View style={[customStyles.mainContainer, {height: "100%"}]}>
            { projects ? 
                <ScrollView>
                    <TouchableOpacity 
                        style={projectListStyles.createProjectButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={projectListStyles.createProjectButtonText}>Create new project</Text>
                    </TouchableOpacity>

                    {generateProjectList(projects)}
                    <CreateProjectModal 
                        visible={createModalVisible}
                        setVisible={setCreateModalVisible}
                        createProject={createProject}
                    />
                    <DeleteProjectModal
                        visible={deleteModalVisible}
                        setVisible={setDeleteModalVisible}
                        deleteProject={deleteProject}
                        projectToDelete={projectToDelete}
                        projectName={projects.find(project => project.id === projectToDelete)?.name}
                    />
                </ScrollView>
                
                :
                <Text>Loading your projects...</Text>
            }
        </View>
    )
}

const projectListStyles = StyleSheet.create({
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
    createProjectButton: {
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    createProjectButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
    coolBlockDeleteButton: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 5,
        marginRight: 5,
        marginTop: 5,
        borderColor: "#b53f3f",
        backgroundColor: "#fcc4bd",
        borderWidth: 1,
        borderRadius: 15,
    },
    coolBlockDeleteButtonImage: {
        width: 40,
        height: 40,
    }



})

export { ProjectListScreen }