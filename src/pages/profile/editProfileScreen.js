import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

function EditProfileScreen({navigation, route}) {
  const { t, i18n } = useTranslation();
  const {fullName, bio, email, profileImage} = route.params;
  const defaultImage = require('../../../assets/images/defaultProfile.png');
  const ToastMessage = () => {
    ToastAndroid.show(t('editProfile.editSuccessful'), ToastAndroid.SHORT);
  };
  return (
    <View style={editProfileStyles.editProfileContainer}>
      <View style={editProfileStyles.topBar}>
        <TouchableOpacity 
          onPress = {() => navigation.navigate('Profile')}
        >
          <Ionic name="close-outline" size={35} color="black" />
        </TouchableOpacity>
        <Text style={editProfileStyles.toBarTitle}>{t('editProfile.title')}</Text>
        <TouchableOpacity
          onPress = {() => {
            ToastMessage();
            navigation.navigate('Profile')}}
        >
          <Ionic name="checkmark-outline" size={35} color="#5bb05a" />
        </TouchableOpacity>
      </View>
      <View style={editProfileStyles.profileImageTopContainer}>
        <TouchableOpacity 
          onPress 
          style={editProfileStyles.profileImageContainer}
        >
          <Image source={{uri: profileImage} ?? defaultImage} style={editProfileStyles.profileImage}/>
          <Image source={require('../../../assets/images/edit.png')} style={editProfileStyles.editProfileImage} />
        </TouchableOpacity>
        <View style={editProfileStyles.editFieldsContainer}>
          <View style={editProfileStyles.editFullNameContainer}>
            <Text style={editProfileStyles.fullNameHeader}>{t("editProfile.fullNameHeader")}</Text>
            <Text style={editProfileStyles.fullName}>{fullName}</Text>
          </View>
          <View style={editProfileStyles.editBioContainer}>
            <Text style={editProfileStyles.bioHeader}>{t("editProfile.bioHeader")}</Text>
            <Text style={editProfileStyles.bio}>{bio}</Text>
          </View>
          <View style={editProfileStyles.editEmailContainer}>
            <Text style={editProfileStyles.emailHeader}>{t("editProfile.emailHeader")}</Text>
            <Text style={editProfileStyles.email}>{email}</Text>
          </View>
        </View>
      </View>
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
  profileImageTopContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  editProfileImage: {
    width: 28,
    height: 28,
    backgroundColor: "white",
    position: "absolute",
    right: 0,
  },
  editFieldsContainer: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
  editFullNameContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  fullNameHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fullName: {
    fontSize: 16,
  },
  editBioContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  bioHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
  },
  editEmailContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  emailHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },

  


});

export {EditProfileScreen};