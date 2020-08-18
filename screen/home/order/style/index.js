import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        padding:8,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1.5,
        borderColor:'#f5f5f5'
    },
    location: {
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
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
    offer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    offerText: {
        fontWeight: '600',
    },
    body: {
        flex: 1,
        paddingHorizontal:10,
    },
    searchBar: {
        marginTop: 8,
        borderWidth: 0.35,
        padding: 10,
        borderColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    searchBarText: {
        color: '#999',
        fontSize: 16,
        paddingLeft: 10,
    },
    listView: {
        flex: 1,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modal: {
        flex:1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 0, 0, 0.1)',       
    },
})


export default styles;