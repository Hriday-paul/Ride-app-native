import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

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
    return (
        <View className='mt-5'>
            <Text className='text-xl font-bold font-poppins mb-5'>Your Last Trip</Text>
            <FlatList
                data={rideHistoryData}
                renderItem={({ item }) => <RideHistoryCard history={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 160 }}
            />
        </View>
    )
}

export default CompletedTrips;


const STATUS_STYLES: Record<RideStatus, { bg: string; text: string; label: string }> = {
    completed: { bg: "#DCFCE7", text: "#16A34A", label: "Completed" },
    cancelled: { bg: "#DC2626", text: "#FFFFFF", label: "Cancelled" },
};

function RideHistoryCard({ history }: { history: RideHistoryCardProps }) {
    const { date, distanceKm, durationMin, vehicleNumber, status, pickup, drop } = history;
    const statusStyle = STATUS_STYLES[status];

    return (
        <View
            style={{
                backgroundColor: "white",
                borderWidth : 1,
                borderColor: "#E5E7EB",
                borderRadius: 16,
                padding: 16,
            }}
        >
            {/* Top row: icon + date/distance/duration + vehicle, badge on right */}
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-start flex-1">
                    <View
                        className='bg-primary/15 rounded-full h-10 w-10 items-center justify-center mr-2.5'
                    >
                        <Ionicons name="car-sport" size={18} color={colors.primary} />
                    </View>

                    <View className="flex-1">
                        <Text className="text-gray-900 font-semibold text-[15px]">
                            {date}, {distanceKm}km, {durationMin} min
                        </Text>
                        <Text className="text-gray-400 text-sm mt-0.5">{vehicleNumber}</Text>
                    </View>
                </View>

                {status === "cancelled" ? (
                    <View
                        style={{
                            backgroundColor: statusStyle.bg,
                            paddingHorizontal: 12,
                            paddingVertical: 5,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: statusStyle.text, fontSize: 12, fontWeight: "700" }}>
                            {statusStyle.label}
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            backgroundColor: statusStyle.bg,
                            paddingHorizontal: 12,
                            paddingVertical: 5,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: statusStyle.text, fontSize: 12, fontWeight: "700" }}>
                            {statusStyle.label}
                        </Text>
                    </View>
                )}
            </View>

            {/* Timeline: pickup + drop */}
            <View className="mt-4 pl-1">
                {/* Pickup */}
                <View className="flex-row">
                    <View className="items-center mr-3" style={{ width: 10 }}>
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#10B981",
                            }}
                        />
                        <View
                            style={{
                                width: 1,
                                flex: 1,
                                backgroundColor: "#D1D5DB",
                                marginTop: 4,
                            }}
                        />
                    </View>
                    <View className="flex-1 pb-4">
                        <Text className="text-gray-400 text-xs">{pickup.time}</Text>
                        <Text className="text-gray-800 text-sm mt-0.5">{pickup.address}</Text>
                    </View>
                </View>

                {/* Drop */}
                <View className="flex-row">
                    <View className="items-center mr-3" style={{ width: 10 }}>
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "#EF4444",
                            }}
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-400 text-xs">{drop.time}</Text>
                        <Text className="text-gray-800 text-sm mt-0.5">{drop.address}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}