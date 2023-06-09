import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../constants'

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        marginLeft: 20,
        height: 50,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: COLORS.blue,
        borderWidth: 1,
    },
    mt20: {
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: COLORS.blue,
        marginTop: 50,
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.white,
    },
    registerButton: {
        backgroundColor: COLORS.white,
        marginTop: 40,
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center'
    },
    registerText: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.blue,
    },
    padlock: {
        width: 25,
        height: 25,
        marginLeft: 10,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginRight: 20,
    },
    input: {
        fontSize: 20,
        minWidth: 250,
        fontFamily: FONT.PoppinsLight,
        color: COLORS.blue,
    },
    pickDateButton: {
        backgroundColor: COLORS.blue,
        width: 100,
        marginLeft: 20,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center'
    },
    pickDateText: {
        fontSize: 15,
        fontFamily: FONT.PoppinsLight,
        color: COLORS.white,
    }
})

export default styles;