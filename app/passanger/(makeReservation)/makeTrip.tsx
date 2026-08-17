import AddReservationForm from '@/components/Screens/Passenger/MakeReservation/AddReservationForm'
import Appbar from '@/components/Shared/Appbar'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MakeTrip = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">

            <StatusBar barStyle="dark-content" className='bg-white' />

            <View className="flex-1">

                <View className='px-4 py-2'>
                    <Appbar title="Make Reservation" />
                </View>

                <AddReservationForm />

            </View>
        </SafeAreaView>
    )
}

export default MakeTrip