import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../../constants'

const styles = StyleSheet.create({
    tileBackground: {
        backgroundColor: COLORS.blue,
        height: 0,
        width: '48%',
        aspectRatio: 1,
        borderRadius: 2,
        marginBottom: 5,
        elevation: 5,
    },
    tileText: {
        color: COLORS.white,
        fontFamily: FONT.PoppinsBold,
        fontSize: 20,
        textAlign: 'center'
    }
})

export default styles;