import React, { useState } from 'react';
import { View } from 'react-native';
import AddOrderDetails from './AddOrderDetails';

const AddReservationForm = () => {
    
    return (
        <View className='flex-1 bg-gray-100 p-4 gap-4'>
            <AddOrderDetails />
        </View>
    )
}

export default AddReservationForm