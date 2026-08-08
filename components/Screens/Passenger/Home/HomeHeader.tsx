import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function HomeHeader({

}) {
    const router = useRouter();
    const notificationCount = 7;

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <View className="flex-row items-center justify-between py-4">
            {/* Left: avatar + greeting */}
            <View className="flex-row items-center">
                <View >
                    <Image
                        source={user?.image ? { uri: user.image } : require('@/assets/images/empty-user.png')}
                        className="w-12 h-12 rounded-full border-2 border-white"
                        resizeMode="cover"
                    />
                </View>

                <View className="ml-3">
                    <Text className="text-gray-400 text-sm font-medium font-poppins">Good Morning</Text>
                    <Text className="text-gray-900 text-base font-bold font-poppins">
                        {user?.name || 'Unknown'}
                    </Text>
                </View>
            </View>

            {/* Right: notification bell with badge */}
            <Pressable
                onPress={() => { router.push('/notification') }}
                className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
            >
                <Ionicons name="notifications-outline" size={22} color="#6B7280" />

                {notificationCount > 0 && (
                    <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 items-center justify-center">
                        <Text className="text-white text-[10px] font-bold">
                            {notificationCount > 99 ? "99+" : notificationCount}
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
}