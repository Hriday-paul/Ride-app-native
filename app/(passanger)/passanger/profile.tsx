import React from 'react'
import { ScrollView, StatusBar, Text, View } from 'react-native'

export default function ProfileScreen() {
  return (
    <ScrollView
              className="flex-1 bg-white"
              contentContainerClassName="px-6 py-8"
              keyboardShouldPersistTaps="handled"
            >
        
              <StatusBar barStyle="dark-content" />
        <View>
          <Text className='text-2xl font-bold text-center text-gray-900'>Profile</Text>
        </View>
        </ScrollView>
  )
}