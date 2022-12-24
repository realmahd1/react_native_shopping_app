import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
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

  //checkout

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

    navigation.navigate('Home');
  };
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
        <View>
          <View style={{ paddingHorizontal: 16, marginVertical: 10, }}>
            <Text style={styles.locationTitle}>Delivery Location</Text>
            <View style={styles.devliveryContainer}>
              <View style={styles.addressContainer}>
                <View style={styles.truckIconContainer}>
                  <MaterialCommunityIcons name="truck-delivery-outline" style={styles.truckIcon} />
                </View>
                <View>
                  <Text style={styles.addressText1}>2 Petre Melikishvili St.</Text>
                  <Text style={styles.addressText2}>0162, Tbilisi</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" style={styles.rightIcon} />
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
            <Text style={styles.paymentTitle}>Payment Method</Text>
            <View style={styles.rowContainer}>
              <View
                style={styles.addressContainer}>
                <View style={styles.paymentIconContainer}>
                  <Text style={styles.paymentIconText}>VISA</Text>
                </View>
                <View>
                  <Text style={styles.paymentCardName}>Visa Classic</Text>
                  <Text style={styles.paymentCardNumber}>****-9092</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" style={styles.rightIcon} />
            </View>
          </View>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfoTitle}>Order Info</Text>
            <View style={styles.subTotalContainer}>
              <Text style={styles.subTotalTitle}>Subtotal</Text>
              <Text style={styles.subTotalPrice}>&#36;{total?.toFixed(2)}</Text>
            </View>
            <View style={styles.taxContainer}>
              <Text style={styles.taxText}>Shipping Tax</Text>
              <Text style={styles.taxPrice}>&#36;{total / 20}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>&#36;{total + total / 20}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutBtnContainer}>
        <TouchableOpacity onPress={() => (total != 0 ? checkOut() : null)} style={styles.checkoutBtnTextContainer}>
          <Text style={styles.checkoutText}>CHECKOUT (&#36;{total + total / 20} )</Text>
        </TouchableOpacity>
      </View>
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
  },
  locationTitle: {
    fontSize: 16,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  truckIconContainer: {
    color: COLOURS.blue,
    backgroundColor: COLOURS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 18,
  },
  truckIcon: {
    fontSize: 18,
    color: COLOURS.blue,
  },
  devliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentTitle: {
    fontSize: 16,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentIconContainer: {
    color: COLOURS.blue,
    backgroundColor: COLOURS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 18,
  },
  paymentIconText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLOURS.blue,
    letterSpacing: 1,
  },
  paymentCardName: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '500',
  },
  paymentCardNumber: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.5,
  },
  rightIcon: {
    fontSize: 22,
    color: COLOURS.black
  },
  addressText1: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '500'
  },
  addressText2: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.5
  },
  addressContainer: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center'
  },
  orderInfoTitle: {
    fontSize: 16,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  orderInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 80,
  },
  subTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subTotalTitle: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLOURS.black,
    opacity: 0.5,
  },
  subTotalPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOURS.black,
    opacity: 0.8,
  },
  taxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  taxText: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLOURS.black,
    opacity: 0.5,
  },
  taxPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOURS.black,
    opacity: 0.8,
  },
  totalText: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: COLOURS.black,
    opacity: 0.5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOURS.black,
  },
  checkoutBtnContainer: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutBtnTextContainer: {
    width: '86%',
    height: '90%',
    backgroundColor: COLOURS.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLOURS.white,
    textTransform: 'uppercase',
  }
})
export default MyCart