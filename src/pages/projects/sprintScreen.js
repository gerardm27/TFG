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

function SprintScreen({navigation, route}) {
    const { t } = useTranslation();
    const sprint = route.params.sprint;

    const [userStories, setUserStories] = useState([]);
    const [tasks, setTasks] = useState(null);
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

    const {getUserStory, getTasksByUserStory, getAllTasksStatus} = useProjects();
    
    const {getUser} = useUser();

    const fetchUserStoriesAndTasks = async () => {
        const _userStories = [];
        const _tasks = [];
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
            await Promise.all([
                fetchUserStoriesAndTasks(),
                fetchStatuses()
            ])
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
            <ScrollView horizontal key={userStory.id} contentContainerStyle={sprintStyles.userStoryContainer}>
                <View style={sprintStyles.titleAndButtonsContainer}>
                    <Text style={sprintStyles.userStoryName}>#{userStory.ref} {userStory.subject}</Text>
                    <TouchableOpacity
                        onPress={() => activateCreateTaskModal(userStory)}
                    >
                        <Text style={sprintStyles.createTaskButton}>Create Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => activateCreateBulkTaskModal(userStory)}
                    >
                        <Text style={sprintStyles.createBulkTaskButton}>Create Bulk Task</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={sprintStyles.userStoriesList}>
                    {statuses.map((status, index) => (
                        <View key={index} style={sprintStyles.taskContainer}>
                            <Text style={sprintStyles.statusName}>{status}</Text>
                            {/* {userStoryTasks.map((task) => (
                                console.log(task.status, statusIds[index], task.status == statusIds[index])

                                Crear metodo en notificationservice para listar las notificaciones filtradas por usuario de forma paginada

                            ))} */}
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
                                            >
                                                <Text style={sprintStyles.taskChangeStatus}>Change Status</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => activateModalChangeAssigned(task)}
                                            >
                                                <Image style={sprintStyles.profileImageIcon} source={task.assigned_to == null ? require("../../../assets/images/defaultProfile.png") : getSourceImage(task)}></Image>
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
        return components;
    };     
            
    return (
        <View style={sprintStyles.mainView}>
            {sprint?
                <View style={sprintStyles.sprintContainer}>
                    <View style={sprintStyles.topInfoContainer}>
                        <Text style={sprintStyles.sprintName}>{sprint.name}</Text>
                        <Text style={sprintStyles.sprintDescription}>{sprint.description}</Text>
                    </View>
                    <ScrollView contentContainerStyle={sprintStyles.userStoriesContainer}>
                        <Text style={sprintStyles.userStoriesTitle}>{t("sprint.userStories")}</Text>
                        {userStories ? 
                        generateUserStoryBoard(userStories)
                        :
                        <Text>{t("sprint.noUserStories")}</Text>}
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    sprintContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        paddingTop: 20,
    },
    topInfoContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3f51b5",
        paddingTop: 20,
    },
    sprintName: {
        fontSize: 20,
        fontWeight: "bold",
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
        color: "#fff",
        backgroundColor: "#3f51b5",
        padding: 5,
        borderRadius: 5
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
    }








});
    
export { SprintScreen };