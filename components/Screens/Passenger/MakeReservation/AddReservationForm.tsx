import React from 'react'
import { View } from 'react-native'
import AddOrderDetails from './AddOrderDetails'

const AddReservationForm = () => {
    return (
        <View className='flex-1 pt-3'>
            <AddOrderDetails
                currentUser={{ id: 1, name: "Temp Hriday", phone: "0193893838" }}
                contacts={[]} // fetched list of BookingContact
            />
        </View>
    )
}

export default AddReservationForm