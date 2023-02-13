import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, TextInput, Button } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import ModalDeleteAccount from './profileComponents/modalDeleteAccount';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUser from '../../hooks/useUser'


function EditProfileScreen({navigation, route}) {
  const { t, i18n } = useTranslation();
  const {fullName, username, bio, email, profileImage, language} = route.params;

  const {editUser} = useUser();

  const STORE_LANGUAGE_KEY = "settings.lang";
  const DEFAULT_LANGUAGE = "settings.defaultlang";
  const [languageSelected, setLanguageSelected] = useState(language);

  const changeLanguage = async (language) => {
    if (language == "default") {
      await AsyncStorage.getItem(DEFAULT_LANGUAGE).then((language) => {
        setLanguageSelected(language);
        i18n.changeLanguage(language);
      });
    } else {
      setLanguageSelected(language);
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
      i18n.changeLanguage(language);
    }
  }

  const defaultImage = require('../../../assets/images/defaultProfile.png');
  const changeUserDetails = () => {
    editUser(language, fullName, username, bio, email, profileImage);
  }
  const ToastMessage = () => {
    ToastAndroid.show(t('editProfile.editSuccessful'), ToastAndroid.SHORT);
  };
  const clearAllFields = () => {
  }

  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

  return (
    <View style={deleteAccountModalVisible ? editProfileStyles.editProfileContainerBlurred : editProfileStyles.editProfileContainer}>
      <View style={editProfileStyles.topBar}>
        <TouchableOpacity 
          onPress = {() => {
            clearAllFields();
            navigation.navigate('Profile')
          }}
        >
          <Ionic name="close-outline" size={35} color="black" />
        </TouchableOpacity>
        <Text style={editProfileStyles.toBarTitle}>{t('editProfile.title')}</Text>
        <TouchableOpacity
          onPress = {() => {
            clearAllFields();
            ToastMessage();
            navigation.navigate('Profile')}}
        >
          <Ionic name="checkmark-outline" size={35} color="#5bb05a" />
        </TouchableOpacity>
      </View>
      <View style={editProfileStyles.topContainer}>
        <TouchableOpacity 
          style={editProfileStyles.profileImageContainer}
        >
          <Image source={{uri: profileImage} ?? defaultImage} style={editProfileStyles.profileImage}/>
          <Image source={require('../../../assets/images/edit.png')} style={editProfileStyles.editProfileImage} />
        </TouchableOpacity>
        <View style={editProfileStyles.topRightContainer}>
          <Text style={editProfileStyles.fullNameHeader}>{t("editProfile.fullNameHeader")}</Text>
          <TextInput
            style={editProfileStyles.editTextInput}
            placeholder={fullName}
          />
          <Text style={editProfileStyles.usernameHeader}>{t("editProfile.usernameHeader")}</Text>
          <TextInput
            style={editProfileStyles.editTextInput}
            placeholder={username}
          />
        </View>
      </View>
      <View style={editProfileStyles.emailEditContainer}>
        <Text style={editProfileStyles.emailHeader}>{t("editProfile.emailHeader")}</Text>
        <TextInput
          style={editProfileStyles.editEmailInput}
          placeholder={email}
        />
      </View>
      <View style={editProfileStyles.bioEditContainer}>
        <View style={editProfileStyles.bioHeaderContainer}>
          <Text style={editProfileStyles.bioHeader}>{t("editProfile.bioHeader")}</Text>
          <Text style={editProfileStyles.bioRestriction}>{t("editProfile.bioRestriction")}</Text>
        </View>
        <TextInput
          style={editProfileStyles.editBioInput}
          placeholder={bio}
          multiline={true}
          maxLength={210}
        />
      </View>
      <View style={editProfileStyles.fullLanguageContainer}>
        <View style={editProfileStyles.languageContainer}>
            <TouchableOpacity style={editProfileStyles.languageButton} onPress={() => changeLanguage("en")}>
                <Image source={require('../../../assets/images/english_flag.png')} style={editProfileStyles.flagImage} />
                <Text style={languageSelected == "en" ? editProfileStyles.languageSelected : editProfileStyles.languageNotSelected}>
                    EN
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={editProfileStyles.languageButton} onPress={() => changeLanguage("es")}>
                <Image source={require('../../../assets/images/spanish_flag.png')} style={editProfileStyles.flagImage} />
                <Text style={languageSelected == "es" ? editProfileStyles.languageSelected : editProfileStyles.languageNotSelected}>
                    ES
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={editProfileStyles.languageButton} onPress={() => changeLanguage("ca")}>
                <Image source={require('../../../assets/images/catalan_flag.png')} style={editProfileStyles.flagImage} />                        
                <Text style={languageSelected == "ca" ? editProfileStyles.languageSelected : editProfileStyles.languageNotSelected}>
                    CA
                </Text>
            </TouchableOpacity>
        </View>
        <View style={editProfileStyles.buttonContainer}>
          <TouchableOpacity
              style={editProfileStyles.defaultButton}
              onPress={() => changeLanguage("default")}
          >
              <Text style={editProfileStyles.defaultText}>{t("profile.backToDefault")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={editProfileStyles.bottomButtonContainer}>
        <TouchableOpacity
          style={editProfileStyles.saveChangesButton}
          onPress={() => {
            //saveChanges();
            ToastMessage();
            navigation.navigate('Profile');
          }}
        >
          <Text style={editProfileStyles.saveChangesText}>{t("editProfile.saveChanges")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={editProfileStyles.deleteAccountButton}
          onPress={()=>{setDeleteAccountModalVisible(!deleteAccountModalVisible)}}
        >
          <Text style={editProfileStyles.deleteAccountText}>{t("editProfile.deleteAccount")}</Text>
        </TouchableOpacity>
      </View>
      <ModalDeleteAccount
        modalVisible={deleteAccountModalVisible}
        setModalVisible={setDeleteAccountModalVisible}
      />
    </View>
  );
}

const editProfileStyles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  editProfileContainerBlurred: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.5,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  toBarTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  topContainer: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  editProfileImage: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    position: "absolute",
    right: 0,
  },  
  topRightContainer: {
    paddingLeft: 20,
    alignItems: "center",
    width: "70%",
    alignText: "left",
  },
  editTextInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 0,
    alignSelf: "flex-start",
  },
  fullNameHeader: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  usernameHeader: {
    paddingTop: 15,
    fontSize: 16,
    alignSelf: "flex-start",
  },
  bioEditContainer: {
    marginTop: 20,
    paddingHorizontal: 20,

  },
  bioHeaderContainer: {
    flexDirection: "row",    
  },
  bioHeader: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  bioRestriction: {
    fontSize: 14,
    color: "gray",
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingTop: 2,
  },
  editBioInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 0,
    alignSelf: "flex-start",
    textAlignVertical: "top",
  },
  emailEditContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  emailHeader: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  editEmailInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 0,
    alignSelf: "flex-start",
  },
  saveChangesButton: {
    marginTop: 20,
    width: "60%",
    height: 40,
    backgroundColor: "#5bb05a",
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
  },
  saveChangesText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteAccountButton: {
    marginTop: 20,
    width: "60%",
    height: 40,
    backgroundColor: "#f57676",
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
  },
  deleteAccountText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  fullLanguageContainer: {
    flexDirection: "column",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  languageButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flagImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  languageSelected: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    color: "#c0a7f2"
  },
  languageNotSelected: {
    fontSize: 16,
    paddingLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  defaultButton: {
    width: "65%",
    height: 40,
    backgroundColor: "#eae4f6",
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
  },
  defaultText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomButtonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 36,
    flex: 1,
  },

});

export {EditProfileScreen};