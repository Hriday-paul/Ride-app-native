// app/(auth)/login.tsx
import CountryCodePicker, { COUNTRY_CODES } from '@/components/ui/CountryCodePicker';
import { useRegisterMutation } from '@/redux/apis/auth.api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type FormData = {
  name: string
  phone: string;
  address: string;
  password: string;
};

const { height } = Dimensions.get('window');

function Register() {
  const router = useRouter();
  const [handleRegister, { isLoading, isError, error }] = useRegisterMutation();

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // defaults to Bangladesh

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      data.phone = "+" + selectedCountry?.dial + data?.phone;
      await handleRegister(data).unwrap();
    } catch (err: any) {

      if (err?.status !== 400) {
        return;
      }

      const serverErrors = err?.data?.errors as { field: string; msg: string }[];
      if (serverErrors.length) {
        serverErrors.forEach(({ field, msg }) => {
          setError(field as keyof FormData, {
            type: 'server',
            message: msg,
          });
        });
      }
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-6 py-8"
      keyboardShouldPersistTaps="handled"
    >

      <StatusBar barStyle="dark-content" />

      {/* This View ensures vertical centering */}
      <View style={{ minHeight: height - 64 }} className="justify-center">

        {/* Header */}

        <Text className="text-2xl font-bold text-center text-gray-900 mb-10 mt-5">
          Sign Up
        </Text>


        {/* Logo */}
        <View className="items-center mb-6">
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>

        {/* Divider */}
        <View className="w-16 h-[1px] bg-gray-300 self-center mb-8" />

        <View className="mb-3">
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Name is required',
              // minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            render={({ field: { onChange, value } }) => (
              <View className={`flex-row items-center border ${errors.name ? "border-red-600" : "border-gray-300 focus:border-primary"} duration-150 rounded-lg px-3 py-2.5`}>
                <View className="w-10 flex-row items-center justify-center">
                  <FontAwesome name="user" size={20} color="black" />
                </View>
                <View className="w-[1px] h-5 bg-gray-300 mr-3" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Name ..."
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={false}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* Phone Number Field */}
        <View className="mb-4">
          <Text className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
            Phone Number
          </Text>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Phone number is required',
              minLength: { value: 6, message: 'Enter a valid phone number' },
            }}
            render={({ field: { onChange, value } }) => (
              <View className={`flex-row items-center border rounded-lg px-3 py-2.5 duration-150 ${errors.phone ? "border-red-600" : "border-gray-300 focus:border-primary"}`}>
                <CountryCodePicker
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                />
                <View className="w-[1px] h-5 bg-gray-300 mr-3" />
                <TextInput
                  className="flex-1 text-gray-800 text-base py-2"
                  placeholder="156780****"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.phone && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.phone.message}
            </Text>
          )}
        </View>

        <View className="mb-3">
          <Controller
            control={control}
            name="address"
            rules={{
              // required: 'Address is required',
              // minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            render={({ field: { onChange, value } }) => (
              <View className={`flex-row items-center border ${errors.address ? "border-red-600" : "border-gray-300 focus:border-primary"} duration-150 rounded-lg px-3 py-2.5`}>
                <View className="w-10 flex-row items-center justify-center">
                  <FontAwesome5 name="address-book" size={20} color="black" />
                </View>
                <View className="w-[1px] h-5 bg-gray-300 mr-3" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Address..."
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={false}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.address && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.address.message}
            </Text>
          )}
        </View>

        {/* Password Field */}
        <View className="mb-3">
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              // minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            render={({ field: { onChange, value } }) => (
              <View className={`flex-row items-center border ${errors.password ? "border-red-600" : "border-gray-300 focus:border-primary"} duration-150 rounded-lg px-3 py-2.5 pr-5`}>
                <View className="w-10 flex-row items-center justify-center">
                  <MaterialIcons name="lock-outline" size={20} color="black" />
                </View>
                <View className="w-[1px] h-5 bg-gray-300 mr-3" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Password ..."
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text className="text-gray-400 text-sm">
                    {showPassword ? <Ionicons name="eye-off-outline" size={24} color="black" /> : <Ionicons name="eye-outline" size={24} color="black" />}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        {(isError && (error as any)?.status !== 400) && (
          <View className="flex-row items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 gap-2">
            <MaterialIcons name="error-outline" size={18} color="#ef4444" />
            <Text className="text-red-500 text-sm flex-1">
              {(error as any)?.data?.message ?? 'Something went wrong, try again'}
            </Text>
          </View>
        )}

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.85}
          disabled={isLoading}
          className={`w-full rounded-2xl py-4 items-center mb-6 ${isLoading ? 'bg-primary/50' : 'bg-primary'}`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white text-base font-bold">Submit</Text>
          )}
        </TouchableOpacity>

        {/* Or continue with */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="text-gray-400 text-sm mx-3">Or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        {/* Social Buttons */}
        <View className="flex-row justify-center gap-4 mb-8">
          <TouchableOpacity className="border border-gray-200 rounded-2xl px-8 py-4 items-center">
            <Image
              source={require('@/assets/images/pages/auth/google.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-200 rounded-2xl px-8 py-4 items-center">
            <Image
              source={require('@/assets/images/pages/auth/apple.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500 text-sm">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-blue-500 text-sm font-bold">Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

export default Register