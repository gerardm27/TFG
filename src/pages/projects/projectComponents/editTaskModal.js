import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import useProjects from "../../../hooks/useProjects";
import DropDownPicker from "react-native-dropdown-picker";

const EditTaskModal = ({visible, setVisible, task, generateStoryBoard}) => {
    if (task == null) {
        return null;
    }
    const { t } = useTranslation();
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [assignedMember, setAssignedMember] = useState("");
    const [status, setStatus] = useState("");
    const [statuses, setStatuses] = useState([]);
    const [members, setMembers] = useState([]);

    const [hasError, setHasError] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [openMember, setOpenMember] = useState(false);
    const [valueMember, setValueMember] = useState(null);
    
    const { getAllTasksStatus, getProjectMembers, editTask } = useProjects();


    useEffect(() => {
        const fetchMembers = async () => {
            const _members = await getProjectMembers(task?.project);
            setMembers(_members);
        }
        fetchMembers();
    }, [getProjectMembers, task?.project]);

    useEffect(() => {
        setSubject(task.subject);
        setDescription(task.description);
        setAssignedMember(task.assigned_to);
        setValueMember(task.assigned_to);
        setStatus(task.status);
        setValue(task.status);
        const fetchStatuses = async () => {
            const statuses = await getAllTasksStatus(task?.project);
            setStatuses(statuses);
        }
        fetchStatuses();
    } 
    , [task.subject]);

    useEffect(() => {
        const fetchProjectMembers = async () => {
            const projectMembers = await getProjectMembers(task?.project);
        }
        fetchProjectMembers();
    }
    , [getProjectMembers, task?.project]);

    

    const editStory = async () => {
        if (subject == '') {
            setHasError(true);
            return;
        }
        if (description == '') {
            setDescription(task.description);
        }
        if (assignedMember == '' || assignedMember == null || assignedMember == undefined) {
            setAssignedMember(task.assigned_to);
        }
        if (status == '') {
            setStatus(task.status);
        }
        setHasError(false);
        const newTask = {
            subject: subject,
            description: description,
            assigned_to: assignedMember,
            status: status,
            version: task.version
        }
        await editTask(task.id, newTask);
        generateStoryBoard();
        setVisible(false);
    }

    return (
        <View>
            {task == null ? <Text>Task is null</Text> :
            <Modal transparent={true} visible={visible}>
                <View style={editTaskModalStyles.mainModalView}>
                    <View style={editTaskModalStyles.modal}>
                        <Text style={editTaskModalStyles.modalTitle}>{t("project.editTask")} #{task.ref}</Text>
                        <Text style={editTaskModalStyles.modalSubtitle}>{t("project.editStorySubtitle")}</Text>
                        {hasError && <Text style={editTaskModalStyles.errorText}>{t("project.error")}</Text>}
                        <Text style={editTaskModalStyles.modalText}>{t("project.subject")}</Text>
                        <TextInput
                            style={editTaskModalStyles.input}
                            onChangeText={setSubject}
                            value={subject}
                            placeholder={t("project.subject")}
                            placeholderTextColor="#3f51b5"
                        />
                        <Text style={editTaskModalStyles.modalText}>{t("project.description")}</Text>
                        <TextInput
                            style={editTaskModalStyles.input}
                            onChangeText={setDescription}
                            value={description}
                            placeholder={t("project.description")}
                            placeholderTextColor="#3f51b5"
                            />
                        <View style={editTaskModalStyles.assignedToContainer}>
                            <Text style={editTaskModalStyles.modalText}>{t("project.assignTo")}</Text>
                            <DropDownPicker
                                items={members.map(member => {
                                    return {label: member.full_name, value: member.id}
                                }
                                )}
                                containerStyle={{height: 40, zIndex: 100}}
                                style={editTaskModalStyles.memberInput}
                                itemStyle={editTaskModalStyles.memberInputItem}
                                open={openMember}
                                setOpen={setOpenMember}
                                value={valueMember}
                                setValue={setValueMember}
                                onChangeValue={value => setAssignedMember(value)}
                            />                    
                        </View>
                        <Text style={editTaskModalStyles.modalText}>{t("project.status")}</Text>
                        <DropDownPicker
                            items={
                                statuses.map(status => {
                                    return {label: status.name, value: status.id}
                                })
                            }
                            containerStyle={{height: 40, zIndex: 10}}
                            style={{backgroundColor: '#fafafa', position: 'relative'}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                zIndex: 2
                            }}
                            open={open}
                            value={value}
                            setOpen={setOpen}
                            setValue={setValue}
                            onChangeValue={value => setStatus(value)}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                        />
                        <View style={editTaskModalStyles.buttonZone}>
                            <TouchableOpacity style={editTaskModalStyles.button} onPress={editStory}>
                                <Text style={editTaskModalStyles.buttonText}>{t("project.edit")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={editTaskModalStyles.button} onPress={() => {
                                setVisible(false)
                                }}>
                                <Text style={editTaskModalStyles.buttonText}>{t("project.cancel")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        }
        </View>
    );
}

const editTaskModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 20
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "#3f51b5",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        position: 'relative'
    },
    assignedToContainer: {
        width: "100%",
        marginBottom: 20
    },
    memberInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        height: 40,
        position: 'relative'
    },
    memberInputItem: {
        justifyContent: "flex-start",
        zIndex: 2
    },
    pointsZone: {
        width: "100%",
        marginBottom: 20
    },
    button: {
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: "white",
        fontSize: 16
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginBottom: 20
    },
    buttonZone: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
});

export default EditTaskModal;




