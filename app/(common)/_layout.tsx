import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Layout = () => {
    return (
        <View>
            <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
        </View>
    )
}

export default Layout