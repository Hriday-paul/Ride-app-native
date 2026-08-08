import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE_COLOR = colors.primary;
const INACTIVE_COLOR = colors.gray;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70 + insets.bottom,
          paddingTop: 12,
          // Push content above the system nav bar / home indicator
          paddingBottom: insets.bottom,
          elevation: 12,
          backgroundColor: "white",
          borderTopWidth: 0,
          borderTopColor: "transparent",
          // borderTopLeftRadius: 24,
          // borderTopRightRadius: 24,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                size={25}
              />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "time" : "time-outline"}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                size={25}
              />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                size={25}
              />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                size={25}
              />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}