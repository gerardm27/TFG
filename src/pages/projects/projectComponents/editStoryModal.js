import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import useProjects from "../../../hooks/useProjects";
import DropDownPicker from "react-native-dropdown-picker";

const EditStoryModal = ({visible, setVisible, userStory}) => {
    const { t } = useTranslation();
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [points, setPoints] = useState(null);
    const [assignedMember, setAssignedMember] = useState(null);
    const [status, setStatus] = useState(null);
    const [projectUserIds, setProjectUserIds] = useState([]);
    const [projectUserNames, setProjectUserNames] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [members, setMembers] = useState([]);

    const pointTexts = [
        t("project.ux"),
        t("project.design"),
        t("project.front"),
        t("project.back"),];
    const [hasError, setHasError] = useState(false);
    const [pointsIds, setPointsIds] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [openMember, setOpenMember] = useState(false);
    const [valueMember, setValueMember] = useState(null);
    
    const { getAllUserStoriesStatus, getProjectMembers, editUserStory } = useProjects();


    useEffect(() => {
        const fetchMembers = async () => {
            const _members = await getProjectMembers(userStory?.project);
            setMembers(_members);
        }
        fetchMembers();
    }, []);

    useEffect(() => {
        setSubject(userStory.subject);
        setDescription(userStory.description);
        setPoints(userStory.points);
        setAssignedMember(userStory.assigned_user);
        setStatus(userStory.status);
        const fetchStatuses = async () => {
            const statuses = await getAllUserStoriesStatus(userStory?.project);
            setStatuses(statuses);
        }
        setPointsIds(Object.values(userStory.points))
        fetchStatuses();
    } 
    , []);

    useEffect(() => {
        const fetchProjectMembers = async () => {
            const projectMembers = await getProjectMembers(userStory?.project);
            setProjectUserIds(projectMembers.map(member => member.id));
            setProjectUserNames(projectMembers.map(member => member.username));
        }
        fetchProjectMembers();
    }
    , []);

    const generatePointsInput = () => {
        const pointsComponentsRowOne = [];
        const pointsComponentsRowTwo = [];
        for (let i = 0; i < 4; i++) {
            let currentValue = pointsIds[i] + "";
            let component = (
                <View key={i} style={editStoryModalStyles.pointsContainer}>
                    <Text style={editStoryModalStyles.pointsText}>{pointTexts[i]}</Text>
                    <TextInput
                        value={currentValue}
                        style={editStoryModalStyles.pointsInput}
                        onChangeText={setPoints}
                        placeholderTextColor="#3f51b5"
                    />
                </View>
            );
            if(i == 0 || i == 1){
                pointsComponentsRowOne.push(component);
            }
            else{
                pointsComponentsRowTwo.push(component);
            }
        }
        return (
            <View style={editStoryModalStyles.pointsContainer}>
                <View style={editStoryModalStyles.pointsRow}>
                    {pointsComponentsRowOne}
                </View>
                <View style={editStoryModalStyles.pointsRow}>
                    {pointsComponentsRowTwo}
                </View>
            </View>
        );
    }

    const editStory = async () => {
        if (subject == '') {
            setHasError(true);
            return;
        }
        if (description == '') {
            setDescription(userStory.description);
        }
        if (points == '') {
            setPoints(userStory.points);
        }
        if (assignedMember == '') {
            setAssignedMember(userStory.assigned_user);
        }
        if (status == '') {
            setStatus(userStory.status);
        }
        setHasError(false);
        const newUserStory = {
            subject: subject,
            description: description,
            points: points,
            assigned_user: assignedMember,
            status: status
        }

        await editUserStory(userStory.id, newUserStory);
        setVisible(false);
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={editStoryModalStyles.mainModalView}>
                <View style={editStoryModalStyles.modal}>
                    <Text style={editStoryModalStyles.modalTitle}>{t("project.editStory")} #{userStory.ref}</Text>
                    <Text style={editStoryModalStyles.modalSubtitle}>{t("project.editStorySubtitle")}</Text>
                    {hasError && <Text style={editStoryModalStyles.errorText}>{t("project.error")}</Text>}
                    <Text style={editStoryModalStyles.modalText}>{t("project.subject")}</Text>
                    <TextInput
                        style={editStoryModalStyles.input}
                        onChangeText={setSubject}
                        value={subject}
                        placeholder={t("project.subject")}
                        placeholderTextColor="#3f51b5"
                    />
                    <Text style={editStoryModalStyles.modalText}>{t("project.description")}</Text>
                    <TextInput
                        style={editStoryModalStyles.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={t("project.description")}
                        placeholderTextColor="#3f51b5"
                    />
                    <View style={editStoryModalStyles.assignedToContainer}>
                        <Text style={editStoryModalStyles.modalText}>{t("project.assignTo")}</Text>
                        <DropDownPicker
                            items={members.map(member => {
                                return {label: member.full_name, value: member.id}
                            }
                            )}
                            containerStyle={{height: 40}}
                            style={editStoryModalStyles.memberInput}
                            itemStyle={editStoryModalStyles.memberInputItem}
                            open={openMember}
                            setOpen={setOpenMember}
                            value={valueMember}
                            setValue={setValueMember}
                            onChangeValue={value => setAssignedMember(value)}
                        />                    
                    </View>
                    <View style={editStoryModalStyles.pointsZone}>
                        <Text style={editStoryModalStyles.modalText}>{t("project.points")}</Text>
                        {generatePointsInput()}
                    </View>
                    <Text style={editStoryModalStyles.modalText}>{t("project.status")}</Text>
                    <DropDownPicker
                        items={
                            statuses.map(status => {
                                return {label: status.name, value: status.id}
                            })
                        }
                        defaultValue={status}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        open={open}
                        value={value}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={value => setStatus(value)}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                    />
                    <View style={editStoryModalStyles.buttonZone}>
                        <TouchableOpacity style={editStoryModalStyles.button} onPress={editStory}>
                            <Text style={editStoryModalStyles.buttonText}>{t("project.edit")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={editStoryModalStyles.button} onPress={() => setVisible(false)}>
                            <Text style={editStoryModalStyles.buttonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const editStoryModalStyles = StyleSheet.create({
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
        padding: 10
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
    },
    memberInputItem: {
        justifyContent: "flex-start"
    },
    pointsZone: {
        width: "100%",
        marginBottom: 20
    },
    pointsText: {
        fontSize: 16,
        marginRight: 10
    },
    pointsInput: {
        height: 40,
        width: "40%",
        borderColor: "#3f51b5",
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        padding: 10
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
    pointsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-around"
    },
    pointsRow: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonZone: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
});

export default EditStoryModal;




