import ErrorState from '@/components/Shared/Error';
import { usePassangerNotFinishedTripsQuery } from '@/redux/apis/reservation.api';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import RideHistoryCardSkeleton from '../Home/TripLoading';
import TripCard from './TripCard';

const IncompletedTrips = () => {
    const { isLoading, isError, isSuccess, data, refetch, error, isFetching } = usePassangerNotFinishedTripsQuery();

    if (isLoading) {
        <View>
            {Array.from({ length: 3 }).map((_, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                    <RideHistoryCardSkeleton />
                </View>
            ))}
        </View>
    }

    if (isError) {
        const err = error as any;
        return (
            <ErrorState onRetry={refetch} message={err?.data?.message || 'An unexpected error occurred.'} />
        )
    }

    return (
        <View className='mt-5'>
            
            <FlatList
                data={data?.data || []}
                renderItem={({ item }) => <TripCard trip={item} />}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 160 }}

                refreshing={isFetching}
                onRefresh={refetch}

                ListEmptyComponent={
                    <View className="items-center justify-center py-16 px-6">
                        <View className="bg-gray-100 rounded-full h-16 w-16 items-center justify-center mb-4">
                            <Ionicons name="car-outline" size={28} color="#9CA3AF" />
                        </View>
                        <Text className="text-gray-900 font-semibold text-base mb-1">
                            No trips yet
                        </Text>
                        <Text className="text-gray-400 text-sm text-center">
                            Your upcoming rides will show up here.
                        </Text>
                    </View>
                }
            />
        </View>
    )
}

export default IncompletedTrips