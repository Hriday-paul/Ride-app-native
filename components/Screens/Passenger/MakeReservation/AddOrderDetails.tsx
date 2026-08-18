import { ReservationContext } from "@/contexts/ReservationContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";

type BookingFor = "me" | "other";
type TripType = "oneway" | "roundtrip" | "hourly";

function AddOrderDetails() {

  const context = useContext(ReservationContext);

  const router = useRouter()
  const [tripType, setTripType] = useState<TripType>("oneway");

  return (
    <View className="gap-4">
      {/* Booking For Card */}
      <View className="bg-white rounded-2xl p-5">
        <Text className="text-gray-900 text-base font-semibold mb-4 font-poppins-semibold">
          Booking For
        </Text>

        <View className="flex-row bg-gray-100 rounded-full p-1">
          <Pressable
            // onPress={() => setBookingFor("me")}
            className={`flex-1 py-3 rounded-full items-center ${!context?.bookingContact ? "bg-blue-500" : "bg-transparent"
              }`}
          >
            <Text
              className={`font-semibold text-base font-poppins-semibold ${!context?.bookingContact ? "text-white" : "text-gray-500"
                }`}
            >
              Me
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/passanger/selectContact')}
            className={`flex-1 py-3 rounded-full items-center ${context?.bookingContact ? "bg-blue-500" : "bg-transparent"
              }`}
          >
            <Text
              className={`font-semibold text-base font-poppins-semibold ${context?.bookingContact ? "text-white" : "text-gray-500"
                }`}
            >
              Other
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Trip Type Card */}
      <View className="bg-white rounded-2xl p-5">
        <Text className="text-gray-900 text-base font-semibold mb-4 font-poppins-semibold">
          Trip Type
        </Text>

        <View className="flex-row gap-2">
          {(
            [
              { key: "oneway", label: "One Way" },
              { key: "roundtrip", label: "Round Trip" },
              { key: "hourly", label: "Hourly" },
            ] as { key: TripType; label: string }[]
          ).map((item) => (
            <Pressable
              key={item.key}
              onPress={() => setTripType(item.key)}
              className={`flex-1 py-3 rounded-md items-center ${tripType === item.key ? "bg-blue-500" : "bg-gray-100"
                }`}
            >
              <Text
                className={`font-medium font-poppins-semibold text-sm ${tripType === item.key ? "text-white" : "text-gray-500"
                  }`}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

export default AddOrderDetails