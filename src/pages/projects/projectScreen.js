import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import customStyles from '../../utils/customStyleSheet.js';
import { ScrollView } from 'react-native-gesture-handler';
import Ionic from "react-native-vector-icons/Ionicons";

function ProjectScreen({navigation, route}) {

    const [usuario, setUser] = useState(null);
    const [project, setProject] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState(null);
    const [userStories, setUserStories] = useState(null);
    const [status, setStatus] = useState(["To Do", "In Progress", "Done"]);
    
    const { getAllUserStories } = useProjects();
    const defaultLogo = require("../../../assets/images/logo.png");
    const screenWidth = Dimensions.get('window').width;

    const generateUserStoryList = (userStories) => {
        return(
            <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {userStories.map((userStory, index) => {
                    return(
                        <View key={index} style={projectScreenStyles.listItem}>
                            <View style={projectScreenStyles.listItemLeft}>
                                <Text style={projectScreenStyles.listItemTitle}>{userStory.subject}</Text>
                                <TouchableOpacity style={projectScreenStyles.listItemButton}
                                    //Open modal to show detail of user story
                                >
                                    <Text style={projectScreenStyles.listItemButtonText}>Details</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={projectScreenStyles.listItemRight}>
                                <Ionic name="chevron-forward-outline" size={30} color="black" />
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
        status.forEach((status, index) => {
            statusPages.push(
                <ScrollView horizontal key={index} contentContainerStyle={[projectScreenStyles.statusPage, {maxWidth: allocatedWidth}]}> 
                    <View style={projectScreenStyles.statusPageTop}>
                        <Text style={projectScreenStyles.statusPageTitle}>{status}</Text>
                    </View>
                    <View style={projectScreenStyles.statusPageContent}>
                        {userStories ? generateUserStoryList(userStories) : <Text>Loading user stories...</Text>}
                    </View>
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
            const _userStories = await getAllUserStories(route.params.project.id)
            setUserStories(_userStories)
        })
    }, []);   
    
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
                    </View>
                    <ScrollView horizontal contentContainerStyle={[projectScreenStyles.changeStatusContainer, {minWidth: (screenWidth*0.95) * status.length}]}>
                        {buildStatusPages()}
                    </ScrollView>
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
        height: "20%"
    },
    imageContainer: {
        marginLeft: 20,
        marginBottom: 10,
    },
    projectImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    projectInfoContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 20,
        marginBottom: 10,
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
        alignItems: "center",
        justifyContent: "center",        
    },
    statusPage: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        
    },
    statusPageTop: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    statusPageTitle: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
    },
    statusPageContent: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 100,
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
    },
    listItemLeft: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    listItemTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    listItemButton: {
        backgroundColor: "red",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    listItemButtonText: {
        color: "white",
    },
    listItemRight: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },

})

export { ProjectScreen }