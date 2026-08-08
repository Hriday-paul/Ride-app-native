import CompletedTrips from '@/components/Screens/Passenger/Home/CompletedTrips'
import HomeHeader from '@/components/Screens/Passenger/Home/HomeHeader'
import { useRouter } from 'expo-router'
import React from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PassangerHome() {
  const router = useRouter()
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-2">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1">
        
        <HomeHeader />
        
        <View>
          <TouchableOpacity
            onPress={() => router.push('/passanger/makeTrip')}
            activeOpacity={0.85}
            className="w-full bg-primary rounded-full py-4 items-center my-2"
          >
            <Text className="text-white text-lg font-bolds font-poppins">
              Make Reservation
            </Text>
          </TouchableOpacity>
        </View>

        <CompletedTrips />
      </View>
    </SafeAreaView>
  )
}