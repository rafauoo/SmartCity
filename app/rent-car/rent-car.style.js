import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../constants'

const styles = StyleSheet.create({
    numberContainer: {
        alignItems: 'center'
    },
    numberText: {
        marginTop: 40,
        fontSize: 30,
        fontFamily: FONT.PoppinsLight,
        color: COLORS.blue
    },
    numberInput: {
        marginTop: 30,
        alignSelf: 'center',
        fontSize: 50,
        letterSpacing: 20,
        marginLeft: 20,
        color: COLORS.blue
    },
    acceptButton: {
        backgroundColor: COLORS.blue,
        marginTop: 30,
        width: 150,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    qrButton: {
        backgroundColor: COLORS.white,
        marginTop: 30,
        width: 150,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center'
    },
    acceptText: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.white,
    },
    qrText: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.blue,
    },
    rentalsButton: {
        backgroundColor: COLORS.white,
        marginTop: 300,
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
    rentalsText: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.blue,
    },
    rentalsActiveText: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.white,
    },
    rentalsActiveButton: {
        backgroundColor: COLORS.green,
        marginTop: 300,
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center'
    }
})

export default styles;