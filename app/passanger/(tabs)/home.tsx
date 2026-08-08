import CompletedTrips from '@/components/Screens/Passenger/Home/CompletedTrips'
import HomeHeader from '@/components/Screens/Passenger/Home/HomeHeader'
import { useRouter } from 'expo-router'
import React from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'

export default function PassangerHome() {
  const router = useRouter()
  return (

    <View className="bg-white flex-1 px-4 py-8">
      <StatusBar barStyle="dark-content" />
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

  )
}