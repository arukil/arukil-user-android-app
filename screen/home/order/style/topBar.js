import { StyleSheet ,Dimensions} from 'react-native';
const width = Dimensions.get('window').width/16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
    },
    body: {
        flex: 1,
        alignItems:'center',
        marginTop:5
    },
    topBar:{
        paddingTop:12,
        paddingRight:width,
        paddingBottom:10
    },
   
})


export default styles;