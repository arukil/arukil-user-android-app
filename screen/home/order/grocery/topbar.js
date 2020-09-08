import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import RecyclerListView from './recyclerview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import axios from 'axios';

const selectedColor = '#fff';
const unSelectedColor = '#4f4f4f';


class Topbar extends React.Component {

    constructor(props) {
        super(props)
        props.navigation.setOptions({ title: props.route.params.data.name })
        this.state = {
            isLoading: true,
            list: [],
            productType: "",
            selectedProduct: {}
        };

    }

    async componentDidMount() {

        await axios.get(`https://arukil.herokuapp.com/api/products/${this.props.route.params.data.name}`)
            .then(response => {
                const res = response.data.data;
                return this.setState({ list: res });
            }).catch(error => {
                console.log(error)
            })

        await this.setState({ productType: this.props.route.params.data.list[0] },
            async () => {
                var obj = await this.state.list.find(({ name }) => name === this.state.productType)
                this.setState({ selectedProduct: obj, isLoading: false })
            })

    }

    topbar = () => {
        return this.props.route.params.data.list.map((name, index) => {
            return (
                <TouchableOpacity activeOpacity={1} style={[styles.productListTitle,
                { backgroundColor: name === this.state.productType ? '#e91e63' : '#f9f9f9', marginLeft: index === 0 ? 0 : 10 }]}
                    onPress={() => this.setState({ productType: name }, () => {
                        var obj = this.state.list.find(({ name }) => name === this.state.productType)
                        this.setState({ selectedProduct: obj })
                    })} key={index}>
                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 13, color: this.state.productType === name ? selectedColor : unSelectedColor }}>{name}</Text>
                </TouchableOpacity>
            )
        });

    }


    render() {
        return (
            !this.state.isLoading ?
                <View style={styles.container} >
                    <View style={[styles.header, { height: '15.5%' }]}>

                        <TouchableOpacity activeOpacity={1} style={styles.searchBar}
                            onPress={() => this.props.navigation.navigate('Search')}>
                            <MaterialCommunityIcons name='magnify' color={'#999'} size={18} />
                            <Text style={styles.searchBarText}>Search for an item...</Text>
                        </TouchableOpacity>

                        < View >
                            <ScrollView horizontal={true} >
                                {this.topbar()}
                            </ScrollView>
                        </View>

                    </View>
                    <View style={styles.body}>
                        {Object.keys(this.state.selectedProduct).length > 1 ? <RecyclerListView data={this.state.selectedProduct} /> : null}
                    </View>
                </View>
                :
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#e91e63" />
                </View>


        );
    }
}


const mapStateToProps = state => {
    return {
        item: state.personalcare.item,
        help: state.personalcare.help
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ADD_PERSONALCARE: (data) => {
            dispatch({ type: 'ADD_PERSONALCARE', data })
        },
        RESET_PERSONALCARE: () => {
            dispatch({ type: 'RESET_PERSONALCARE' })
        },
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
    },
    loader: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    searchBar: {
        borderWidth: 1,
        borderTopWidth: 2,
        padding: 11,
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
        width: 100,
        height: 35,
        borderWidth: 1,
        borderColor: '#f9f9f9',
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 1

    },
    productListTitleText: {
        fontSize: 10,

    },
    body: {
        flex: 1,
        paddingVertical: 10,
    }

});













