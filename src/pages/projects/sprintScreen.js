import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import useProjects from '../../hooks/useProjects';
import useUser from '../../hooks/useUser';
import ChangeTaskStatusModal from './projectComponents/changeTaskStatusModal';
import CreateTaskModal from './projectComponents/createTaskModal';
import CreateBulkTaskModal from './projectComponents/createBulkTaskModal';
import EditTaskModal from './projectComponents/editTaskModal';
import ChangeTaskAssignedModal from './projectComponents/changeTaskAssignedModal';
import { ActivityIndicator } from 'react-native-paper';

function SprintScreen({navigation, route}) {
    const { t } = useTranslation();
    const sprint = route.params.sprint;

    const [userStories, setUserStories] = useState([]);
    const [tasks, setTasks] = useState(null);
    const [allTasks, setAllTasks] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [statusColors, setStatusColors] = useState([]);
    const [statusIds, setStatusIds] = useState([]);
    
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedUserStory, setSelectedUserStory] = useState(null);

    const [changeStatusModalVisible, setChangeStatusModalVisible] = useState(false);
    const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
    const [createBulkTaskModalVisible, setCreateBulkTaskModalVisible] = useState(false);
    const [changeAssignedModalVisible, setChangeAssignedModalVisible] = useState(false);
    const [taskModalVisible, setTaskModalVisible] = useState(false);

    const [storiesLoaded, setStoriesLoaded] = useState(false);

    const {getUserStory, getTasksBySprint, getTasksByUserStory, getAllTasksStatus} = useProjects();
    
    const {getUser} = useUser();

    const fetchUserStoriesAndTasks = async () => {
        const _userStories = [];
        const _tasks = []

        const _allTasks = await getTasksBySprint(sprint.id);
        setAllTasks(_allTasks);    
        for (let i = 0; i < sprint.user_stories.length; i++) {
            try {
                const userStory = await getUserStory(sprint.user_stories[i].id);
                const tasks = await getTasksByUserStory(sprint.user_stories[i].id);
                if (i == 0){
                    setSelectedUserStory(userStory);
                    setSelectedTask(tasks[0]);
                }
                _userStories.push(userStory);
                _tasks.push(...tasks);
            } catch (error) {
                console.error(`Error fetching data for user story ${sprint.user_stories[i].id}:`, error);
            }
        }
        setUserStories(_userStories);
        setTasks(_tasks);
        setStoriesLoaded(true);
    };

    const fetchStatuses = async () => {
        try {
            const storyStatuses = await getAllTasksStatus(sprint.user_stories[0].project);
            const tempStatuses = [];
            const tempStatusColors = [];
            const tempStatusIds = [];
            storyStatuses.forEach(status => {
                tempStatuses.push(status.name);
                tempStatusColors.push(status.color);
                tempStatusIds.push(status.id);
            });
            setStatuses(tempStatuses);
            setStatusColors(tempStatusColors);
            setStatusIds(tempStatusIds);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };
    
    
    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchUserStoriesAndTasks();
            await fetchStatuses();
            generateStoryBoard(userStories);
        }
        fetchDataAsync();
    }, []);
    
    const activateModal = (task) => {
        setSelectedTask(task);
        setChangeStatusModalVisible(true);
    }

    const activateCreateTaskModal = (userStory) => {
        setSelectedUserStory(userStory);
        setCreateTaskModalVisible(true);
    }

    const activateCreateBulkTaskModal = (userStory) => {
        setSelectedUserStory(userStory);
        setCreateBulkTaskModalVisible(true);
    }

    const activateModalChangeAssigned = (task) => {
        setSelectedTask(task);
        setChangeAssignedModalVisible(true);
    }

     const generateStoryBoardAux = async () => {
        try{
            await fetchUserStoriesAndTasks();
            generateUserStoryBoard(userStories);
        }
        catch(error){
            console.error('Error fetching data:', error);
        }
    }


    const getSourceImage = async (task) => {
        const user = await getUser(task.assigned_to);
        return {uri: user.photo};
    }


    const generateUserStoryBoard = (userStories) => {
        if(!tasks || !userStories || tasks == undefined || userStories == undefined) return null;
      
        var components = [];
        userStories.map((userStory) => {
          const userStoryTasks = tasks.filter((task) => task.user_story == userStory.id);
          components.push(
            <ScrollView horizontal key={userStory.id} style={{borderRadius: 10, borderColor:"grey", borderWidth:2, borderRightWidth:0, backgroundColor: "#f5f5f5", marginBottom: 10 }} contentContainerStyle={sprintStyles.userStoryContainer}>
                <View style={sprintStyles.titleAndButtonsContainer}>
                    <Text style={sprintStyles.userStoryName}>#{userStory.ref} {userStory.subject}</Text>
                    <TouchableOpacity
                        onPress={() => activateCreateTaskModal(userStory)}
                    >
                        <Text style={sprintStyles.createTaskButton}>{t('project.createTask')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => activateCreateBulkTaskModal(userStory)}
                    >
                        <Text style={sprintStyles.createBulkTaskButton}>{t('project.createBulkTask')}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={sprintStyles.userStoriesList}>
                    {statuses.map((status, index) => (
                        <View key={index} style={sprintStyles.taskContainer}>
                            <Text style={sprintStyles.statusName}>{status}</Text>
                            {userStoryTasks.map((task) => (
                                task.status == statusIds[index]?
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setSelectedTask(task);
                                            setTaskModalVisible(true);
                                        }}
                                        key={task.id} style={[sprintStyles.task, {backgroundColor: statusColors[index]}]}>
                                        <Text style={sprintStyles.taskName}>#{task.ref} {task.subject}</Text>
                                        <View style={sprintStyles.taskButtonContainer}> 
                                            <TouchableOpacity
                                                onPress={() => activateModal(task)}
                                                style={sprintStyles.taskChangeStatusButton}
                                            >
                                                <Text style={sprintStyles.taskChangeStatus}>{t('project.changeStatus')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => activateModalChangeAssigned(task)}
                                            >
                                                <Image style={sprintStyles.profileImageIcon} source={task.assigned_to == null ? require("../../../assets/images/defaultProfile.png") : require("../../../assets/images/awakt.jpg")/* getSourceImage(task) */}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                :
                                null
                            ))}                                    
                        </View>
                    ))}
                    
                </ScrollView>
            </ScrollView>
          );
        });
        const storylessTasks = allTasks.filter((task) => task.user_story == null);
        components.push(
            <ScrollView horizontal key={-1} style={{borderRadius: 10, borderColor:"grey", borderWidth:2, borderRightWidth:0, backgroundColor: "#f5f5f5", marginBottom: 10 }} contentContainerStyle={sprintStyles.userStoryContainer}>
                <View style={sprintStyles.titleAndButtonsContainer}>
                    <Text style={sprintStyles.userStoryName}>{t('sprint.storyless')}</Text>
                    <TouchableOpacity
                        onPress={() => activateCreateTaskModal({project_id: sprint.user_stories[0].project, id: -1, sprint_id: sprint.id})}
                    >
                        <Text style={sprintStyles.createTaskButton}>{t('project.createTask')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => activateCreateBulkTaskModal({project_id: sprint.user_stories[0].project, id: -1})}
                    >
                        <Text style={sprintStyles.createBulkTaskButton}>{t('project.createBulkTask')}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={sprintStyles.userStoriesList}>
                    {statuses.map((status, index) => (
                        <View key={index} style={sprintStyles.taskContainer}>
                            <Text style={sprintStyles.statusName}>{status}</Text>
                            {storylessTasks.map((task) => (
                                task.status == statusIds[index]?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedTask(task);
                                            setTaskModalVisible(true);
                                        }}
                                        key={task.id} style={[sprintStyles.task, {backgroundColor: statusColors[index]}]}>
                                        <Text style={sprintStyles.taskName}>#{task.ref} {task.subject}</Text>
                                        <View style={sprintStyles.taskButtonContainer}>
                                            <TouchableOpacity
                                                onPress={() => activateModal(task)}
                                                style={sprintStyles.taskChangeStatusButton}
                                            >
                                                <Text style={sprintStyles.taskChangeStatus}>{t('project.changeStatus')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => activateModalChangeAssigned(task)}
                                            >
                                                <Image style={sprintStyles.profileImageIcon} source={task.assigned_to == null ? require("../../../assets/images/defaultProfile.png") : require("../../../assets/images/awakt.jpg")/* getSourceImage(task) */}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                :
                                null
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        );

        return components;
    };     
            
    return (
        <View style={sprintStyles.mainView}>
            <View style={sprintStyles.topBar}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Projects", {project: sprint.project})}
                >
                    <Image style={sprintStyles.backIcon} source={require("../../../assets/images/back.png")}></Image>
                </TouchableOpacity>
                <View style={sprintStyles.topInfoContainer}>
                    <Text style={sprintStyles.sprintName}>{sprint.name}</Text>
                </View>
            </View>
            {sprint ?
                <View style={sprintStyles.sprintContainer}>
                    <ScrollView contentContainerStyle={sprintStyles.userStoriesContainer}>
                        <Text style={sprintStyles.userStoriesTitle}>{t("sprint.userStories")}</Text>
                        {!storiesLoaded ?
                            <ActivityIndicator size="large" color="#837094" />
                        :
                            userStories ? 
                            generateUserStoryBoard(userStories)
                            :
                            <Text>{t("sprint.noUserStories")}</Text>
                        }
                    </ScrollView>
                    <ChangeTaskStatusModal
                        visible={changeStatusModalVisible}
                        setVisible={setChangeStatusModalVisible}
                        task={selectedTask}
                        statuses={statuses}
                        statusColors={statusColors}
                        statusIds={statusIds}
                        generateStoryBoard={generateStoryBoardAux}
                    />
                    <ChangeTaskAssignedModal
                        visible={changeAssignedModalVisible}
                        setVisible={setChangeAssignedModalVisible}
                        task={selectedTask}
                        generateStoryBoard={generateStoryBoardAux}
                    />
                    <CreateTaskModal
                        visible={createTaskModalVisible}
                        setVisible={setCreateTaskModalVisible}
                        userStory={selectedUserStory}
                        generateStoryBoard={generateStoryBoardAux}
                    />
                    <CreateBulkTaskModal
                        visible={createBulkTaskModalVisible}
                        setVisible={setCreateBulkTaskModalVisible}
                        userStory={selectedUserStory}
                        generateStoryBoard={generateStoryBoardAux}
                    />
                    <EditTaskModal
                        visible={taskModalVisible}
                        setVisible={setTaskModalVisible}
                        task={selectedTask}
                        generateStoryBoard={generateStoryBoardAux}
                    />
                </View>
                :
                <Text>{t("sprint.noInfo")}</Text>
            }
        </View>

    );
}

const sprintStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center",
        marginTop: "20%",
        padding: 10,
        marginBottom: "8%",
    },
    sprintContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15%",
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,        
    },
    topBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 20,
        marginTop: 50,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    topInfoContainer: {
        width: "100%",
        paddingRight: 60,
    },
    sprintName: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        textAlign: "center",
    },
    sprintDescription: {
        fontSize: 16,
        color: "#3f51b5"
    },
    userStoriesContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    userStoriesTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    userStoryContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
    },
    titleAndButtonsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
    },
    userStoryName: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    userStoriesList: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    taskContainer: {
        width: 200,
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginRight: 20,
    },
    statusName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    task: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    taskName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    taskButtonContainer: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    taskChangeStatus: {
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
        borderRadius: 5
    },
    taskChangeStatusButton: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#3f51b5",
        padding: 5,
        borderRadius: 5,
    },

    createTaskButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#3f51b5",
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10
    },
    createBulkTaskButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#3f51b5",
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10
    },
    profileImageIcon: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderColor: "#3f51b5",
        borderWidth: 1,
        backgroundColor: "#fff"
    },
});
    
export { SprintScreen };