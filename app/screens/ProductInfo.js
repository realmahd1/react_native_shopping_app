import { View, Text, Animated, StyleSheet, StatusBar, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Items } from '../components/Database';
import { COLOURS } from './../components/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
                <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
                    <View style={styles.rowContainer}>
                        <Entypo name="shopping-cart" style={styles.cartIcon} />
                        <Text style={styles.shoppingText}>Shopping</Text>
                    </View>
                    <View style={[styles.rowContainer, { marginVertical: 4, justifyContent: 'space-between' }]}>
                        <Text style={styles.productName}>{product.productName}</Text>
                        <Ionicons name="link-outline" style={styles.linkIcon} />
                    </View>
                    <Text style={styles.description}>
                        {product.description}
                    </Text>
                    <View style={styles.locationContainer}>
                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                            <View style={styles.locationIconParent}>
                                <Entypo name="location-pin" style={{ fontSize: 16, color: COLOURS.blue }} />
                            </View>
                            <Text> Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
                        </View>
                        <Entypo name="chevron-right" style={{ fontSize: 22, color: COLOURS.backgroundDark }} />
                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={styles.productPrice}>&#36;{product.productPrice?.toFixed(2)}</Text>
                        <Text>Tax Rate 2%~ &#36;{product.productPrice / 20} (&#36;{product.productPrice + product.productPrice / 20})</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.ButtonParent}>
                <TouchableOpacity style={styles.buttonTextParent}>
                    <Text style={styles.buttonText}>{product.isAvailable ? "Add to cart" : "Not Available"}</Text>
                </TouchableOpacity>
            </View>
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
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartIcon: {
        fontSize: 18,
        color: COLOURS.blue,
        marginRight: 6
    },
    shoppingText: {
        fontSize: 12,
        color: COLOURS.black
    },
    productName: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginVertical: 4,
        color: COLOURS.black,
        maxWidth: '84%'
    },
    linkIcon: {
        fontSize: 24,
        color: COLOURS.blue,
        backgroundColor: COLOURS.blue + 10,
        padding: 8,
        borderRadius: 100
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '500',
        maxWidth: '85%',
        color: COLOURS.black,
        marginBottom: 4
    },
    ButtonParent: {
        position: 'absolute',
        bottom: 10,
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextParent: {
        width: '86%',
        height: '90%',
        backgroundColor: COLOURS.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase'
    },
    locationIconParent: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 100,
        marginRight: 10
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 14,
        borderBottomColor: COLOURS.backgroundLight,
        borderBottomWidth: 1,
        paddingBottom: 20
    },
    description: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        letterSpacing: 1,
        opacity: 0.5,
        lineHeight: 20,
        maxWidth: '85%',
        maxHeight: 44,
        marginBottom: 18
    }
})



export default ProductInfo