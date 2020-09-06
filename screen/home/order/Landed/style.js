import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        width: '100%',
        height: 55,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1.5,
        borderColor: '#f5f5f5',
    },
    location: {
        marginLeft: 5,
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationTextContainer: {
        flexDirection: 'column',
    },
    primaryLocationText: {
        fontWeight: '700'
    },
    SecondaryLocationText: {
        color: '#999',
        fontSize: 12,
    },
    search: {
        padding: 10,
        paddingRight: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        elevation: 1
    },

    body: {
        flex: 1,
    },

})


export default styles;