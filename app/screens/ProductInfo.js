import { View, Text, Animated, StyleSheet, StatusBar, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Items } from '../components/Database';
import { COLOURS } from './../components/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import RenderProduct from '../components/RenderProduct';

const ProductInfo = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState([]);

    const SCREEN_WIDTH = Dimensions.get('window').width

    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, SCREEN_WIDTH);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getDataFromDB()
        })
        return unsubscribe
    }, [navigation])
    const getDataFromDB = () => {
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].id == productId) {
                return setProduct(Items[index]);
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle="dark-content" />

            <ScrollView>
                <View style={styles.scrollViewContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity>
                            <Entypo name="chevron-left" style={styles.leftIcon} />
                        </TouchableOpacity>
                    </View>
                    <FlatList data={product.productImageList ? product.productImageList : null} horizontal showsHorizontalScrollIndicator={false} decelerationRate={0.8}
                        snapToInterval={SCREEN_WIDTH} bounces={false} onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false },)}
                        renderItem={({ item }) => <RenderProduct item={item} SCREEN_WIDTH={SCREEN_WIDTH} />} />

                    <View style={styles.productImageContainer}>
                        {product.productImageList ?
                            product.productImageList.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp'
                                })
                                return (
                                    <Animated.View key={index} style={[styles.productImageIndicator, { opacity }]}></Animated.View>
                                )
                            })
                            : null}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative'
    },
    leftIcon: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.white,
        borderRadius: 10
    },
    scrollViewContainer: {
        width: '100%',
        backgroundColor: COLOURS.backgroundLight,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 4
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16
    },
    productImageContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 32
    },
    productImageIndicator: {
        width: '16%',
        height: 2.4,
        backgroundColor: COLOURS.black,
        marginHorizontal: 4,
        borderRadius: 100
    }
})



export default ProductInfo