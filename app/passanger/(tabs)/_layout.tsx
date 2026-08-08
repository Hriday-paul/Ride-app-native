import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const ACTIVE_COLOR = colors.primary;
const INACTIVE_COLOR = colors.gray;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          height: 70,
          paddingTop: 12,
          paddingBottom: 0,
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
        // tabBarButton: ({ children, onPress, accessibilityState, testID, accessibilityLabel }) => {
        //   return (
        //     <Pressable
        //       onPress={onPress}
        //       accessibilityState={accessibilityState}
        //       testID={testID}
        //       accessibilityLabel={accessibilityLabel}
        //       // hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        //       android_ripple={{ color: "#E5E7EB", borderless: false, radius: 42 }}
        //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        //     >
        //       {({ pressed }) => (
        //         <View
        //           style={{
        //             // paddingHorizontal: 18,
        //             // paddingVertical: 8,
        //             // borderRadius: 18,
        //             backgroundColor: pressed ? "#f9f9f9" : "transparent",
        //           }}
        //           className="flex-1 items-center justify-center w-full"
        //         >
        //           {children}
        //         </View>
        //       )}
        //     </Pressable>
        //   );
        // },
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