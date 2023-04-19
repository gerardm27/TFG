import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SprintScreen({navigation, route}) {
    const sprint = route.params.sprint;

    const [userStories, setUserStories] = useState([]);
    
    useEffect(() => {
        setUserStories(sprint.user_stories);
        console.clear();
    }, []);




    //This page will have all the user stories inside sprint.userStories array. They will be all located in a column at the left, and then
    // at the right we will have, for each user Story, a scrollable section divided into columns, each one representing a status for these tasks.
    // Finally, in each column, we will have a list of tasks each inside the row of the userStory to which they are related,
    // and each task will have a button to change its status. 
    return (
        <View style={sprintStyles.mainView}>
            {sprint?
                <View style={sprintStyles.sprintContainer}>
                    <View style={sprintStyles.topInfoContainer}>
                        <Text style={sprintStyles.sprintName}>{sprint.name}</Text>
                        <Text style={sprintStyles.sprintDescription}>{sprint.description}</Text>
                    </View>
                    <View style={sprintStyles.userStoriesContainer}>
                        <Text style={sprintStyles.userStoriesTitle}>User Stories</Text>
                        <View style={sprintStyles.userStoriesList}>
                            {userStories.map((userStory) => (
                                <View key={userStory.id} style={sprintStyles.userStoryContainer}>
                                    <Text style={sprintStyles.userStoryName}>{userStory.subject}</Text>
                                    <Text style={sprintStyles.userStoryDescription}>{userStory.ref}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                :
                <Text>No sprint selected</Text>
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
        padding: 20
    },
    topInfoContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    sprintName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    sprintDescription: {
        fontSize: 16,
        color: "#3f51b5"
    },
    userStoriesContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    userStoriesTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    userStoriesList: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    userStoryContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    userStoryName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    userStoryDescription: {
        fontSize: 14,
        color: "#3f51b5",
        marginBottom: 10
    }
});
    
export { SprintScreen };