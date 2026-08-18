import Appbar from '@/components/Shared/Appbar';
import CountryCodePicker, { COUNTRY_CODES } from '@/components/ui/CountryCodePicker';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormData = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
};

const addNewContact = () => {
    const router = useRouter();
    //   const [handleRegister, { isLoading, isError, error }] = useRegisterMutation();

    const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // defaults to Bangladesh

    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            data.phone = "+" + selectedCountry?.dial + data?.phone;
            //   await handleRegister(data).unwrap();
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
        <SafeAreaView className="flex-1 bg-white">

            <StatusBar barStyle="dark-content" className='bg-white' />

            <View className='px-4 py-2'>
                <Appbar title="Add New Contact" />
            </View>

            <View className='px-4 py-2 gap-y-4'>
                <View className="">
                    <Text className="text-gray-800 text-base mb-1 font-poppins">
                        First Name
                    </Text>
                    <Controller
                        control={control}
                        name="first_name"
                        rules={{
                            required: 'First name is required',
                            // minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View className={`flex-row items-center border ${errors.first_name ? "border-red-600" : "border-gray-300 focus:border-primary"} duration-150 rounded-lg px-2 py-1.5`}>
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
                    {errors.first_name && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">
                            {errors.first_name.message}
                        </Text>
                    )}
                </View>

                <View className="">
                    <Text className="text-gray-800 text-base mb-1 font-poppins">
                        Last Name
                    </Text>
                    <Controller
                        control={control}
                        name="last_name"
                        rules={{
                            // required: 'Last name is required',
                            // minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View className={`flex-row items-center border ${errors.last_name ? "border-red-600" : "border-gray-300 focus:border-primary"} duration-150 rounded-lg px-2 py-1.5`}>
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
                    {errors.last_name && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">
                            {errors.last_name.message}
                        </Text>
                    )}
                </View>

                <View className="">
                    <Text className="text-gray-800 text-base mb-1 font-poppins">
                        Email
                    </Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid email address'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View className={`flex-row items-center border ${errors.email ? "border-red-600" : "border-gray-300 focus:border-primary"} duration-150 rounded-lg px-2 py-1.5`}>
                                <View className="w-10 flex-row items-center justify-center">
                                    <FontAwesome name="envelope" size={20} color="black" />
                                </View>
                                <View className="w-[1px] h-5 bg-gray-300 mr-3" />
                                <TextInput
                                    className="flex-1 text-gray-800"
                                    placeholder="Email ..."
                                    placeholderTextColor="#9ca3af"
                                    secureTextEntry={false}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            </View>
                        )}
                    />
                    {errors.email && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">
                            {errors.email.message}
                        </Text>
                    )}
                </View>

                {/* Phone Number Field */}
                <View className="">
                    <Text className="text-gray-800 text-base mb-1 font-poppins">
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


                <TouchableOpacity onPress={() => { }}
                    activeOpacity={0.85}
                    
                    className="w-full bg-primary rounded-md py-4 items-center mt-5">
                    <Text className="text-white text-base font-bolds font-poppins-semibold">
                        Save Contact
                    </Text>
                </TouchableOpacity>

            </View>



        </SafeAreaView>
    )
}

export default addNewContact