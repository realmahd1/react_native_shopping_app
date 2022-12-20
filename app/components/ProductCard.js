import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from './Database';

const ProductCard = ({ data }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.productImageContainer}>
                {data.isOff ? (
                    <View style={styles.offPercentageContainer}>
                        <Text style={styles.offPercentage}>{data.offPercentage}%</Text>
                    </View>
                ) : null}
                <Image source={data.productImage} style={styles.productImage} />
            </View>
            <Text style={styles.productName}>{data.productName}</Text>
            {data.category == "accessory" ? data.isAvailable ? (
                <View style={styles.rowContainer}>
                    <FontAwesome name="circle" style={styles.greenCircle} />
                    <Text style={styles.availableText}>Available</Text>
                </View>
            ) : (
                <View style={styles.rowContainer}>
                    <FontAwesome name="circle" style={styles.redCircle} />
                    <Text style={styles.unAvailableText}>UnAvailable</Text>
                </View>
            ) : null}
            <Text>&#36;{data.productPrice}</Text>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        width: '48%',
        marginVertical: 14
    },
    productName: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '600',
        marginBottom: 2,
        height: 30,
        overflow: 'hidden'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    greenCircle: {
        fontSize: 8,
        marginRight: 6,
        color: COLOURS.green
    },
    redCircle: {
        fontSize: 8,
        marginRight: 6,
        color: COLOURS.red
    },
    availableText: {
        fontSize: 12,
        color: COLOURS.green
    },
    unAvailableText: {
        fontSize: 12,
        color: COLOURS.red
    },
    productImage: {
        width: '80%',
        height: "80%",
        resizeMode: "contain"
    },
    offPercentage: {
        fontSize: 12,
        color: COLOURS.white,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    offPercentageContainer: {
        position: 'absolute',
        width: '20%',
        height: '24%',
        backgroundColor: COLOURS.green,
        top: 0,
        left: 0,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productImageContainer: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        backgroundColor: COLOURS.backgroundLight,
        position: 'relative',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 8
    }
})