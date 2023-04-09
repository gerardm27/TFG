import { View, Text, Image, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStyleSheet.js';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from "react-i18next";
import CreateProjectModal from './projectComponents/createProjectModal';
import DeleteProjectModal from './projectComponents/deleteProjectModal';
import EditProjectModal from './projectComponents/editProjectModal';
import MembersModal from './projectComponents/membersModal';
function ProjectListScreen({navigation}) {

    const [usuario, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [membersModalVisible, setMembersModalVisible] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [optionsEnabled, setOptionsEnabled] = useState(false);

    const generateProjectList = (projects) => {
        return projects.map((project) => {
            return (    
                    <TouchableOpacity key={project.slug} style={customStyles.coolBlockContainer} onPress={()=> {navigation.navigate('Projects', {project: project})}}>
                        <View style={[projectListStyles.coolBlockTitleContainer, {height: 50}]}>
                            <Text style={customStyles.title}>
                                {project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name}
                            </Text>
                            <TouchableOpacity style={[projectListStyles.coolBlockEditButton, !optionsEnabled ? {display:'none'} : {display: 'flex'}]} onPress={()=> {setEditModalVisible(true); setProjectToEdit(project.id); setOptionsEnabled(false);}}>
                                <Image style={projectListStyles.coolBlockEditButtonImage} source={require('../../../assets/images/edit.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={[projectListStyles.coolBlockMembersButton, !optionsEnabled ? {display:'none'} : null]} onPress={()=> {setMembersModalVisible(true); setProjectToEdit(project.id); setOptionsEnabled(false);}}>
                                <Image style={projectListStyles.coolBlockMembersButtonImage} source={require('../../../assets/images/members.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={[projectListStyles.coolBlockDeleteButton, !optionsEnabled ? {display:'none'} : null]} onPress={()=> {setDeleteModalVisible(true); setProjectToDelete(project.id); setOptionsEnabled(false);}}>
                                <Image style={projectListStyles.coolBlockDeleteButtonImage} source={require('../../../assets/images/delete.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={[projectListStyles.coolBlockEditButton, optionsEnabled ? {display:'none'} : null]} onPress={()=> {setOptionsEnabled(true);}}>
                                <Image style={projectListStyles.coolBlockEditButtonImage} source={require('../../../assets/images/options.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={projectListStyles.blockContentContainer}>
                            <View style={projectListStyles.projectInfo}>
                                <View style={projectListStyles.textView}>
                                    <Text style={customStyles.normalText}>{project.description}</Text>
                                </View>
                                <View style={projectListStyles.imageBlock}>
                                    <View style={projectListStyles.coolBlockImageContainer}>
                                        {project.logo_big_url ? 
                                            <Image style={projectListStyles.coolBlockImage} source={project.logo_big_url}/>
                                            :
                                            <Image style={projectListStyles.coolBlockImage} source={require('../../../assets/images/logo.png')}/>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
            ) 
        })
    }

    const { getAuth } = useAuth();
    const { getAllProjects, createProject, deleteProject, editProject } = useProjects();
    
    useEffect(() => {    
        getAuth().then(item=>{
            setUser(item)
            new Promise(r => setTimeout(r, 100)).then(() => {
                getAllProjects(item?.id).then(proj=>{
                    setProjects(proj);
                    setProjectToEdit(proj[0].id);
                })
            })
        })
        
    }, [projects]);   
    
    return(
        <View style={[customStyles.mainContainer, {height: "100%"}]}>
            { projects ? 
                <ScrollView>
                    <TouchableOpacity 
                        style={projectListStyles.createProjectButton}
                        onPress={() => setCreateModalVisible(true)}
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
                    <EditProjectModal
                        visible={editModalVisible}
                        setVisible={setEditModalVisible}
                        projectToEdit={projectToEdit}
                        editProject={editProject}
                    />
                    <MembersModal
                        project={projectToEdit}
                        visible={membersModalVisible}
                        setVisible={setMembersModalVisible}
                    />
                </ScrollView>
                
                :
                <Text>Loading your projects...</Text>
            }
        </View>
    )
}

const projectListStyles = StyleSheet.create({
    coolBlockTitleContainer: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        backgroundColor: "#f3edff",
        padding: 10,
        paddingLeft: "5%",
        minHeight: 60,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    projectInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        maxWidth: "100%",
        padding: "1%",
        minHeight: 100,
    },
    textView: {
        flexShrink: 1,
        maxWidth: "70%",
        minWidth: "70%",
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
    coolBlockEditButton: {
        backgroundColor: "#a8b1e3",
        borderColor: "#3f51b5",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        marginLeft: 20,
    },
    coolBlockEditButtonImage: {
        width: 15,
        height: 15,
    },
    coolBlockDeleteButton: {
        backgroundColor: "#e8a2a2",
        borderColor: "#b53f3f",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    coolBlockDeleteButtonImage: {
        width: 15,
        height: 15,
    },
    coolBlockMembersButton: {
        backgroundColor: "#a8b1e3",
        borderColor: "#3f51b5",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    coolBlockMembersButtonImage: {
        width: 15,
        height: 15,
    },
    coolBlockImageContainer: {
        width: "100%",
        maxHeight: "100%",
    },
    coolBlockImage: {
        resizeMode: "contain",
        width: "66%",
        height: "100%",
        overflow: "hidden",
        alignSelf: "center",
        marginTop: 10,
    },
    blockContentContainer: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 30,
    },
    imageBlock: {
        width: "30%",
        maxHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
})

export { ProjectListScreen }