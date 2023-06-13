import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import useProjects from "../../../hooks/useProjects";

const SprintChooseModal = ({ navigation, visible, setVisible, project_id}) => {
    const { t } = useTranslation();

    const [sprints, setSprints] = useState([]);
    const [selectedSprint, setSelectedSprint] = useState(null);

    const { getSprints } = useProjects();

    useEffect(() => {
        const fetchSprints = async () => {
            const _sprints = await getSprints(project_id);
            setSprints(_sprints);
        }
        fetchSprints();
    }
    , [project_id]);

    const changeScreenToSprint = (sprint) => {
        navigation.navigate("Sprint", { sprint: sprint });
        setVisible(false);
    }

    return (
        <Modal transparent={true} visible={visible} animationType='fade'>
            <View style={sprintChooseModalStyles.mainModalView}>
                <View style={sprintChooseModalStyles.modal}>
                    <Text style={sprintChooseModalStyles.modalTitle}>{t("project.sprintChoose")}</Text>
                    <Text style={sprintChooseModalStyles.modalSubtitle}>{t("project.sprintChooseSubtitle")}</Text>
                    <View style={sprintChooseModalStyles.sprintButtonsContainer}>
                        {sprints.length == 0 ?
                            <Text style={sprintChooseModalStyles.noSprintsText}>{t("project.noSprints")}</Text>
                            :
                            sprints.map((sprint) => (
                                <TouchableOpacity key={sprint.id} style={sprint.closed ? sprintChooseModalStyles.sprintButtonClosed : sprintChooseModalStyles.sprintButton} onPress={() => changeScreenToSprint(sprint)}>
                                    <Text style={sprintChooseModalStyles.sprintButtonText}>
                                        {sprint.name} {sprint.closed ? "[" + t("sprint.closed") + "]" : ""}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>                    
                    <View style={sprintChooseModalStyles.buttonsContainer}>
                        <TouchableOpacity style={sprintChooseModalStyles.button} onPress={() => setVisible(false)}>
                            <Text style={sprintChooseModalStyles.buttonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const sprintChooseModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
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
    sprintButtonsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 10,
    },
    sprintButton: {
        backgroundColor: '#111111',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        marginBottom: 10
    },
    sprintButtonClosed: {
        backgroundColor: '#111111',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        opacity: 0.5
    },
    sprintButtonText: {
        color: "white",
        textAlign: "center"
    },
    noSprintsText: {
        color: "black",
        textAlign: "center"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 5,
        width: '40%'
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }
});

export default SprintChooseModal;
