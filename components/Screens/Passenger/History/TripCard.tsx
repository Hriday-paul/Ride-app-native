import { IReservation, ReservationStatus } from '@/redux/types';
import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const STATUS_STYLES: Record<ReservationStatus, { bg: string; text: string; label: string }> = {
    [ReservationStatus.PENDING]: { bg: "#FEF3C7", text: "#B45309", label: "Pending" },
    [ReservationStatus.DRIVER_ASSIGNED]: { bg: "#DBEAFE", text: "#1D4ED8", label: "Driver Assigned" },
    [ReservationStatus.ON_THE_WAY]: { bg: "#DBEAFE", text: "#1D4ED8", label: "On the Way" },
    [ReservationStatus.ARRIVED]: { bg: "#E0E7FF", text: "#4338CA", label: "Arrived" },
    [ReservationStatus.TRIP_STARTED]: { bg: "#CFFAFE", text: "#0E7490", label: "In Progress" },
    [ReservationStatus.TRIP_COMPLETED]: { bg: "#DCFCE7", text: "#16A34A", label: "Completed" },
    [ReservationStatus.CANCELLED_BY_USER]: { bg: "#DC2626", text: "#FFFFFF", label: "Cancelled" },
    [ReservationStatus.CANCELLED_BY_DRIVER]: { bg: "#DC2626", text: "#FFFFFF", label: "Cancelled" },
    [ReservationStatus.CANCELLED_BY_ADMIN]: { bg: "#DC2626", text: "#FFFFFF", label: "Cancelled" },
    [ReservationStatus.NO_SHOW]: { bg: "#F3F4F6", text: "#4B5563", label: "No Show" },
};

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function TripCard({ trip }: { trip: IReservation }) {
    const {
        createdAt,
        distance,
        driver,
        status,
        pick_up,
        drop_off,
    } = trip;

    const statusStyle = STATUS_STYLES[status];
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

export default TripCard;