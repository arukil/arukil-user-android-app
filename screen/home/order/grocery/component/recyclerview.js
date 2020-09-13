import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Image, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Cart from '../../helper/cart';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import CartBtn from '../../helper/cartbtn';


class Topbar extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            list: [],
             propsChange: ''

        };
    }

    async componentDidMount() {
        this.setState({
            list: this.props.data.list,
            propsChange: this.props.data.name,
            isLoading:false
        });
    }


    static getDerivedStateFromProps(props, state) {

        if (props.data.name !== state.propsChange && state.propsChange !== '') {
            return {
                list: props.data.list,
                propsChange: props.data.name
            }
        }

        return state.list
    }



    renderItem = ({ item }) => {

        const { name, available, image, flavour, type } = item;

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
                        <Text style={{ color: '#999' }}>{available[0].weight}</Text>
                        <CartBtn
                            data={{
                                name: name,
                                flavour: flavour ? flavour : '',
                                image: image,
                                available: available,
                                type: type
                            }} />
                    </View>
                    <Text style={styles.price}>
                        <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                        {available[0].price}
                    </Text>
                </View>
            </View>

        )
    };

    render() {
        return (
            <View style={styles.container}>
                {!this.state.isLoading ?
                    <FlatList
                        data={this.state.list}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={4}
                        showsVerticalScrollIndicator={false}
                    />
                    :
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#e91e63" />
                    </View>
                }
                <Cart navigation={this.props.navigation} />

            </View>
        );
    }
}
export default Topbar;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loader: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center'
    },
    listView: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 0.2,
        borderColor: '#ddd',
    },
    listContent: {
        width: '65%',
        height: '80%',
        justifyContent: 'space-around',
    },
    image: {
        width: '25%',
        height: '55%',
        borderRadius: 5,
        aspectRatio: 1
    },
    listname: {
        width: '90%',
        fontSize: 14,
        fontWeight: '600',
        color: '#4f4f4f'
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























// import React, { Component } from 'react';
// import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
// import { connect } from 'react-redux'
// import axios from 'axios';
// import CartBtn from '../../helper/cartbtn';
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height / 5.5;


// const dataProvider = new DataProvider((r1, r2) => {
//     return r1 !== r2;
// });

// class Recyclerview extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             isLoading: true,
//             list: dataProvider.cloneWithRows({}),
//             propsChange: ''
//         };
//         this.layoutProvider = new LayoutProvider();
//     }

//     _layoutHandler() {
//         this.setState({ isLoading: false })
//         this.layoutProvider = new LayoutProvider((i) => {
//             return this.state.list.getDataForIndex(i).type;
//         }, (type, dim) => {

//             switch (type) {
//                 case "GROCERY":
//                     dim.width = SCREEN_WIDTH;
//                     dim.height = SCREEN_HEIGHT;
//                     break;
//                 default:
//                     dim.width = 0;
//                     dim.height = 0;
//                     break;
//             };
//         });
//     }




//     rowRenderer = (type, data) => {
//         const { name, available, image, flavour } = data;

//         return (
//             <View style={styles.listView}>
//                 <Image source={{ uri: image }} resizeMode='center' style={styles.image} />
//                 <View style={styles.listContent}>
//                     {!flavour ?
//                         <Text style={styles.listname} numberOfLines={1}>{name}</Text>
//                         :
//                         <Text style={{ color: '#4f4f4f' }} numberOfLines={1}>{flavour}</Text>
//                     }
//                     <View style={styles.subdiv}>
//                         <Text style={{ color: '#999' }}>{available[0].weight}</Text>
//                         <CartBtn
//                             data={{
//                                 name: name,
//                                 flavour: flavour ? flavour : '',
//                                 image: image,
//                                 available: available,
//                                 type: type
//                             }} />
//                     </View>
//                     <Text style={styles.price}>
//                         <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
//                         {available[0].price}
//                     </Text>
//                 </View>
//             </View>


//         )
//     }


//     static getDerivedStateFromProps(props, state) {

//         if (props.data.name !== state.propsChange && state.propsChange !== '') {
//             return {
//                 list: dataProvider.cloneWithRows(props.data.list),
//                 propsChange: props.data.name
//             }
//         }

//         return state.list
//     }


//     async componentDidMount() {

//         this.setState({
//             list: dataProvider.cloneWithRows(this.props.data.list),
//             propsChange: this.props.data.name
//         }, this._layoutHandler());

//     }

//     render() {

//         return (

//             <RecyclerListView
//                 style={styles.body}
//                 rowRenderer={this.rowRenderer}
//                 dataProvider={this.state.list}
//                 layoutProvider={this.layoutProvider}
//                 scrollViewProps={{
//                     showsVerticalScrollIndicator: false,
//                 }}
//             />


//         );
//     }
// }



// export default Recyclerview;


// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         paddingHorizontal: 10,
//     },
//     loader: {
//         flex: 1,
//         justifyContent: 'center'
//     },
//     header: {
//         width: '100%',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         borderBottomWidth: 0.4,
//         borderColor: '#ddd'
//     },
//     searchBar: {
//         borderWidth: 0.3,
//         padding: 8,
//         borderColor: '#999',
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderRadius: 5,
//     },
//     searchBarText: {
//         color: '#999',
//         fontSize: 14,
//         paddingLeft: 10,
//     },
//     productListTitle: {
//         padding: 8,
//     },
//     productListTitleText: {
//         fontSize: 14,
//         fontWeight: '700',
//     },
//     body: {
//         flex: 1,
//     },
//     listView: {
//         width: '100%',
//         height: '95%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         borderBottomWidth: 0.2, borderColor: '#ddd',
//     },
//     listContent: {
//         width: '65%',
//         height: '80%',
//         justifyContent: 'space-around',
//     },
//     image: {
//         width: '25%',
//         height: '55%',
//         borderRadius: 5,
//         aspectRatio: 1
//     },
//     listname: {
//         width: '90%',
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#4f4f4f'
//     },
//     overlayBtn: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '70%',
//         padding: 4,
//         borderWidth: 0.25,
//         borderRadius: 5,
//     },
//     subdiv: {
//         width: '95%',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },
//     price: {
//         fontSize: 15,
//         fontWeight: '700',
//         color: '#5e5b54'
//     },



// });













