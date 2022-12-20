import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from './../components/Database';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProductCard from '../components/ProductCard';

const Home = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [accessory, setAccessory] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getDataFromDB()
        })
        return unsubscribe
    }, [navigation])

    // get data from DB

    const getDataFromDB = () => {
        let productList = [];
        let accessoryList = [];
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == 'product') {
                productList.push(Items[index]);
            } else if (Items[index].category == 'accessory') {
                accessoryList.push(Items[index]);
            }
        }
        setProducts(productList);
        setAccessory(accessoryList)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity>
                        <Entypo name="shopping-bag" style={styles.bagIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="cart" style={styles.cartIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.TitleContainer}>
                    <Text style={styles.title}>Hi-Fi Show &amp; Service</Text>
                    <Text style={styles.description}>Audio shop on Rustaveli Ave 57.
                        {'\n'}This shop offers both products and services</Text>
                </View>
                <View style={{ padding: 16 }}>
                    <View style={styles.productsTitleContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.sectionTitle}>Products</Text>
                            <Text style={styles.sectionNumber}>41</Text>
                        </View>
                        <Text style={styles.showAllText}>Show all</Text>
                    </View>
                    <View style={styles.productsContainer}>
                        {products.map(data => {
                            return <ProductCard navigation={navigation} data={data} key={data.id} />
                        })}
                    </View>
                </View>
                <View style={{ padding: 16 }}>
                    <View style={styles.productsTitleContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.sectionTitle}>Accessories</Text>
                            <Text style={styles.sectionNumber}>19</Text>
                        </View>
                        <Text style={styles.showAllText}>Show all</Text>
                    </View>
                    <View style={styles.productsContainer}>
                        {accessory.map(data => {
                            return <ProductCard navigation={navigation} data={data} key={data.id} />
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 16
    },
    bagIcon: {
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLOURS.backgroundLight
    },
    cartIcon: {
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOURS.backgroundLight
    },
    TitleContainer: {
        marginBottom: 10,
        padding: 16
    },
    title: {
        fontSize: 26,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 10
    },
    description: {
        fontSize: 14,
        color: COLOURS.backgroundMedium,
        fontWeight: '400',
        letterSpacing: 1,
        lineHeight: 24
    },
    productsTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    sectionTitle: {
        fontSize: 18,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1
    },
    sectionNumber: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '400',
        letterSpacing: 1,
        opacity: 0.5,
        marginLeft: 10
    },
    showAllText: {
        fontSize: 14,
        color: COLOURS.blue,
        fontWeight: '400'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})