import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../constants'

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 20,
    },
    rentBox: {
        marginTop: 10,
        backgroundColor: COLORS.white,
        width: '90%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
    },
    objectID: {
        fontSize: 40,
        marginTop: 20,
        marginLeft: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.blue,
    },
    time: {
        textAlign: 'right',
        fontSize: 25,
        marginTop: 10,
        marginRight: 20,
        color: COLORS.blue,
        fontFamily: FONT.PoppinsLight
    }
})

export default styles;