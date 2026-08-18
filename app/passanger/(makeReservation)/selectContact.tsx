import Appbar from '@/components/Shared/Appbar';
import ErrorState from '@/components/Shared/Error';
import { ReservationContext } from '@/contexts/ReservationContext';
import { useBookingContactsQuery } from '@/redux/apis/user.api';
import { BookingContact } from '@/redux/types';
import { colors } from '@/utils/colors';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const selectContactScreen = () => {

  return (
    <SafeAreaView className="flex-1 bg-white">

      <StatusBar barStyle="dark-content" className='bg-white' />

      <View className='px-4 py-2'>
        <Appbar title="Select Contact" />
      </View>

      <SelectContact />

    </SafeAreaView>
  )
}

export default selectContactScreen;

const SelectContact = () => {
  const context = useContext(ReservationContext);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<BookingContact | null>(context?.bookingContact || null);
  const router = useRouter();

  const { isLoading, isError, refetch, error, data } = useBookingContactsQuery();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={50} color={colors.primary} />
      </View>
    )
  }

  if (isError) {
    const err = error as any;
    return (
      <ErrorState onRetry={refetch} message={err?.data?.message || 'An unexpected error occurred.'} />
    )
  }

  const filteredContacts = data?.data?.filter(contact => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) || contact.phone.includes(search);
  });

  return <View className="flex-1">

    <ScrollView
      className="flex-1"
    >

      <View className='flex-1 gap-2'>


        {/* Search Bar */}
        <View className="px-4 mt-2">
          <View className="flex-row items-center bg-gray-100 rounded-full px-6 py-1">
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search contacts..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#9CA3AF"
              className="ml-2 flex-1 text-gray-900 font-poppins"
            />
          </View>
        </View>

        {/* Add New Contact */}
        <Pressable onPress={() => router.push('/passanger/addNewContact')} className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
              <Ionicons name="add" size={20} color="white" />
            </View>
            <Text className="ml-3 text-primary text-base font-medium font-poppins-semibold">
              Add New Contact
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
        </Pressable>

        {/* Recent Contacts label */}
        <Text className="px-4 text-xs font-semibold font-poppins text-gray-400 tracking-wide">
          RECENT CONTACTS
        </Text>

        <View className="">
          {filteredContacts?.map((contact) => {
            const isSelected = contact.id === selectedContact?.id;
            return (
              <Pressable
                key={contact.id}
                onPress={() => setSelectedContact(contact)}
                className={`flex-row items-center justify-between py-3 px-3 mb-1 ${isSelected ? "bg-blue-50" : "bg-white"
                  }`}
              >
                <View className="flex-row items-center flex-1">
                  <View
                    className={`w-11 h-11 rounded-full items-center justify-center mr-3 ${colors?.primary}`}
                  >
                    <Text className="text-white font-semibold text-sm font-poppins">
                      {contact?.first_name?.slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-900 font-semibold text-base font-poppins-semibold">
                      {contact?.first_name} {contact?.last_name}
                    </Text>
                    <Text className="text-gray-500 text-sm font-poppins">
                      {contact?.phone}
                    </Text>
                  </View>
                </View>

                {isSelected ? (
                  <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border-2 border-gray-300" />
                )}
              </Pressable>
            );
          })}
        </View>

        {
          filteredContacts?.length === 0 && <View className="items-center justify-center py-16 px-6">
            <View className="bg-gray-100 rounded-full h-16 w-16 items-center justify-center mb-4">
              <Ionicons name="person-outline" size={28} color="#9CA3AF" />
            </View>
            <Text className="text-gray-900 font-semibold text-base mb-1">
              No contacts yet
            </Text>
            <Text className="text-gray-400 text-sm text-center">
              Your saved contacts will show up here.
            </Text>
          </View>
        }


      </View>
    </ScrollView>

    {/* Confirm Button */}
    {selectedContact && (
      <View className="px-4 py-3">
        <TouchableOpacity onPress={() => context?.setBookingContact(selectedContact)}
          activeOpacity={0.85}
          className="w-full bg-primary rounded-full py-4 items-center">
          <Text className="text-white text-base font-bolds font-poppins-semibold">
            Confirm Contact
          </Text>
        </TouchableOpacity>
      </View>
    )}

  </View>
}