import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import RecyclerListView from './recyclerview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import axios from 'axios';


const selectedColor = '#e91e63';
const unSelectedColor = '#4f4f4f';

const List = (props) => {

    const { data } = props.route.params;

    const [productType, setProductType] = React.useState('');
    const [selectedProduct, setSelectedProduct] = React.useState({});

    const _generateDataList = async () => {
        await axios.get('https://arukil.herokuapp.com/api/products/provision')
            .then(response => {
                return props.ADD_PROVISION(response.data.data);
            }).catch(error => {
                console.log(error)
            })
    }


    React.useEffect(() => {
        props.navigation.setOptions({ title: data.name })
        _generateDataList();
        setProductType(data.list[0]);
    }, [])


    React.useEffect(() => {
          
        if (productType !== '' ) {
            var obj = props.item.find(({ name }) => name === productType)
            setSelectedProduct(obj);
        }
    }, [productType])


    const topbar = () => {
        return data.list.map((data, index) => {
            return (
                <TouchableOpacity activeOpacity={0.7} style={styles.productListTitle} onPress={() => setProductType(data)} key={index}>
                    <Text style={{ fontSize: 16, color: productType === data ? selectedColor : unSelectedColor }}>{data}</Text>
                </TouchableOpacity>
            )
        });

    }

    return (

        <View style={styles.container}>
            <View style={[styles.header, { height: data.list.length > 1 ? '14%' : '8%' }]}>

                <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}
                    onPress={() => props.navigation.navigate('Search')}>
                    <MaterialCommunityIcons name='magnify' size={18} />
                    <Text style={styles.searchBarText}>Search for an item...</Text>
                </TouchableOpacity>

                {data.list.length > 1 ?
                    < View >
                        <ScrollView horizontal={true} >
                            {topbar()}
                        </ScrollView>
                    </View> : null
                }
            </View>
            {Object.keys(selectedProduct).length > 0 ? <RecyclerListView data={selectedProduct}/> : null}
        </View >


    );
}


const mapStateToProps = state => {
    return {
        item: state.provision.item,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ADD_PROVISION: (data) => {
            dispatch({ type: 'ADD_PROVISION', data })
        },
        RESET_PROVISION: () => {
            dispatch({ type: 'RESET_PROVISION' })
        },
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(List)


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
        fontSize: 16,
    },

});













