import React from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, Dimensions, Image, ActivityIndicator, View } from 'react-native';
import Swiper from 'react-native-swiper'
import axios from 'axios'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'


const SCREEN_WIDTH = (Dimensions.get('window').width - 20) / 3;
const SCREEN_HEIGHT = (Dimensions.get('window').height / 4.5);


const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

const offerImage = [
    'https://arukil.s3.ap-south-1.amazonaws.com/offercard/Offer-01-01+(1).jpg',
    'https://arukil.s3.ap-south-1.amazonaws.com/offercard/Free-Delivery.jpg'
]

class Grocery extends React.Component {

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
                case 'GROCERY':
                    dim.width = SCREEN_WIDTH,
                        dim.height = SCREEN_HEIGHT;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break;
            };
        })
    }

    async componentDidMount() {

        await axios.get('https://arukil.herokuapp.com/api/products/grocery')
            .then(response => {
                const res = response.data.data;
                return this.setState({
                    list: dataProvider.cloneWithRows(res),
                }, this._layoutHandler());
            }).catch(error => {
                console.log(error)
            })
    }



    rowRenderer = (type, data) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() =>
                this.props.navigation.navigate(data.route, {
                    data: data
                })
               }>
                <View style={styles.innerCard}>
                    <Image source={{ uri: data.image }} resizeMode='contain' style={styles.listImage} />
                    <Text style={styles.listName} numberOfLines={2} >{data.name} </Text>
                </View>

            </TouchableOpacity >
        )
    }


    render() {

        const slider = offerImage.map((image, index) =>
            <View style={styles.slide} key={index}>
                <Image
                    source={{ uri: image }}
                    resizeMode="cover"
                    style={styles.sliderImage}
                />
            </View>
        )

        return (


            !this.state.isLoading ?
                <View style={styles.container} >

                    <View style={styles.sliderContainer}>
                        <Swiper
                            activeDotColor={'#e91e63'}
                            autoplay={true}
                            dotStyle={{ width: 5, height: 5, top: 20 }}
                            activeDotStyle={{ width: 5, height: 5, top: 20 }}>
                            {slider}
                        </Swiper>
                    </View>

                    <RecyclerListView
                        style={styles.body}
                        rowRenderer={this.rowRenderer}
                        dataProvider={this.state.list}
                        layoutProvider={this.layoutProvider}
                        scrollViewProps={{
                            showsVerticalScrollIndicator: false,
                        }}
                    />
                </View>
                :
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#e91e63" />
                </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    sliderContainer: {
        height: 148,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    body: {
        flex: 1,
        paddingVertical: 15
    },
    card: {
        width: '100%',
        height: '95%',
        flexWrap: 'wrap',
        alignContent: 'center'
    },
    innerCard: {
        width: '90%',
        height: '90%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: '#ddd',
    },
    listImage: {
        width: '80%',
        height: '60%',
        aspectRatio: 1
    },
    listName: {
        fontSize: 13,
        textAlign: 'center',
        color: '#4f4f4f',
    },

});

export default Grocery;






