import React, { Component } from 'react';
import {
    StyleSheet, View, Dimensions,
    Text, Image, TouchableOpacity, ActivityIndicator,
    ScrollView, Picker
} from 'react-native';
import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Counter from "react-native-counters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import { Button, Overlay } from 'react-native-elements';
import axios from 'axios'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height / 5;
const selectedColor = '#e91e63';
const unSelectedColor = '#999';

const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            list: dataProvider.cloneWithRows({}),
            productTypeIndex: 0,
            counterVisible: true,
            overlay: false,
            addBtnVisible: true,
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
        },this._layoutHandler());
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

        return Data;

    }


    rowRenderer = (type, data) => {
        const { img, name, price, gm } = data.item;

        const addItem = <TouchableOpacity style={styles.addItemButton} activeOpacity={0.7} >
            <MaterialCommunityIcons name='plus' color={'#e91e63'} />
            <Text style={{ fontSize: 10, color: '#e91e63' }}>ADD</Text>
        </TouchableOpacity>

        return (
            <View style={styles.listView}>
                <Image source={{ uri: img }} style={styles.image} />
                <View style={styles.listContent}>
                    <Text style={styles.listname} numberOfLines={1}>{name}</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.overlayBtn} onPress={() => this.setState({ overlay: true })} >
                        <Text style={{ color: '#999', fontSize: 12 }}>{gm}</Text>
                        <MaterialCommunityIcons name='chevron-down' color={'#999'} />
                    </TouchableOpacity>

                    <View style={styles.subdiv}>  
                        <Text style={styles.price}>
                            <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                            {price}
                        </Text>
                        <Counter />
                    </View>

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
                <Overlay isVisible={this.state.overlay} onBackdropPress={() => this.setState({ overlay: false })}>
                    <Text>Hello from Overlay!</Text>
                </Overlay>
            </View>


        );
    }
}




const mapStateToProps = state => ({
    count: state.counter
})

const mapDispatchToProps = (dispatch) => ({
    increment: () => { dispatch({ type: 'INCREMENT' }) },
    decrement: () => { dispatch({ type: 'DECREMENT' }) },
    reset: () => { dispatch({ type: 'RESET' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)


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
        justifyContent: 'space-around',
        borderBottomWidth: 0.2, borderColor: '#ddd'
    },
    listContent: {
        width: '60%',
        height: '80%',
        justifyContent: 'space-between',
    },
    image: {
        width: '25%',
        height: '70%',
    },
    listname: {
        width: '95%',
        fontSize: 14,
        fontWeight: '600',
        color: '#333'
    },
    overlayBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 4,
        borderWidth: 0.25,
        borderRadius: 5,
    },
    subdiv: {
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
        width: 60,
        height: 30,
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: '#ddd'
    }


});