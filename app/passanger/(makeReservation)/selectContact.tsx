import Appbar from '@/components/Shared/Appbar';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Contact = {
  id: string;
  name: string;
  phone: string;
  initials: string;
  color: string;
};

const CONTACTS: Contact[] = [
  { id: "1", name: "Sarah Johnson", phone: "+1 (555) 234-5678", initials: "SJ", color: "bg-blue-500" },
  { id: "2", name: "Michael Chen", phone: "+1 (555) 876-4321", initials: "MC", color: "bg-green-500" },
  { id: "3", name: "Emily Rodriguez", phone: "+1 (555) 112-9087", initials: "ER", color: "bg-orange-400" },
  { id: "4", name: "James Williams", phone: "+1 (555) 543-2198", initials: "JW", color: "bg-purple-500" },
  { id: "5", name: "Priya Patel", phone: "+1 (555) 678-3456", initials: "PP", color: "bg-pink-500" },
  { id: "6", name: "David Kim", phone: "+1 (555) 901-2345", initials: "DK", color: "bg-red-500" },
  { id: "7", name: "Aisha Thompson", phone: "+1 (555) 321-7654", initials: "AT", color: "bg-teal-500" },
  { id: "8", name: "Carlos Mendez", phone: "+1 (555) 456-8901", initials: "CM", color: "bg-orange-500" },

  { id: "9", name: "Sarah Johnson", phone: "+1 (555) 234-5678", initials: "SJ", color: "bg-blue-500" },
  { id: "10", name: "Michael Chen", phone: "+1 (555) 876-4321", initials: "MC", color: "bg-green-500" },
  { id: "11", name: "Emily Rodriguez", phone: "+1 (555) 112-9087", initials: "ER", color: "bg-orange-400" },
  { id: "12", name: "James Williams", phone: "+1 (555) 543-2198", initials: "JW", color: "bg-purple-500" },
  { id: "13", name: "Priya Patel", phone: "+1 (555) 678-3456", initials: "PP", color: "bg-pink-500" },
  { id: "14", name: "David Kim", phone: "+1 (555) 901-2345", initials: "DK", color: "bg-red-500" },
  { id: "15", name: "Aisha Thompson", phone: "+1 (555) 321-7654", initials: "AT", color: "bg-teal-500" },
  { id: "16", name: "Carlos Mendez", phone: "+1 (555) 456-8901", initials: "CM", color: "bg-orange-500" },
];

const selectContact = () => {

  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white">

      <StatusBar barStyle="dark-content" className='bg-white' />

      <View className='px-4 py-2'>
        <Appbar title="Select Contact" />
      </View>

      <View className="flex-1 ">

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
            <Pressable className="flex-row items-center justify-between px-4 py-4">
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
              {CONTACTS.map((contact) => {
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
                        className={`w-11 h-11 rounded-full items-center justify-center mr-3 ${contact.color}`}
                      >
                        <Text className="text-white font-semibold text-sm font-poppins">
                          {contact.initials}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-gray-900 font-semibold text-base font-poppins-semibold">
                          {contact.name}
                        </Text>
                        <Text className="text-gray-500 text-sm font-poppins">
                          {contact.phone}
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


          </View>
        </ScrollView>

        {/* Confirm Button */}
        {selectedContact && (
          <View className="px-4 py-3">
            <TouchableOpacity onPress={() => { }}
              activeOpacity={0.85}
              className="w-full bg-primary rounded-full py-4 items-center">
              <Text className="text-white text-base font-bolds font-poppins-semibold">
                Confirm Contact
              </Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

    </SafeAreaView>
  )
}

export default selectContact