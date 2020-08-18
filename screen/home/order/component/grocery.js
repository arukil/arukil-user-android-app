import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'


const SCREEN_WIDTH = (Dimensions.get('window').width - 20) / 3;
const SCREEN_HEIGHT = (Dimensions.get('window').height / 5);


const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

class Market extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            list: dataProvider.cloneWithRows({}),
        };
        this.layoutProvider = new LayoutProvider();
    }

    _layoutHandler() {
        this.setState({ isLoading: false });
        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {
            switch (type) {
                case 'NORMAL':
                    dim.width = SCREEN_WIDTH,
                    dim.height = SCREEN_HEIGHT;
                    break;
                case 'OFFERCARD':
                    dim.width = Dimensions.get('window').width,
                    dim.height = 160
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break;
            };
        })
    }


    componentDidMount() {
        this.setState({
            list: dataProvider.cloneWithRows(this._generateDataList()),
        }, this._layoutHandler());
    }

    _generateDataList() {
        const Data = [];
        var i = 0;
        for (i = 0; i < 100; i += 1) {
            i === 0 ?
                Data.push({
                    type: 'OFFERCARD',
                    item: {
                        id: i
                    }
                }) :
                Data.push({
                    type: 'NORMAL',
                    item: {
                        id: i,
                        name: 'Dals & Pulses',
                    },
                });
        }
        return Data;
    }

    rowRenderer = (type, data) => {
        const { id } = data.item;
        return (
            id === 0 ?
                //  <Swiper showsButtons={true} showsButtons={false} activeDotColor={'#e91e63'} autoplay={false} showsPagination={true}
                //  autoplayTimeout={3} dotStyle={{ width: 5, height: 5 }} activeDotStyle={{ width: 5, height: 5 }}>

                <TouchableOpacity style={{ width: '100%', height: '100%' }}>
                    <Image source={require('../../../assets/image/1228.jpg')}
                        style={{ width: '100%', height: '95%' }}>
                    </Image>
                </TouchableOpacity>
                // </Swiper>
                :
                <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={()=>this.props.nav.navigate('ProductList')}>
                    <View style={styles.innerCard}>
                        <Image source={{ uri: Faker.image.food() }} style={styles.productListImage} />
                        <Text style={styles.productListName} numberOfLines={2} >{data.item.name} </Text>
                    </View>
                </TouchableOpacity >
        )
    }

    render() {
        return (
            !this.state.isLoading ?
                <RecyclerListView
                    style={styles.container}
                    rowRenderer={this.rowRenderer}
                    dataProvider={this.state.list}
                    layoutProvider={this.layoutProvider}
                    scrollViewProps={{
                        showsVerticalScrollIndicator: false,
                    }}
                />
                :
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#e91e63" />
                </View>

        );
    }
}


export default Market;



const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fcfcfc',

    },
    loading:{
        flex:1,
       justifyContent:'center'
    },
    card: {
        width: '100%',
        height: '95%',
        flexWrap: 'wrap',
    },
    innerCard: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    productListImage: {
        width: '80%',
        height: '70%'
    },
    productListName: {
        width: '80%',
        fontSize: 13,
    },


});















