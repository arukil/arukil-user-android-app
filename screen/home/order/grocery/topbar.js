import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import RecyclerListView from './recyclerview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import axios from 'axios';

const selectedColor = '#e91e63';
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
                console.log(res)
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
                <TouchableOpacity activeOpacity={0.7} style={styles.productListTitle} onPress={() => this.setState({ productType: name }, () => {

                    var obj = this.state.list.find(({ name }) => name === this.state.productType)
                    this.setState({ selectedProduct: obj })

                })} key={index}>
                    <Text style={{ fontSize: 16, color: this.state.productType === name ? selectedColor : unSelectedColor }}>{name}</Text>
                </TouchableOpacity>
            )
        });

    }


    render() {
        return (
            !this.state.isLoading ?
                <View style={styles.container} >
                    <View style={[styles.header, { height: '14%' }]}>

                        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}
                            onPress={() => props.navigation.navigate('Search')}>
                            <MaterialCommunityIcons name='magnify' size={18} />
                            <Text style={styles.searchBarText}>Search for an item...</Text>
                        </TouchableOpacity>

                        < View >
                            <ScrollView horizontal={true} >
                                {this.topbar()}
                            </ScrollView>
                        </View>

                    </View>
                    {Object.keys(this.state.selectedProduct).length > 1 ? <RecyclerListView data={this.state.selectedProduct} /> : null}

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
        padding: 8
    },
    productListTitleText: {
        fontSize: 16,
    },

});













