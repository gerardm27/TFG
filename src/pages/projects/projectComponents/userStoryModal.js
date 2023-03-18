import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

const UserStoryModal = ({ userStory, visible, setVisible }) => {
    const { t } = useTranslation();

    return (
        <Modal transparent={true} visible={visible}>
        <View style={userStoryModalStyles.mainModalView}>
            <View style={userStoryModalStyles.modal}>
                <Text style={userStoryModalStyles.storySubjectText}>{userStory.subject}</Text>
                <Text style={userStoryModalStyles.storyDescriptionText}>{userStory.description}</Text>
                <View style={userStoryModalStyles.storyStatus}>
                    <Text style={userStoryModalStyles.storyStatusTitle}>{t("project.status")}:</Text>
                    <Text style={userStoryModalStyles.storyStatusText}>{userStory.status_extra_info.name}</Text>
                </View>
                <TouchableOpacity style={userStoryModalStyles.closeButton} onPress={() => setVisible(false)}>
                    <Text style={userStoryModalStyles.closeButtonText}>{t("profile.close")}</Text>
                </TouchableOpacity>
            </View>
        </View>
        </Modal>
  );
};

const userStoryModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        width: '80%'
    },
    storySubjectText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    storyDescriptionText: {
        fontSize: 16,
        marginBottom: 10
    },
    storyStatus: {
        flexDirection: 'row',
    },
    storyStatusTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5
    },
    storyStatusText: {
        fontSize: 16
    },
    closeButton: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
    



});

export default UserStoryModal;
