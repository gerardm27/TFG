import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStyleSheet.js';
import { ScrollView } from 'react-native-gesture-handler';
import Ionic from "react-native-vector-icons/Ionicons";
import UserStoryModal from './projectComponents/userStoryModal.js';
import CreateUserStoryModal from './projectComponents/createUserStoryModal.js';
import CreateBulkUserStoryModal from './projectComponents/createBulkUserStoryModal.js';
import { useTranslation } from "react-i18next";

function ProjectScreen({navigation, route}) {
    const { t } = useTranslation();
    const [usuario, setUser] = useState(null);
    const [project, setProject] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);
    const [userStories, setUserStories] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [statusColors, setStatusColors] = useState([]);
    const [statusIds, setStatusIds] = useState([]);
    const [userStoryModalVisible, setUserStoryModalVisible] = useState(false);

    const { getAllUserStories, updateUserStoryStatus, getAllUserStoriesStatus } = useProjects();
    const defaultLogo = require("../../../assets/images/logo.png");
    const screenWidth = Dimensions.get('window').width;
    const [selectedUserStory, setSelectedUserStory] = useState(null);

    const [createModalVisible,setCreateModalVisible] = useState(false);
    const [createBulkModalVisible, setCreateBulkModalVisible] = useState(false);

    useEffect(() => {buildStatusPages();}, [userStories]);


    const changeUserStoryStatus = async (userStoryId,userStoryVersion, newStatus, forward) => {
        await updateUserStoryStatus(userStoryId, userStoryVersion, newStatus)
        // change the current user story list to reflect the change
        setUserStories(userStories.map(userStory => {
            if(userStory.id === userStoryId){
                userStory.status_extra_info.id = newStatus;
                userStory.status_extra_info.name = statuses[statuses.indexOf(userStory.status_extra_info.name)+forward];
            }
            return userStory;
        }));
    } 

    const generateUserStoryList = (userStories, status) => {
        userStories = userStories.filter(userStory => userStory.status_extra_info.name === status);
        return(
            <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {userStories.map((userStory, index) => {
                    return( 
                        <View key={index} style={[projectScreenStyles.listItem, {shadowColor: statusColors[statuses.indexOf(status)]}]}>
                            <View style={projectScreenStyles.listItemLeft}>
                                <Text style={projectScreenStyles.listItemTitle}>#{userStory.id} {userStory.subject}</Text>
                                <TouchableOpacity style={projectScreenStyles.listItemButton}
                                    //TODO: Open modal to show detail of user story
                                    onPress={() => {
                                        setSelectedUserStory(userStory);
                                        setUserStoryModalVisible(true);
                                    }}
                                >
                                    <Text style={projectScreenStyles.listItemButtonText}>See details</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={projectScreenStyles.movingButtonsContainer}>
                                {status === statuses[statuses.length-1] ? null :
                                    <TouchableOpacity style={[projectScreenStyles.listItemRight, {borderColor: statusColors[statuses.indexOf(status)+1], height: 40, marginBot: 5}]}
                                        onPress={() => {
                                            const newStatus = statusIds[statuses.indexOf(status)+1];
                                            changeUserStoryStatus(userStory.id, userStory.version, newStatus, 1);
                                        }}
                                        >
                                        <View style = {[projectScreenStyles.textAndIconContainer]}>
                                            <Text style = {[projectScreenStyles.nextStatusText, {color: statusColors[statuses.indexOf(status)+1]}]}>{
                                                statuses[statuses.indexOf(status)+1] 
                                            }</Text>
                                            <Ionic name="play-forward-outline" size={25} color={statusColors[statuses.indexOf(status)+1]} />
                                        </View>
                                    </TouchableOpacity>
                                }
                                {status === statuses[0] ? null :
                                    <TouchableOpacity style={[projectScreenStyles.listItemRight, {borderColor: statusColors[statuses.indexOf(status)-1], height: 40, marginTop: 5}]}
                                        onPress={() => {
                                            const newStatusBack = statusIds[statuses.indexOf(status)-1];
                                            changeUserStoryStatus(userStory.id, userStory.version, newStatusBack, -1);
                                        }
                                        }>
                                        <View style = {[projectScreenStyles.textAndIconContainer]}>
                                            <Ionic name="play-back-outline" size={25} color={statusColors[statuses.indexOf(status)-1]} />
                                            <Text style = {[projectScreenStyles.nextStatusText, {color: statusColors[statuses.indexOf(status)-1]}]}>{
                                                statuses[statuses.indexOf(status)-1]
                                            }</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                            
                        </View>
                    )
                })}
            </View>
        ) 
    }

    const buildStatusPages = () => {
        const statusPages = [];
        const allocatedWidth = screenWidth*0.9;
        statuses.forEach((status, index) => {
            statusPages.push(
                <ScrollView horizontal key={index} contentContainerStyle={[projectScreenStyles.statusPage, {maxWidth: allocatedWidth}]}> 
                    <View style={projectScreenStyles.statusPageTop}>
                        <Text style={[projectScreenStyles.statusPageTitle,{color: statusColors[index]}]}>{status}</Text>
                    </View>
                    <View style={projectScreenStyles.statusPageContent}>
                        {userStories ? generateUserStoryList(userStories, status) : <Text>Loading user stories...</Text>}
                    </View>
                    {selectedUserStory && <UserStoryModal
                        userStory={selectedUserStory}
                        visible={userStoryModalVisible}
                        setVisible={setUserStoryModalVisible}
                        onClosed={() => setSelectedUserStory(null)}
                    />}
                </ScrollView>
            )
        })
        return statusPages;
    }

    const { getAuth } = useAuth();
    
    useEffect(() => {    
        getAuth().then(async user=>{
            setUser(user)
            setProject(route.params.project)
            const storyStatuses = await getAllUserStoriesStatus(route.params.project.id)
            const tempStatuses = []
            const tempStatusColors = []
            const tempStatusIds = []
            storyStatuses.forEach(status => {
                tempStatuses.push(status.name)
                tempStatusColors.push(status.color)
                tempStatusIds.push(status.id)
            })
            setStatuses(tempStatuses)
            setStatusColors(tempStatusColors)
            setStatusIds(tempStatusIds)
            const _userStories = await getAllUserStories(route.params.project.id)
            setUserStories(_userStories)
        })
    }, [route.params, userStories]);   
    
    return(
        <View style={{height: '100%'}}>
            { project ? 
                <ScrollView style={projectScreenStyles.projectContainer}>
                    <View style={projectScreenStyles.topInfoContainer}>
                        <View style={projectScreenStyles.imageContainer}>
                            <Image source={{uri: project.logo_big_url} ?? defaultLogo} style={projectScreenStyles.projectImage}/>
                        </View>
                        <View style={projectScreenStyles.projectInfoContainer}>
                            <Text style={projectScreenStyles.projectTitle}>{project.name}</Text>
                            <Text style={projectScreenStyles.projectDescription}>{project.description}</Text>
                        </View>
                        <View style={projectScreenStyles.goToKanbanContainer}>
                            <TouchableOpacity style={projectScreenStyles.goToKanbanButton}
                                onPress={() => navigation.navigate("Kanban", {project: project})}
                            >
                                <Text style={projectScreenStyles.goToKanbanButtonText}>{t('project.kanbanView')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={projectScreenStyles.createUserStoryContainer}>
                        <TouchableOpacity style={projectScreenStyles.createUserStoryButton}
                            onPress={() => setCreateModalVisible(true)}
                        >
                            <Image source={require('../../../assets/images/add.png')} style={projectScreenStyles.createUserStoryButtonImage}/>
                            <Text style={projectScreenStyles.createUserStoryButtonText}>{t('project.createUserStory')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={projectScreenStyles.createUserStoryButton}
                            onPress={() => setCreateBulkModalVisible(true)}
                        >
                            <Image source={require('../../../assets/images/add_multiple.png')} style={projectScreenStyles.createUserStoryButtonImage}/>
                            <Text style={projectScreenStyles.createUserStoryButtonText}>{t('project.createBulkUserStory')}</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal contentContainerStyle={[projectScreenStyles.changeStatusContainer, {minWidth: (screenWidth*0.95) * statuses.length}]}>
                        {buildStatusPages()}
                    </ScrollView>
                    <CreateUserStoryModal
                        visible={createModalVisible}
                        setVisible={setCreateModalVisible}
                        project_id={project.id}
                    />
                    <CreateBulkUserStoryModal
                        visible={createBulkModalVisible}
                        setVisible={setCreateBulkModalVisible}
                        project_id={project.id}
                    />
                </ScrollView>
                :
                <Text>Loading your projects...</Text>
            }
        </View>
    )
}

const projectScreenStyles = StyleSheet.create({
    projectContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: "100%",
    },
    topInfoContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        height: "20%",
    },
    imageContainer: {
        marginLeft: 10,
        marginVertical: 10,
    },
    projectImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    projectInfoContainer: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 5,
        marginBottom: 10,
        padding: 7,
        width: "40%",
    },
    projectTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    projectDescription: {
        fontSize: 15,
    },
    changeStatusContainer: {
        flex: 1,
        flexDirection: "row",   
    },
    statusPage: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    statusPageTop: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        maxHeight: 50,
        minHeight: 50,
    },
    statusPageTitle: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
    },
    statusPageContent: {
        width: "100%",
        flexDirection: "column",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "lightgrey",
        width: "100%",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: 125,
        minHeight: 125,
    },
    listItemLeft: {
        alignItems: "flex-start",
        width: "60%",
    },
    listItemTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    listItemButton: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        
    },
    listItemButtonText: {
        color: "black",
        fontWeight: "bold",
    },
    listItemRight: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        minHeight: "50%",
        height: "60%",
        flexWrap: "wrap",
        maxWidth: "100%",
        minWidth: "100%",
        backgroundColor: "white",
    },
    movingButtonsContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",        
    },

    nextStatusText: {
        fontSize: 15,
        fontWeight: "bold",
        alignSelf: "center",
    },
    textAndIconContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    goToKanbanContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        marginHorizontal: 5,
        width: "100%",
        height: "100%",
    },
    goToKanbanButton: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    goToKanbanButtonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
    },
    createUserStoryContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        width: "100%",
        height: "100%",
    },
    createUserStoryButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: "45%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    createUserStoryButtonImage: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    createUserStoryButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },

})

export { ProjectScreen }