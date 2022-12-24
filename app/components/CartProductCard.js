import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from './Database';

export default function CartProductCard({ data }) {
    return (
        <TouchableOpacity key={data.id} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={data.productImage} style={styles.productImage} />
            </View>
            <View style={{ flex: 1, height: '100%', justifyContent: 'space-around' }}>
                <View>
                    <Text style={styles.productName}>{data.productName}</Text>
                    <View style={styles.productPriceContainer}>
                        <Text style={styles.productPrice}>&#36;{data.productPrice}</Text>
                        <Text>(~&#36;{data.productPrice + data.productPrice / 20})</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name='minus' style={styles.icon} />
                        </View>
                        <Text>1</Text>
                        <View style={[styles.iconContainer, { marginLeft: 20 }]}>
                            <MaterialCommunityIcons name='plus' style={styles.icon} />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='delete-outline' style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        width: '30%',
        height: 100,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 10,
        marginRight: 22
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    productName: {
        fontSize: 14,
        maxWidth: '100%',
        color: COLOURS.black,
        fontWeight: '600',
        letterSpacing: 1
    },
    productPriceContainer: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '400',
        maxWidth: '85%',
        marginRight: 4
    },
    iconContainer: {
        borderRadius: 100,
        marginRight: 20,
        padding: 4,
        borderWidth: 1,
        borderColor: COLOURS.backgroundDark,
        opacity: 0.5
    },
    icon: {
        fontSize: 16,
        color: COLOURS.backgroundDark
    },
    deleteIcon: {
        fontSize: 16,
        color: COLOURS.backgroundDark,
        backgroundColor: COLOURS.backgroundLight,
        padding: 8,
        borderRadius: 100
    }
})