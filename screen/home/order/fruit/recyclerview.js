import React from 'react';
import { View, Dimensions, Text, Image, ActivityIndicator, } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import styles from './style';
import CartBtn from '../helper/vf_helper/cartbtn';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height / 6;


const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

class Fruit extends React.Component {
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

    async componentDidMount() {
        var Data = []

        console.log('f   outer')
        await axios.get(`https://arukil.herokuapp.com/api/products/fruit`)
            .then(response => {
                console.log('f  enter')
                return Data = response.data.data;
            }).catch(error => {
                console.log(error)
            })

        this.setState({
            list: dataProvider.cloneWithRows(Data),
        }, this._layoutHandler());

    }


    rowRenderer = (type, data) => {

        const { image, name, available } = data;

        return (
            <View style={styles.listView}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.listContent}>
                    <Text style={styles.listname} numberOfLines={1}>{name}</Text>
                    <View style={styles.subdiv}>
                        <Text style={{ color: '#999' }}>{available[0].weight}</Text>
                        <CartBtn data={data} />
                    </View>
                    <Text style={styles.price}>
                        <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                        {available[0].price}
                    </Text>
                </View>
            </View>

        )
    }

    render() {

        return (
            !this.state.isLoading ?
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
        );
    }
}

export default Fruit;

