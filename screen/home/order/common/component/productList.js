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
            addBtnVisible: true
        };
        this.layoutProvider = new LayoutProvider();
        props.navigation.setOptions({
            title: 'provisions',
        })
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


    componentDidMount() {
        this.setState({
            list: dataProvider.cloneWithRows(this._generateDataList()),
        }, this._layoutHandler());
    }

    _generateDataList() {
        const Data = [];
        var i = 0;
        for (i = 0; i < 100; i += 1) {
            Data.push({
                type: 'NORMAL',
                item: {
                    id: i,
                    name: 'whiteking-Tandoori-Atta',
                    img: faker.image.food(),
                    price: '30',
                    gm: '1kg',

                },
            });
        }
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
                        <Counter  />
                    </View>

                </View>
            </View>

        )
    }




    render() {

        const provisions = ['All', 'Rice & Grains', 'Dals & Pulses', 'Atta & Flours', 'Ghee & Oils',
            'Masalas & Spices', 'Sugar, Jaggery & Salt', 'Cooking Pastes'].map((data, index) => {
                return (
                    <TouchableOpacity activeOpacity={0.7} style={styles.productListTitle} onPress={() => this.setState({ productTypeIndex: index })} key={index}>
                        <Text style={[styles.productListTitleText, { color: this.state.productTypeIndex === index ? selectedColor : unSelectedColor }]}>{data}</Text>
                    </TouchableOpacity>
                )
            });



        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.searchBar} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Search')}>
                        <MaterialCommunityIcons name='magnify' size={18} />
                        <Text style={styles.searchBarText}>Search for an item...</Text>
                    </TouchableOpacity>
                    <View>
                        <ScrollView horizontal={true}>
                            {provisions}
                        </ScrollView>
                    </View>
                </View>
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
        paddingHorizontal: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        height: '14%',
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
        height: '80%',
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

















// import React, { Component } from 'react';
// import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import faker from 'faker';
// import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
// import Counter from "react-native-counters";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Rating } from 'react-native-elements'
// const SCREEN_WIDTH = Dimensions.get('window').width;
// import { connect } from 'react-redux'


// const dataProvider = new DataProvider((r1, r2) => {
//     return r1 !== r2;
// });

//  class Product extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             list: dataProvider.cloneWithRows({}),
//         };
//         this.layoutProvider = new LayoutProvider();
//     }


//     _layoutHandler() {
//         this.layoutProvider = new LayoutProvider((i) => {
//             return this.state.list.getDataForIndex(i).type;
//         }, (type, dim) => {

//             switch (type) {
//                 case 'NORMAL':
//                     dim.width = SCREEN_WIDTH;
//                     dim.height = 120;
//                     break;
//                 default:
//                     dim.width = 0;
//                     dim.height = 0;
//                     break;
//             };
//         })
//     }


//     componentDidMount() {
//         this.setState({
//             list: dataProvider.cloneWithRows(this._generateDataList()),
//         }, this._layoutHandler());
//     }

//     _generateDataList() {
//         const Data = [];
//         var i = 0;
//         for (i = 0; i < 100; i += 1) {
//             Data.push({
//                 type: 'NORMAL',
//                 item: {
//                     id: i,
//                     name: 'whiteking-Tandoori-Atta',
//                     img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Atta+%26+Flours/Aashirvaad-maida.jpg',
//                     price: '1kg',
//                     gm: '1kg',
//                     stock: 'In Stock'
//                 },
//             });
//         }
//         this.setState({ isLoading: false })
//         return Data;
//     }



//     rowRenderer = (type, data) => {

//         const { img, name, price, gm, stock } = data.item;
//         return (
//             <View style={styles.listView}>
//                 <View style={styles.div1}>
//                     <Text style={{ color: 'green' }}>{stock}</Text>
//                     <Image source={{ uri: img }} style={styles.image} />
//                 </View>

//                 <View style={styles.div2}>

//                     <Text style={styles.name} numberOfLines={1}>{name}</Text>

//                     <TouchableOpacity activeOpacity={0.7} style={styles.selectButton}>
//                         <Text style={{ color: '#999', fontSize: 12 }}>{gm}</Text>
//                         <MaterialCommunityIcons name='chevron-down' color={'#999'} />
//                     </TouchableOpacity>

//                     <View style={styles.subdiv}>
//                         <Text style={styles.price}>
//                             <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
//                             {price}
//                         </Text>
//                         <Counter />
//                     </View>

//                 </View>
//             </View>
//         )
//     }

//     render() {
//         return (
//             !this.state.isLoading ?
//                 <View style={styles.container}>
//                     <View style={styles.shop}>
//                         <Text numberOfLines={1} style={styles.shopname}>AkC Supermarket</Text>
//                         <Rating
//                             readonly
//                             startingValue={4.5}
//                             imageSize={12}
//                         />
//                     </View>
//                     <RecyclerListView
//                         style={{ flex: 1 }}
//                         rowRenderer={this.rowRenderer}
//                         dataProvider={this.state.list}
//                         layoutProvider={this.layoutProvider}
//                         scrollViewProps={{
//                             showsVerticalScrollIndicator: false,
//                         }}
//                     />
//                 </View>
//                 :
//                 <View style={styles.container}>
//                     <ActivityIndicator size="large" color="#e91e63" />
//                 </View>

//         );
//     }
// }



// // const mapStateToProps = (state) => {
// //     return {
// //         data: state.storage.location || {}
// //     }
// // }


// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         CURRENT_LOCATION: (data) => {
// //             dispatch({ type: 'CURRENT_LOCATION', data })
// //         }
// //     };
// // }

//  export default connect()(Product);




// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: '#FFF',
//         minHeight: 1,
//         minWidth: 1,
//         justifyContent: 'center'
//     },
//     shop: {
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//     },
//     shopname: {
//         color: '#999',
//         width: '80%',
//         fontSize: 15,
//     },
//     listView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         paddingVertical: 15
//     },
//     div1: {
//         width: '40%',
//         height: '100%',
//         justifyContent: 'space-between',
//     },
//     div2: {
//         width: '60%',
//         height: '100%',
//         justifyContent: 'space-between'
//     },
//     image: {
//         width: 80,
//         height: 80
//     },
//     name: {
//         width: '90%',
//         fontSize: 14,
//         color: '#5e5b54'
//     },
//     selectButton: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '90%',
//         padding: 5,
//         borderWidth: 0.25,
//         borderRadius: 5,
//     },
//     subdiv: {
//         width: '90%',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },
//     price: {
//         fontSize: 15,
//         fontWeight: '700',
//         color: '#5e5b54'
//     }


// });



// // { name: 'Aashirvaad-maida', img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Atta+%26+Flours/Aashirvaad-maida.jpg', price: '72', gm: '1kg' },
// // { name: 'annadata-Fresh-Atta', img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Atta+%26+Flours/annadata-Fresh-Atta.jpg', price: '66', gm: '1kg' },
// // { name: 'saptrishi-maida', img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Atta+%26+Flours/saptrishi-maida.jpg', price: '50', gm: '1kg' },
// // { name: 'Gundu-Mochai', img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Dals+%26+Pulses/Gundu-Mochai.jpg', price: '76', gm: '500g' },
// // { name: 'peanut', img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Dals+%26+Pulses/peanut.jpg', price: '55', gm: '500g' },
// // { name: 'whiteking-Tandoori-Atta', img: 'https://arukil.s3.ap-south-1.amazonaws.com/Grocery/Atta+%26+Flours/whiteking-Tandoori-Atta.jpg', price: '1kg', gm: '1kg' },
