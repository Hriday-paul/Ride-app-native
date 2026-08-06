import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'

export default function ChatScreen() {
  return (
    <ScrollView
              className="flex-1 bg-white"
              contentContainerClassName="px-6 py-8"
              keyboardShouldPersistTaps="handled"
            >
        
              <StatusBar barStyle="dark-content" />
        <View>
          <Text className='text-2xl font-bold text-center text-gray-900'>Chat</Text>
        </View>
        </ScrollView>
  )
}