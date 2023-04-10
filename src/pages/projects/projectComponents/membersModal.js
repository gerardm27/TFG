import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';
import useProjects from '../../../hooks/useProjects';
import DropDownPicker from 'react-native-dropdown-picker';

const MembersModal = ({ project, visible, setVisible}) => {
    const { t } = useTranslation();
    const [members, setMembers] = useState(null);

    const [memberDetailsModalVisible, setMemberDetailsModalVisible] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);
    const [inviteModalVisible, setInviteModalVisible] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const {getProjectMembers, getProjectRoles, setMemberRole, inviteMember, deleteProjectMember} = useProjects();

    const [open, setOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [inviteValue, setInviteValue] = useState(null);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (project) {
                    console.log("project: ", project);
                    const data = await getProjectMembers(project);
                    const roles = await getProjectRoles(project);
                    setCurrentMember(data[0]);
                    setMembers(data);
                    const newItems = [];
                    roles.forEach(element => {
                        newItems.push({label: element.name, value: element.id});
                    });
                    setItems(newItems);
                }
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, [project]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (project) {
                    const data = await getProjectMembers(project);
                    setCurrentMember(data[0]);
                    setMembers(data);
                }
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, [members]);

    useEffect(() => {
        if (currentMember) {
            setValue(currentMember.role);
        }
    }, [currentMember]);    

    useEffect(() => {
        if (value && currentMember) {
            const id = currentMember.id;
            const role_id = value;
            setMemberRole(id, role_id);
        }
    }, [value]);


    const generateMembersList = () => {
        if (members) {
            return members.map((member) => {

                return (
                    <View key={member.id} style={memberModalStyles.memberContainer}>
                        <TouchableOpacity style={memberModalStyles.memberImageNameContainer} onPress={() => {setMemberDetailsModalVisible(true); setCurrentMember(member);}}>
                            {member.full_name === null 
                                ?
                                <Image style={memberModalStyles.memberImage} source={require('../../../../assets/images/userGray.png')}/>
                                :
                                <Image style={memberModalStyles.memberImage} source={require('../../../../assets/images/user.png')}/>
                            }
                            <Text style={memberModalStyles.memberName}>
                                {
                                    member.email.length > 25 ?
                                    member.email.substring(0, 25) + "..." :
                                    member.email
                                }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={memberModalStyles.memberDeleteButton}
                            onPress={() => {deleteMember(member.id)}}
                        >
                            <Image style={memberModalStyles.memberDeleteButtonImage} source={require('../../../../assets/images/delete.png')}/>
                        </TouchableOpacity>
                        <Modal
                            style={memberModalStyles.memberDetailsModal}
                            transparent={true}
                            visible={memberDetailsModalVisible}
                        >
                            <View style={memberModalStyles.mainModalView}>
                                <View style={memberModalStyles.modal}>
                                    <Text style={memberModalStyles.modalTitle}>{t("project.memberDetails")}</Text>
                                    <View style={memberModalStyles.memberDetailsContainer}>
                                        <View style={memberModalStyles.memberDetailsName}>
                                            <Text style={memberModalStyles.memberDetailsTitle}>{t("project.memberDetailsName")}</Text>
                                            <Text style={memberModalStyles.memberDetailsText}>{currentMember.full_name}</Text>
                                        </View>
                                        <View style={memberModalStyles.memberDetailsEmail}>
                                            <Text style={memberModalStyles.memberDetailsTitle}>{t("project.memberDetailsEmail")}</Text>
                                            <Text style={memberModalStyles.memberDetailsText}>{currentMember.email}</Text>
                                        </View>
                                        <View style={memberModalStyles.memberDetailsRole}>
                                            <Text style={memberModalStyles.memberDetailsTitle}>{t("project.memberDetailsRole")}</Text>
                                            <DropDownPicker
                                                style={memberModalStyles.memberDetailsRolePicker}
                                                open={open}
                                                value={value}
                                                items={items}
                                                setOpen={setOpen}
                                                setValue={changeMemberRole}
                                                setItems={setItems}
                                            />
                                        </View>
                                    </View>
                                    <View style={memberModalStyles.buttonsContainer}>
                                        <TouchableOpacity style={memberModalStyles.button} onPress={() => setMemberDetailsModalVisible(false)}>
                                            <Text style={memberModalStyles.buttonText}>{t("profile.close")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            })
        }        
    }

    const invite = () => {
        if (inviteName) {
            inviteMember(project, inviteValue, inviteName);
            setInviteModalVisible(false);
        }
    }

    const deleteMember = (id) => {
        deleteProjectMember(id);
    }

    const changeMemberRole = (role) => {
        setValue(role);
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={memberModalStyles.mainModalView}>
                <View style={memberModalStyles.modal}>
                    <Text style={memberModalStyles.modalTitle}>{t("project.members")}</Text>
                    <Text style={memberModalStyles.modalSubtitle}>{t("project.membersSubtitle")}</Text>
                    {generateMembersList()}
                    <TouchableOpacity style={memberModalStyles.inviteButton} onPress={() => setInviteModalVisible(true)}>
                        <Text style={memberModalStyles.inviteButtonText}>{t("project.invite")}</Text>
                    </TouchableOpacity>
                    <View style={memberModalStyles.buttonsContainer}>
                        <TouchableOpacity style={memberModalStyles.button} onPress={() => setVisible(false)}>
                            <Text style={memberModalStyles.buttonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[memberModalStyles.button, {backgroundColor: "#3f51b5"}]} onPress={() => {
                            setVisible(false);
                        }}>
                            <Text style={memberModalStyles.deleteButtonText}>{t("project.accept")}</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal 
                        style={memberModalStyles.inviteModal}
                        transparent={true}
                        visible={inviteModalVisible}
                    >
                        <View style={memberModalStyles.mainModalView}>
                            <View style={memberModalStyles.modal}>
                                <Text style={memberModalStyles.modalTitle}>{t("project.invite")}</Text>
                                <Text style={memberModalStyles.modalSubtitle}>{t("project.inviteSubtitle")}</Text>
                                <TextInput
                                    style={memberModalStyles.input}
                                    onChangeText={setInviteName}
                                    value={inviteName}
                                    placeholder={t("project.inviteName")}
                                    placeholderTextColor="#3f51b5"
                                />
                                <DropDownPicker
                                    style={memberModalStyles.memberDetailsRolePicker}
                                    open={inviteOpen}
                                    value={inviteValue}
                                    items={items}
                                    setOpen={setInviteOpen}
                                    setValue={setInviteValue}
                                    setItems={setItems}
                                />
                                <View style={memberModalStyles.modalButtonContainer}>
                                    <TouchableOpacity style={memberModalStyles.modalButton} onPress={() => setInviteModalVisible(false)}>
                                        <Text style={memberModalStyles.modalButtonText}>{t("project.cancel")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[memberModalStyles.modalButton, {backgroundColor: "#3f51b5"}]} onPress={() => {invite();}}>
                                        <Text style={memberModalStyles.modalButtonText}>{t("project.invite")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </Modal>
    );
}

const memberModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    inviteModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        minHeigth: '100%'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 10,
        color: "#3f51b5"
    },
    input: {
        height: 40,
        borderColor: '#3f51b5',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        color: "#3f51b5"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: 'white'
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    memberContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3f51b5",
    },
    memberImage: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    memberName: {
        fontSize: 16,
        marginRight: 10
    },
    memberDeleteButton: {
        backgroundColor: "#e8a2a2",
        borderColor: "#b53f3f",
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    },
    memberDeleteButtonImage: {
        width: 20,
        height: 20
    },
    inviteButton: {
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    inviteButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    modalButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    modalButton: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 10
    },
    modalButtonText: {
        color: 'white'
    },
    memberImageNameContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    memberDetailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 200,
        marginVertical: 10,
    },
    memberDetailsText: {
        fontSize: 16,
        color: "black"
    },
    memberDetailsTitle: {
        fontSize: 16,
        color: "#3f51b5",
        fontWeight: "bold"
    },
    memberDetailsRolePicker: {
        width: "50%",
        height: 50,
        borderColor: "#3f51b5",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        color: "#3f51b5"
    },
    memberDetailsModal: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        minHeigth: '100%'
    },








});

export default MembersModal;