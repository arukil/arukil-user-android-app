import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Cart from '../../helper/cart';
import CartBtn from '../../helper/cartbtn';


const selectedColor = '#fff';
const unSelectedColor = '#757575';


class Topbar extends React.Component {

    constructor(props) {
        super(props)
        props.navigation.setOptions({ title: props.route.params.data.name })
        this.state = {
            isLoading: true,
            list: [],
            selectedProduct: {},
            subLoading: true,
        };
    }

    async componentDidMount() {
        await axios.get(`https://arukil.herokuapp.com/api/products/${this.props.route.params.data.name}`)
            .then(response => {
                const res = response.data.data;
                return this.setState({
                    list: res,
                    selectedProduct: res[0],
                    isLoading: false
                });
            }).catch(error => {
                console.log(error)
            })

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


    topbar = () => {
        return this.state.list.map(({ name }, index) => {
            return (
                <TouchableOpacity activeOpacity={1} style={[styles.productListTitle,

                { backgroundColor: name === this.state.selectedProduct.name ? '#e4545f' : '#f9f9f9', marginLeft: index === 0 ? 0 : 10 }]}

                    onPress={() => this.state.selectedProduct.name !== name ? this.setState({
                        selectedProduct: [],
                    }, () => this.setState({ selectedProduct: this.state.list[index] })) : null}

                    key={index}>

                    <Text numberOfLines={2} style={{
                        textAlign: 'center', fontSize: 12.5,
                        color: this.state.selectedProduct.name === name ? selectedColor : unSelectedColor
                    }}>{name}</Text>

                </TouchableOpacity>
            )
        });

    }


    render() {
        return (
            !this.state.isLoading ?
                <View style={styles.container} >
                    <View style={[styles.header, { height: '8%' }]}>

                        {/* <TouchableOpacity activeOpacity={1} style={styles.searchBar}
                            onPress={() => this.props.navigation.navigate('Search')}>
                            <MaterialCommunityIcons name='magnify' color={'#999'} size={18} />
                            <Text style={styles.searchBarText}>Search for an item...</Text>
                        </TouchableOpacity> */}

                        < View >
                            <ScrollView horizontal={true} >
                                {this.topbar()}
                            </ScrollView>
                        </View>

                    </View>
                    <View style={styles.body}>
                        {Object.keys(this.state.selectedProduct).length > 1 ?
                            <FlatList
                                data={this.state.selectedProduct.list}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={5}
                                showsVerticalScrollIndicator={false}
                            />
                            : null
                        }

                    </View>
                    <Cart navigation={this.props.navigation} />
                </View>
                :
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#e91e63" />
                </View>


        );
    }
}



export default Topbar


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loader: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingHorizontal: 10,

    },
    searchBar: {

        borderWidth: 0.2,
        padding: 10,
        borderColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 1,
    },
    searchBarText: {
        color: '#999',
        fontSize: 14,
        paddingLeft: 10,
    },
    productListTitle: {
        width: 120,
        height: 35,
        borderWidth: 0.7,
        borderColor: '#ddd',
        backgroundColor: 'silver',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },
    productListTitleText: {
        fontSize: 10,

    },
    body: {
        flex: 1,
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









// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
// import RecyclerListView from './recyclerview';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { connect } from 'react-redux'
// import axios from 'axios';
// import Cart from '../helper/cart';


// const selectedColor = '#fff';
// const unSelectedColor = '#999';


// class Topbar extends React.Component {

//     constructor(props) {
//         super(props)
//         props.navigation.setOptions({ title: props.route.params.data.name })
//         this.state = {
//             isLoading: true,
//             list: [],
//             productType: "",
//             selectedProduct: {}
//         };
//     }

//     async componentDidMount() {

//         await axios.get(`https://arukil.herokuapp.com/api/products/${this.props.route.params.data.name}`)
//             .then(response => {
//                 const res = response.data.data;
//                 return this.setState({ list: res });
//             }).catch(error => {
//                 console.log(error)
//             })

//           this.state.list.map(({name})=>console.log(name))
//         await this.setState({ productType: this.props.route.params.data.list[0] },
//             async () => {
//                 var obj = await this.state.list.find(({ name }) => name === this.state.productType)
//                 this.setState({ selectedProduct: obj, isLoading: false })
//             })
//     }



//     topbar = () => {
//         return this.props.route.params.data.list.map((name, index) => {
//             return (

//                 <TouchableOpacity activeOpacity={1} style={[styles.productListTitle,
//                 { backgroundColor: name === this.state.productType ? '#ee5488' : '#f9f9f9', marginLeft: index === 0 ? 0 : 10 }]}
//                     onPress={() => this.setState({ productType: name }, () => {
//                         var obj = this.state.list.find(({ name }) => name === this.state.productType)
//                         this.setState({ selectedProduct: obj })
//                     })} key={index}>
//                     <Text numberOfLines={2} style={{
//                         textAlign: 'center', fontSize: 12, fontWeight: 'bold',
//                         color: this.state.productType === name ? selectedColor : unSelectedColor
//                     }}>{name}</Text>
//                 </TouchableOpacity>

//             )
//         });

//     }


//     render() {
//         return (
//             !this.state.isLoading ?
//                 <View style={styles.container} >
//                     <View style={[styles.header, { flex: 0.18 }]}>

//                         <TouchableOpacity activeOpacity={1} style={styles.searchBar}
//                             onPress={() => this.props.navigation.navigate('Search')}>
//                             <MaterialCommunityIcons name='magnify' color={'#999'} size={18} />
//                             <Text style={styles.searchBarText}>Search for an item...</Text>
//                         </TouchableOpacity>

//                         < View >
//                             <ScrollView horizontal={true} >
//                                 {this.topbar()}
//                             </ScrollView>
//                         </View>

//                     </View>
//                     <View style={styles.body}>
//                         {Object.keys(this.state.selectedProduct).length > 1 ? <RecyclerListView data={this.state.selectedProduct} /> : null}
//                     </View>
//                     <Cart navigation={this.props.navigation} />
//                 </View>
//                 :
//                 <View style={styles.loader}>
//                     <ActivityIndicator size="large" color="#e91e63" />
//                 </View>


//         );
//     }
// }


// const mapStateToProps = state => {
//     return {
//         item: state.personalcare.item,
//         help: state.personalcare.help
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         ADD_PERSONALCARE: (data) => {
//             dispatch({ type: 'ADD_PERSONALCARE', data })
//         },
//         RESET_PERSONALCARE: () => {
//             dispatch({ type: 'RESET_PERSONALCARE' })
//         },
//     };

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Topbar)


// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//     },
//     loader: {
//         flex: 1,
//         backgroundColor: '#fcfcfc',
//         justifyContent: 'center'
//     },
//     header: {
//         width: '100%',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         paddingHorizontal: 10,

//     },
//     searchBar: {

//         borderWidth: 1,
//         borderTopWidth: 2,
//         padding: 11,
//         borderColor: '#f5f5f5',
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderRadius: 5,
//         elevation: 1,
//     },
//     searchBarText: {
//         color: '#999',
//         fontSize: 14,
//         paddingLeft: 10,
//     },
//     productListTitle: {
//         width: 120,
//         height: 35,
//         borderWidth: 0.2,
//         borderColor: 'silver',
//         backgroundColor: '#f9f9f9',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5,
//         elevation: 1

//     },
//     productListTitleText: {
//         fontSize: 10,

//     },
//     body: {
//         flex: 1,
//     }

// });



















