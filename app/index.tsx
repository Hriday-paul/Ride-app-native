// app/index.tsx
import { useRouter } from 'expo-router';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 ">
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />

      {/* Illustration Image */}
      <View className="flex-1 items-center justify-end">
        <Image
          source={require('@/assets/images/pages/onboarding/Frame 511.png')}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Bottom white card */}
      <View className="bg-white rounded-t-[36px] px-8 pt-8 pb-10 -mt-10 items-center">

        {/* Title */}
        <Text className="text-2xl font-extrabold text-slate-900 text-center leading-tight tracking-tight font-poppins">
          Go Anywhere, Anytime.{'\n'}Easy and Fast
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-slate-500 text-center mt-4 leading-6 px-2 font-poppins">
          From daily commutes to special trips, we're here to take you wherever you need to go with ease.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={() => router.push('/passanger/home')}
          activeOpacity={0.85}
          className="mt-9 w-full bg-blue-500 rounded-2xl py-5 items-center"
        >
          <Text className="text-white text-lg font-bold tracking-wide font-poppins">
            Get Started Now
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}