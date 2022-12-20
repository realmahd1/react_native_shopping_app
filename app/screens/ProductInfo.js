import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Items } from '../components/Database';

const ProductInfo = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState([]);
    
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
        <View>
            <Text>ProductInfo{productId}</Text>
        </View>
    )
}

export default ProductInfo