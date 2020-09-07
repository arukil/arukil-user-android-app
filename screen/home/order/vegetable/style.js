import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

    loader: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 10,
    },
    listView: {
        width: '100%',
        height: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 0.2, borderColor: '#ddd',
    },
    listContent: {
        width: '65%',
        height: '80%',
        justifyContent: 'space-between',
    },
    image: {
        width: '25%',
        height: '55%',
        borderRadius: 5,
        aspectRatio:1
    },
    listname: {
        width: '90%',
        fontSize: 14,
        fontWeight: '600',
        color: '#333'
    },
    overlayBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        padding: 4,
        borderWidth: 0.25,
        borderRadius: 5,
    },
    subdiv: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#5e5b54'
    },

    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modal: {
        flex: 0.45,
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between'
    },

});


export default styles;