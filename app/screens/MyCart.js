import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Items } from '../components/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    } else{

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

  return (
    <View>
      <Text>{total}</Text>
    </View>
  )
}

export default MyCart