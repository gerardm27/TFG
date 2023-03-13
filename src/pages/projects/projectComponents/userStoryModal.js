import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, TextInput, Button } from 'react-native';

const UserStoryModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userStory, setUserStory] = useState(props.userStory);
    const [userStoryStatus, setUserStoryStatus] = useState(props.userStoryStatus);

    const [userStoryName, setUserStoryName] = useState(props.userStory.name);
    const [userStoryDescription, setUserStoryDescription] = useState(props.userStory.description);
    const [userStoryStatusId, setUserStoryStatusId] = useState(null);
    const [userStoryVersion, setUserStoryVersion] = useState(props.userStory.version);

    const [userStoryStatusName, setUserStoryStatusName] = useState(null);
    const [userStoryStatusColor, setUserStoryStatusColor] = useState(null);

    const [userStoryStatusList, setUserStoryStatusList] = useState([]);

    useEffect(() => {
        /* setUserStory(props.userStory);
        setUserStoryStatus(props.userStoryStatus);
        setUserStoryName(props.userStory.name);
        setUserStoryDescription(props.userStory.description);
        setUserStoryStatusId(props.userStory.status_extra_info.status.id);
        setUserStoryVersion(props.userStory.version);
        setUserStoryStatusName(props.userStory.status_extra_info.status.name);
        setUserStoryStatusColor(props.userStory.status_extra_info.status.color);
        setUserStoryStatusList(props.userStoryStatus); */
    }, [props.userStory, props.userStoryStatus]);

    const changeUserStoryStatus = (statusId) => {
        setUserStoryStatusId(statusId);
        setUserStoryStatusName(userStoryStatusList.find(status => status.id == statusId).name);
        setUserStoryStatusColor(userStoryStatusList.find(status => status.id == statusId).color);
    }

    const updateUserStory = () => {
        props.updateUserStory(userStory.id, userStoryVersion, userStoryStatusId);
        setModalVisible(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>User Story Details</Text>
                    <ScrollView>
                        <View style={styles.modalContent}>
                            <View style={styles.modalContentRow}>
                                <Text style={styles.modalContentRowText}>Name:</Text>
                                <TextInput
                                    style={styles.modalContentRowTextInput}
                                    onChangeText={text => setUserStoryName(text)}
                                    value={userStoryName}
                                />
                            </View>
                            <View style={styles.modalContentRow}>
                                <Text style={styles.modalContentRowText}>Description:</Text>
                                <TextInput
                                    style={styles.modalContentRowTextInput} 
                                    onChangeText={text => setUserStoryDescription(text)}
                                    value={userStoryDescription}
                                />
                            </View>
                            <View style={styles.modalContentRow}>
                                <Text style={styles.modalContentRowText}>Status:</Text>
                                <View style={styles.modalContentRowStatus}>
                                    <View style={{ backgroundColor: userStoryStatusColor, width: 20, height: 20, borderRadius: 10, marginRight: 10 }}></View>
                                    <Text style={styles.modalContentRowStatusText}>{userStoryStatusName}</Text>
                                </View>
                            </View>
                            <View style={styles.modalContentRow}>
                                <Text style={styles.modalContentRowText}>Change Status:</Text>
                                <View style={styles.modalContentRowStatus}>
                                    {userStoryStatusList.map((status) => (
                                        <TouchableOpacity key={status.id} onPress={() => changeUserStoryStatus(status.id)}>
                                            <View style={{ backgroundColor: status.color, width: 20, height: 20, borderRadius: 10, marginRight: 10 }}></View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                updateUserStory();
                            }
                            }
                        >
                            <Text style={styles.textStyle}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }
                            }
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

//Create all the necessary styles at once
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalContent: {
        width: '100%',
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 10
    },
    modalContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    modalContentRowText: {
        width: '30%',
        fontWeight: 'bold'

    },
    modalContentRowTextInput: {
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
    },
    modalContentRowStatus: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalContentRowStatusText: {
        fontWeight: 'bold'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default UserStoryModal;
