import React, { Component } from 'react';
import {
    StyleSheet, View, Dimensions,
    Text, Image, TouchableOpacity, ActivityIndicator,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import CartBtn from '../helper/cartbtn';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height / 6;


const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

class Recyclerview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            list: dataProvider.cloneWithRows({}),
            propsChange: ''
        };
        this.layoutProvider = new LayoutProvider();
    }

    _layoutHandler() {
        this.setState({ isLoading: false })
        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {

            switch (type) {
                case "GROCERY":
                    dim.width = SCREEN_WIDTH;
                    dim.height = SCREEN_HEIGHT;
                    break;
                case "VEGETABLE":
                    dim.width = SCREEN_WIDTH;
                    dim.height = SCREEN_HEIGHT;
                    break;
                case "FRUIT":
                    dim.width = SCREEN_WIDTH;
                    dim.height = SCREEN_HEIGHT;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break;
            };
        });
    }




    rowRenderer = (type, data) => {
        const { name, image, flavour ,price ,weight} = data;

        return (
            <View style={styles.listView}>
                <Image source={{ uri: image }} resizeMode='center' style={styles.image} />
                <View style={styles.listContent}>
                    {!flavour ?
                        <Text style={styles.listname} numberOfLines={1}>{name}</Text>
                        :
                        <Text style={{ color: '#4f4f4f' }} numberOfLines={1}>{flavour}</Text>
                    }
                    <View style={styles.subdiv}>
                        <Text style={{ color: '#999' }}>{weight}</Text>
                        <CartBtn 
                        data={{
                           brand:name,
                           name: flavour,
                           image:image,
                           type:type       
                        }} />
                    </View>
                    <Text style={styles.price}>
                        <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                        {price}
                    </Text>
                </View>
            </View>


        )

    }



    async componentDidMount() {

        this.setState({
            list: dataProvider.cloneWithRows(this.props.bucket)
        }, this._layoutHandler());

    }

    render() {

        return (

            <RecyclerListView
                style={styles.body}
                rowRenderer={this.rowRenderer}
                dataProvider={this.state.list}
                layoutProvider={this.layoutProvider}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            />


        );
    }
}




const mapStateToProps = state => {
    return {
        bucket: state.bucket.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        BUCKET_RESET: () => {
            dispatch({ type: 'BUCKET_RESET' })
        }

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Recyclerview)


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottomWidth: 0.4,
        borderColor: '#ddd'
    },
    searchBar: {
        borderWidth: 0.3,
        padding: 8,
        borderColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    searchBarText: {
        color: '#999',
        fontSize: 14,
        paddingLeft: 10,
    },
    productListTitle: {
        padding: 8,
    },
    productListTitleText: {
        fontSize: 14,
        fontWeight: '700',
    },
    body: {
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
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
        justifyContent: 'space-around',
    },
    image: {
        width: '20%',
        height: '45%',
        borderRadius: 5,
        aspectRatio: 1
    },
    listname: {
        width: '90%',
        fontSize: 14,
        fontWeight: '600',
        color: '#999'
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



});













