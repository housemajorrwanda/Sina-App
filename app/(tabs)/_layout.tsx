import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Dimensions } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Checkout from "@/assets/images/payment/Checkout.svg";
import CheckOutUnactive from '@/assets/images/payment/Checkout_unactive.svg'
import Bus from '@/assets/images/payment/bus-toy.svg'
import BusUnactiive from '@/assets/images/payment/bus-toy_unactive.svg'
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarHeight = Dimensions.get("screen").height * 0.08;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: tabBarHeight,
          backgroundColor: "white",
          borderTopWidth: 0,
          flexDirection: "row", // Ensures horizontal alignment of tab items
          paddingTop: Dimensions.get("screen").height * 0.02
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: Dimensions.get("window").width * 0.14,
                height: Dimensions.get("window").width * 0.14,
                backgroundColor: focused ? "green" : "transparent",
                borderRadius: 9999
              }}
            >
              <IconSymbol size={28} name="house.fill" color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="(checkout)/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: Dimensions.get("window").width * 0.14,
                height: Dimensions.get("window").width * 0.14,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                backgroundColor: focused ? "green" : "transparent"
              }}
            >
              {!focused?<CheckOutUnactive />:<Checkout />}
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="(Bus)/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: Dimensions.get("window").width * 0.14,
                height: Dimensions.get("window").width * 0.14,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                backgroundColor: focused ? "green" : "transparent"
              }}
            >
              {!focused?<BusUnactiive />:<Bus />}
            </View>
          )
        }}
      />
    </Tabs>
  );
}
