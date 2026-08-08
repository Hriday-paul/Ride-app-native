import IncompletedTrips from '@/components/Screens/Passenger/History/IncompletedTrips'
import Appbar from '@/components/Shared/Appbar'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HostoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-2">

      <StatusBar barStyle="dark-content" className='bg-white' />

      <View className="flex-1">

        <Appbar title="Upcoming Rides" />
        <IncompletedTrips />
      </View>
    </SafeAreaView>
  )
}