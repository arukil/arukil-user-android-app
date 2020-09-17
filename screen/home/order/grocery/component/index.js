import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, Dimensions, Image, ActivityIndicator, View } from 'react-native';
import Swiper from 'react-native-swiper'
import axios from 'axios'

const SCREEN_WIDTH = (Dimensions.get('window').width - 20) / 3;
const SCREEN_HEIGHT = (Dimensions.get('window').height / 5.20);

const offerImage = [
    'https://arukil.s3.ap-south-1.amazonaws.com/offercard/Offer-01-01+(1).jpg',
    'https://arukil.s3.ap-south-1.amazonaws.com/offercard/Free-Delivery.jpg'
]

class Grocery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            list: [],
        };
    }


    async componentDidMount() {
        await axios.get('https://arukil.herokuapp.com/api/products/grocery')
            .then(response => {
                const res = response.data.data;
                return this.setState({
                    list: res,
                    isLoading: false
                });
            }).catch(error => {
                console.log(error)
            })
    }



    renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() =>
                this.props.navigation.navigate(item.route, {
                    item: item
                })
            }>
                <View style={styles.innerCard}>
                    <Image source={{ uri: item.image }} resizeMode='contain' style={styles.listImage} />
                    <Text style={styles.listName} numberOfLines={2} >{item.name} </Text>
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
                    <FlatList
                        style={styles.body}
                        data={this.state.list}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
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
    },
    sliderContainer: {
        flex: 0.37,
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
        paddingTop: 5,
    },
    card: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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











