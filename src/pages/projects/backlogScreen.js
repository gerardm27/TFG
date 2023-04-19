import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import { ScrollView } from 'react-native-gesture-handler';
import CreateUserStoryModal from './projectComponents/createUserStoryModal.js';
import CreateBulkUserStoryModal from './projectComponents/createBulkUserStoryModal.js';
import UserStoryModal from './projectComponents/userStoryModal';
import SprintChooseModal from './projectComponents/sprintChooseModal';
import { useTranslation } from "react-i18next";

function BacklogScreen({navigation, route}) {
    const { t } = useTranslation();
    const [usuario, setUser] = useState(null);
    const [project, setProject] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);
    const [userStories, setUserStories] = useState(null);
    const [backlogUserStories, setBacklogUserStories] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [statusColors, setStatusColors] = useState([]);
    const [statusIds, setStatusIds] = useState([]);
    const [userStoryModalVisible, setUserStoryModalVisible] = useState(false);

    const { getAllUserStories, updateUserStoryStatus, getAllUserStoriesStatus } = useProjects();
    const defaultLogo = require("../../../assets/images/logo.png");
    const screenWidth = Dimensions.get('window').width;
    const [selectedUserStory, setSelectedUserStory] = useState(backlogUserStories && backlogUserStories[0]);

    const [createModalVisible,setCreateModalVisible] = useState(false);
    const [createBulkModalVisible, setCreateBulkModalVisible] = useState(false);
    const [sprintChooseModalVisible, setSprintChooseModalVisible] = useState(false);
    

    const generateUserStoryList = (backlogUserStories) => {
        if (!backlogUserStories) {
            return <Text style={backlogScreenStyles.noStoriesText}>{t('project.noUserStories')}</Text>
        }
        return backlogUserStories.map(userStory => {
            return(
                <View key={userStory.id} style={[{borderColor: userStory.status_extra_info.color}, backlogScreenStyles.userStoryContainer]}>
                    <View style={backlogScreenStyles.userStoryInfoContainer}>
                        <View style={backlogScreenStyles.idAndSubjectContainer}>
                            <Text style={backlogScreenStyles.userStoryTitle}>#{userStory.ref}</Text>
                            <Text style={backlogScreenStyles.userStoryTitle}>{userStory.subject}</Text>
                        </View>
                    </View>
                    <View style={backlogScreenStyles.userStoryButtonsContainer}>
                        <TouchableOpacity style={backlogScreenStyles.detailsButton}
                            onPress={() => {
                                setSelectedUserStory(userStory)
                                setUserStoryModalVisible(true)
                            }}
                        >
                            <Text style={backlogScreenStyles.detailsButtonText}>{t('project.details')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={backlogScreenStyles.sendToSprintButton}
                            onPress={() => {
                                console.log("Set to current sprint")
                            }}
                        >
                            <Text style={backlogScreenStyles.sendToSprintButtonText}>{t('project.setToCurrentSprint')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    const { getAuth } = useAuth();
    
    useEffect(() => {    
        getAuth().then(async user=>{
            setUser(user);
            setProject(route.params.project);
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
            var _userStories = await getAllUserStories(route.params.project.id)
            _userStories = _userStories.sort((a, b) => a.ref - b.ref)
            setUserStories(_userStories);
            filterStories(_userStories);
        })
    }, [route.params]);

    const filterStories = (userStories) => {
        const _backlogUserStories = userStories.filter(userStory => userStory.milestone === null)
        setBacklogUserStories(_backlogUserStories)
    }
    
    return(
        <View style={{height: '100%'}}>
            { project ? 
                <ScrollView style={backlogScreenStyles.projectContainer}>
                    <View style={backlogScreenStyles.topInfoContainer}>
                        <View style={backlogScreenStyles.imageContainer}>
                            <Image source={{uri: project.logo_big_url} ?? defaultLogo} style={backlogScreenStyles.projectImage}/>
                        </View>
                        <View style={backlogScreenStyles.projectInfoContainer}>
                            <Text style={backlogScreenStyles.projectTitle}>{project.name}</Text>
                            <Text style={backlogScreenStyles.projectDescription}>{project.description}</Text>
                        </View>
                        <View style={backlogScreenStyles.goToKanbanContainer}>
                            <TouchableOpacity style={backlogScreenStyles.goToKanbanButton}
                                onPress={() => setSprintChooseModalVisible(true)}
                            >
                                <Text style={backlogScreenStyles.goToKanbanButtonText}>{t('project.sprintChoose')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={backlogScreenStyles.createUserStoryContainer}>
                        <TouchableOpacity style={backlogScreenStyles.createUserStoryButton}
                            onPress={() => setCreateModalVisible(true)}
                        >
                            <Image source={require('../../../assets/images/add.png')} style={backlogScreenStyles.createUserStoryButtonImage}/>
                            <Text style={backlogScreenStyles.createUserStoryButtonText}>{t('project.createUserStory')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={backlogScreenStyles.createUserStoryButton}
                            onPress={() => setCreateBulkModalVisible(true)}
                        >
                            <Image source={require('../../../assets/images/add_multiple.png')} style={backlogScreenStyles.createUserStoryButtonImage}/>
                            <Text style={backlogScreenStyles.createUserStoryButtonText}>{t('project.createBulkUserStory')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={backlogScreenStyles.userStoriesContainer}>
                        <Text style={backlogScreenStyles.userStoriesTitle}>{t('project.backlog')}</Text>
                        <View style={backlogScreenStyles.userStoriesListContainer}>
                            {generateUserStoryList(backlogUserStories)}
                        </View>
                    </View>
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
                    {selectedUserStory ?
                        <UserStoryModal
                            visible={userStoryModalVisible}
                            setVisible={setUserStoryModalVisible}
                            userStory={selectedUserStory}
                        />
                        :
                        null
                    }
                    <SprintChooseModal
                        visible={sprintChooseModalVisible}
                        setVisible={setSprintChooseModalVisible}
                        project_id={project.id}
                        navigation={navigation}
                    />
                </ScrollView>
                :
                <Text>Loading your projects...</Text>
            }
        </View>
    )
}

const backlogScreenStyles = StyleSheet.create({
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
    userStoriesContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        width: "100%",
        height: "100%",
    },
    userStoriesTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
    userStoriesListContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        width: "97%",
        height: "97%",
        marginBottom: 10,
    },
    userStoryContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 5,
        width: "100%",
        height: "100%",
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
    },
    userStoryInfoContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginHorizontal: 5,
        width: "60%",
        height: "100%",
    },
    idAndSubjectContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        textAlignVertical: "top",
        marginTop: 5,
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
    },
    userStoryTitle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    userStoryDescription: {
        fontSize: 15,
    },
    userStoryButtonsContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        width: "40%",
        height: "100%",
    },
    userStoryButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    userStoryButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    detailsButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: "90%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    detailsButtonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
    },
    sendToSprintButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: "90%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    sendToSprintButtonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
    },
    userStoryStatusContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        width: "50%",
        height: "50%",
        borderWidth: 2,
        borderRadius: 10,
    },
    userStoryStatusText: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 10,
    },






})

export { BacklogScreen }