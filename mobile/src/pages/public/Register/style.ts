import { cloneElement } from "react";
import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import globalStyles from "../../../styles/global";
import fonts from "../../../styles/typography";
import { screenHeight, screenWidth } from "../../../styles/utils";

const styles = StyleSheet.create({
    containerRegister : {
        backgroundColor : colors.DARK_GRAY,
        width: '100%',
        height: '100%',
        display: 'flex',
       
    },

    containerRegisterForm:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
    },

    logo : {
        fontSize: 32,
        color: colors.WHITE,
        marginBottom: 40
    },
    signUp: {
        ...globalStyles.text,
        fontFamily: fonts.POPPINS_BOLD,
        color: colors.PRIMARY,
        fontSize: 32,
        marginBottom: 40
    },
    stepDescription: {
        fontFamily: fonts.POPPINS_MEDIUM,
        color: colors.WHITE,
        textAlign: 'center',
        justifyContent: 'center',
        width: screenWidth * .5,
        marginBottom : 32
    },
    input: {
        width: 256,
        marginBottom:40,
    },

    form: {
        height: screenHeight * .3,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    }

})

export default styles