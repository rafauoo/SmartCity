import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../../constants'

const styles = StyleSheet.create({
    carImg: {
        resizeMode: 'contain',
        height: 150,
        width: 150,
        marginLeft: 25,
    },
    carNumber: {
        alignSelf: 'center',
        marginTop: -10,
        fontSize: 30,
        letterSpacing: 5,
        marginLeft: 5,
        fontFamily: FONT.PoppinsLight,
        color: COLORS.blue
    },
    carImgContainer: {
        height: 200,
        width: 200,
        marginTop: 40,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 60,
        borderColor: COLORS.blue,
        borderWidth: 2,
    },
    rentInfoContainer: {
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: COLORS.white,
        height: 180,
        borderRadius: 30,
        width: '90%',
        borderColor: COLORS.blue,
        borderWidth: 2,
    },
    buttonList: {
        marginTop: 40,
        height: 40,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    buttonReturn: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.blue,
        width: 160,
        borderRadius: 30,
    },
    buttonReturnText: {
        alignSelf: 'center',
        fontFamily: FONT.PoppinsLight,
        color: COLORS.white,
        fontSize: 20,
    },
    buttonHelp: {
        height: 30,
        marginTop: 5,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        width: 100,
        borderRadius: 30,
        borderColor: COLORS.blue,
        borderWidth: 2,
        marginLeft: 30,
    },
    buttonHelpText: {
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: FONT.PoppinsLight,
        color: COLORS.blue,
    },
    infoTimeContainer: {
        height: 60,
        flexDirection: 'row',
        borderBottomColor: COLORS.blue,
        borderBottomWidth: 2,
        justifyContent: 'space-between'
    },
    infoTimeText: {
        alignSelf: 'center',
        marginLeft: 20,
        fontFamily: FONT.PoppinsBold,
        fontSize: 20,
        color: COLORS.blue,
    },
    infoTime: {
        textAlign: 'auto',
        letterSpacing: 1,
        alignSelf: 'center',
        marginRight: 40,
        fontFamily: FONT.PoppinsBold,
        fontSize: 30,
        color: COLORS.blue,
    },
    infoHourContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoDateText: {
        alignSelf: 'center',
        marginLeft: 20,
        fontFamily: FONT.PoppinsLight,
        fontSize: 20,
        color: COLORS.blue,
    },
    infoDate: {
        textAlign: 'center',
        alignSelf: 'center',
        marginRight: 40,
        fontFamily: FONT.PoppinsLight,
        fontSize: 25,
        color: COLORS.blue,
    },
})

export default styles;