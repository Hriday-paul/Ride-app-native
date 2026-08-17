import React, { useState } from 'react';
import { View } from 'react-native';
import AddOrderDetails from './AddOrderDetails';

const AddReservationForm = () => {
    const [bookingContact, setBookingContact] = useState(null);
    return (
        <View className='flex-1 bg-gray-100 p-4 gap-4'>
            <AddOrderDetails
                currentUser={{ id: 1, name: "Temp Hriday", phone: "0193893838" }}
                contacts={[]} // fetched list of BookingContact
            />
        </View>
    )
}

export default AddReservationForm