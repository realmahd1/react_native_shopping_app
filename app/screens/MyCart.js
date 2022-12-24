import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Items } from '../components/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS } from './../components/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartProductCard from './../components/CartProductCard';

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB()
    })
    return unsubscribe
  }, [navigation])

  // get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {

      setProduct(false);
      getTotal(false);
    }
  }

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total)
  }

  // remove data from cart

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);

    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1)
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" style={styles.leftIcom} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <Text style={styles.screenTitle}>
          MyCart
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map((data) => <CartProductCard key={data.id} data={data} navigation={navigation} removeItemFromCart={removeItemFromCart} />) : null}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: "100%",
    backgroundColor: COLOURS.white
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftIcom: {
    fontSize: 18,
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 12
  },
  headerTitle: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400'
  },
  screenTitle: {
    fontSize: 20,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10
  }
})
export default MyCart