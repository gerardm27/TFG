'use strict';

import {StyleSheet} from 'react-native';

/*
PALETA DE COLORES


*/

const styles = StyleSheet.create({
    mainContainer: {
        fontSize: 13,
        color: "black",
        fontFamily: 'Montserrat-Regular',
        textAlign: "left",
        textAlignVertical: "top",
        backgroundColor: "#ffffff",
        width: "100%",
    },
    minimalistBlockContainer: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#fff",
        padding: 20
        
    },
    coolBlockContainer: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderColor: "#eae4f6",
    },
    coolBlockTitleContainer: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        backgroundColor: "#f3edff",
        padding: 10,
        paddingLeft: "5%",
        minHeight: 60,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    coolBlockTitleContainerSmall: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        backgroundColor: "#f3edff",
        padding: 10,
        paddingLeft: "5%",
        minHeight: 0,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    coolBlockImageContainer: {
        marginRight: "10%",
        marginTop: -40,
        width: "30%",
        aspectRatio: 1,
        backgroundColor: "#ffffff",
        borderRadius: 2000,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    coolBlockImageContainerWide: {
        marginRight: "5%",
        marginTop: -30,
        width: "45%",
        aspectRatio: 2.5,
        backgroundColor: "#ffffff",
        borderRadius: 2000,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    coolBlockImage: {
        width: '70%',
        height: '70%',
    },
    blockContentContainer: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 30,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto',
        borderRadius: 20,
        // backgroundColor: 'red'
    },
    modalContentContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '90%',
        marginTop: 20,
    },
    modalContentContainerScrollable: {
        backgroundColor: '#fff',
        width: '90%',
        marginTop: 20,
        //backgroundColor: 'red'
    },
    bigTitle: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: "black",
    },
    subtitle: {
        fontSize: 17,
        fontFamily: 'Montserrat-Bold',
        color: "black",
    },
    normalText: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: "black",
    },
    smallText: {
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
        color: "black",
    },
    submitButtonText: {
        fontSize: 15,
        color: "white",
        fontFamily: 'Montserrat-Regular',
    },
    formContainer: {
        width: "90%",
        height: "100%",
        alignSelf: "center",
    },
    formInputContainer: {
        width: "100%",
        marginBottom: 10,
        marginTop: 10,
    },
    formInputTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: "#1d69a6", //e08b14 naranja 1d69a6 azul c5a9fc lila
    },
    formSelectableButton: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    dropDownModalButton: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        alignSelf: "center",
        marginBottom: 20,
        
    },
    formSelectableButtonText: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Montserrat-Regular',
    },
    formInputText: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Montserrat-Regular',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        textAlign: "left",
        padding: 10,
        textAlignVertical: "top",
    },
    modalSelectableButton: {
        width: "80%",
        height: 50,
        backgroundColor: "#eee",

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
        alignSelf: "center",
    },
    progressBarBackground: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        textAlign: 'left',
        textAlignVertical: 'center',
        backgroundColor: '#eee',
        
    },
    progressBarFill: {
        backgroundColor: "#5CB362",
        borderRadius: 13,
        textAlignVertical: 'center',
        height: "100%",

    },
    progressBarInternalText: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        height: "100%",
        textAlignVertical: 'center',
    },
    bottomInfoDesplegable: {
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default styles;