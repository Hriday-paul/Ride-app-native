import ErrorState from '@/components/Shared/Error';
import { usePassengerCompletedTripsQuery } from '@/redux/apis/reservation.api';
import { IReservation } from '@/redux/types';
import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import RideHistoryCardSkeleton from './TripLoading';

type RideStatus = "completed" | "cancelled";

interface RideHistoryCardProps {
    id: string;
    date: string;        // e.g. "Oct 01"
    distanceKm: number;  // e.g. 2.3
    durationMin: number; // e.g. 18
    vehicleNumber: string; // e.g. "MH 03 1996"
    status: RideStatus;
    pickup: { time: string; address: string };
    drop: { time: string; address: string };
}

export const rideHistoryData: RideHistoryCardProps[] = [
    {
        id: "1",
        date: "Oct 01",
        distanceKm: 2.3,
        durationMin: 18,
        vehicleNumber: "MH 03 1996",
        status: "cancelled" as const,
        pickup: { time: "1:10PM", address: "123 HK CHS, Opposite GT Fields, Chembur-71" },
        drop: { time: "1:40PM", address: "City Hospital, GES Road, Near SSG Park, Fort-01" },
    },
    {
        id: "2",
        date: "Oct 04",
        distanceKm: 5.8,
        durationMin: 27,
        vehicleNumber: "MH 04 7723",
        status: "completed" as const,
        pickup: { time: "9:05AM", address: "45 Lake View Apartments, Powai" },
        drop: { time: "9:32AM", address: "Hiranandani Business Park, Powai" },
    },
    {
        id: "3",
        date: "Oct 09",
        distanceKm: 1.2,
        durationMin: 9,
        vehicleNumber: "MH 02 5541",
        status: "completed" as const,
        pickup: { time: "6:48PM", address: "Om Sai Residency, Andheri East" },
        drop: { time: "6:57PM", address: "Metro Mall, Andheri East" },
    },
    {
        id: "4",
        date: "Oct 12",
        distanceKm: 8.4,
        durationMin: 34,
        vehicleNumber: "MH 01 9012",
        status: "cancelled" as const,
        pickup: { time: "11:20AM", address: "Sunrise Towers, Bandra West" },
        drop: { time: "11:54AM", address: "Terminal 2, Chhatrapati Shivaji Airport" },
    },
    {
        id: "5",
        date: "Oct 15",
        distanceKm: 3.6,
        durationMin: 21,
        vehicleNumber: "MH 03 1996",
        status: "completed" as const,
        pickup: { time: "8:02PM", address: "Green Valley Society, Kurla" },
        drop: { time: "8:23PM", address: "Phoenix Marketcity, Kurla" },
    },
    {
        id: "6",
        date: "Nov 02",
        distanceKm: 4.9,
        durationMin: 25,
        vehicleNumber: "MH 05 3387",
        status: "completed" as const,
        pickup: { time: "7:15AM", address: "Silver Oak CHS, Ghatkopar East" },
        drop: { time: "7:40AM", address: "R City Mall, Ghatkopar West" },
    },
    {
        id: "7",
        date: "Nov 06",
        distanceKm: 0.9,
        durationMin: 6,
        vehicleNumber: "MH 02 5541",
        status: "cancelled" as const,
        pickup: { time: "3:30PM", address: "Blue Ridge Apartments, Fort" },
        drop: { time: "3:36PM", address: "GES Road, Fort-01" },
    },
];

const CompletedTrips = () => {
    const { isLoading, isError, isSuccess, data, refetch, error, isFetching } = usePassengerCompletedTripsQuery();

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
            <Text className='text-xl font-semibold font-poppins-semibold mb-5'>Your Last Trips</Text>
            <FlatList
                data={data?.data || []}
                renderItem={({ item }) => <RideHistoryCard history={item} />}
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
                            Your completed rides will show up here.
                        </Text>
                    </View>
                }
            />
        </View>
    )
}

export default CompletedTrips;

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function RideHistoryCard({ history }: { history: IReservation }) {
    const {
        createdAt,
        distance,
        driver,
        pick_up,
        drop_off,
        final_price,
    } = history;


    const vehicleNumber = driver?.car?.license_number ?? "—";

    return (
        <View
            style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 16,
                padding: 16,
            }}
        >
            {/* Top row: icon + date/distance + vehicle, badge on right */}
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-start flex-1">
                    <View className='bg-primary/15 rounded-full h-10 w-10 items-center justify-center mr-2.5'>
                        <Ionicons name="car-sport" size={18} color={colors.primary} />
                    </View>

                    <View className="flex-1">
                        <Text className="text-gray-900 font-semibold text-[15px]">
                            {formatDate(createdAt)}, {distance}km
                        </Text>
                        <Text className="text-gray-400 text-sm mt-0.5">{vehicleNumber}</Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: "#000000",
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>
                        {final_price}
                    </Text>
                </View>
            </View>

            {/* Timeline: pickup + drop */}
            <View className="mt-4 pl-1">
                {/* Pickup */}
                {pick_up && (
                    <View className="flex-row">
                        <View className="items-center mr-3" style={{ width: 10 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981" }} />
                            <View style={{ width: 1, flex: 1, backgroundColor: "#D1D5DB", marginTop: 4 }} />
                        </View>
                        <View className="flex-1 pb-4">
                            <Text className="text-gray-400 text-xs">{pick_up.time ?? "—"}</Text>
                            <Text className="text-gray-800 text-sm mt-0.5">{pick_up.address}</Text>
                        </View>
                    </View>
                )}

                {/* Drop */}
                {drop_off && (
                    <View className="flex-row">
                        <View className="items-center mr-3" style={{ width: 10 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" }} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-400 text-xs">{drop_off.time ?? "—"}</Text>
                            <Text className="text-gray-800 text-sm mt-0.5">{drop_off.address}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}