import { View, Text, Image } from 'react-native'
import React from 'react'

const RenderProduct = ({ item,SCREEN_WIDTH }) => {
    return (
        <View style={{ width: SCREEN_WIDTH, height: 240, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={item} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
        </View>
    )
}

export default RenderProduct