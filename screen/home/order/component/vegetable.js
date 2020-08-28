import React, { Component } from 'react';
import {StyleSheet, View, Dimensions,Text, Image, ActivityIndicator,} from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import CartBtn from '../helper/market/cartbtn'
import Cart from '../helper/market/cart';
import Quantitycard from '../helper/market/quantitycard';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height / 6;


const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

class Vegetable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            list: dataProvider.cloneWithRows({}),
            productTypeIndex: 0,
            ismodelVisible: false,
            selectedItem: []
        };
        this.layoutProvider = new LayoutProvider();

    }

 
    _layoutHandler() {
        this.setState({ isLoading: false })
        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {

            switch (type) {
                case 'NORMAL':
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


    async componentDidMount() {
        let data = await this._generateDataList();
        this.setState({
            list: dataProvider.cloneWithRows(data),
        }, this._layoutHandler());
    }

    async _generateDataList() {
        const Data = [];
       
        await axios.get('https://arukil.herokuapp.com/api/products/vegetable')
            .then(function (response) {
                response.data.data.map((item) =>
                    Data.push({
                        type: 'NORMAL',
                        item: {
                            id: item._id,
                            name: item.name,
                            img: item.image,
                            price: 50,
                            gm: '1kg',

                        },
                    })
                );
            }).catch(function (error) {
                console.log(error)
            })
      
            console.log(Data[0])
        return Data;

    }

    rowRenderer = (type, data) => {
        const { img, name, price, gm, id } = data.item;
        return (
            <View style={styles.listView}>
                <Image source={{ uri: img }} style={styles.image} />
                <View style={styles.listContent}>
                    <Text style={styles.listname} numberOfLines={1}>{name}</Text>
                    <View style={styles.subdiv}>
                        <Text style={{ color: '#999' }}>1kg</Text>
                        <CartBtn data={data.item} selectedItem={this.state.selectedItem} />
                    </View>
                    <Text style={styles.price}>
                        <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                        {price}
                    </Text>
                </View>
            </View>

        )
    }


    render() {

        return (
            <View style={styles.container}>

                {!this.state.isLoading ?
                    <RecyclerListView
                        style={styles.body}
                        rowRenderer={this.rowRenderer}
                        dataProvider={this.state.list}
                        layoutProvider={this.layoutProvider}
                        scrollViewProps={{
                            showsVerticalScrollIndicator: false,
                        }}
                    />
                    :
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#e91e63" />
                    </View>
                }

                <Cart />
                <Quantitycard />

            </View>
        );
    }
}





export default Vegetable;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    body: {
        flex: 1,

    },
    listView: {
        width: '100%',
        height: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.2, borderColor: '#ddd',
    },
    listContent: {
        width: '70%',
        height: '80%',
        justifyContent: 'space-evenly',
    },
    image: {
        width: '22%',
        height: '60%',
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
    addItemButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: 80,
        height: 30,
        borderWidth: 0.5,
        borderRadius: 1,
        borderColor: '#ddd',
        backgroundColor: '#ffffff',
        elevation: 1
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