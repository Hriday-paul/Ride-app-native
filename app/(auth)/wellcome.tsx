// app/(auth)/login.tsx
import { useRouter } from 'expo-router';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white items-center justify-between px-8 py-16">

            <StatusBar barStyle="dark-content" />

            {/* Logo Section */}
            <View className="flex-1 items-center justify-center gap-4">
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={{ width: 180, height: 180 }}
                    resizeMode="contain"
                />
            </View>

            {/* Divider */}
            <View className="w-16 h-[1px] bg-gray-300 mb-8" />

            {/* Buttons */}
            <View className="w-full gap-4 mb-20">

                {/* Login Button */}
                <TouchableOpacity
                    onPress={() => router.push('/(auth)/login')}
                    activeOpacity={0.85}
                    className="w-full bg-blue-500 rounded-xl py-4 items-center"
                >
                    <Text className="text-white text-lg font-bolds font-poppins">
                        Log in
                    </Text>
                </TouchableOpacity>

                {/* Sign up Button */}
                <TouchableOpacity
                    onPress={() => router.push('/(auth)/register')}
                    activeOpacity={0.85}
                    className="w-full bg-gray-100 rounded-xl py-4 items-center"
                >
                    <Text className="text-gray-700 text-lg font-bold font-poppins">
                        Sign up
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}