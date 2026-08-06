import React from "react";
import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

/**
 * Custom bottom tab bar — Home / History / Chat / Profile
 *
 * Usage with expo-router:
 *   // app/(tabs)/_layout.tsx
 *   import { Tabs } from "expo-router";
 *   import BottomTabBar from "../../components/BottomTabBar";
 *
 *   export default function TabLayout() {
 *     return (
 *       <Tabs tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
 *         <Tabs.Screen name="index" options={{ title: "Home" }} />
 *         <Tabs.Screen name="history" options={{ title: "History" }} />
 *         <Tabs.Screen name="chat" options={{ title: "Chat" }} />
 *         <Tabs.Screen name="profile" options={{ title: "Profile" }} />
 *       </Tabs>
 *     );
 *   }
 *
 * Requires: nativewind, tailwindcss, @expo/vector-icons, @react-navigation/bottom-tabs
 */

const ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  index: "home",
  home: "home",
  history: "clock",
  chat: "message-circle",
  profile: "user",
};

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around
                 bg-white pt-3 pb-7 px-4 border-t border-gray-100
                 rounded-t-3xl shadow-lg"
      style={{
        // soft elevation shadow (Tailwind's shadow-lg alone isn't enough on Android)
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
        elevation: 12,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName = ICONS[route.name] ?? "circle";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="items-center justify-center flex-1"
            hitSlop={8}
          >
            <Feather
              name={iconName}
              size={24}
              color={isFocused ? "#3B82F6" : "#9CA3AF"}
            />
            {isFocused && (
              <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}