import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform, View, Dimensions } from "react-native";
import Checkout from "@/assets/images/payment/Checkout.svg";
import CheckOutUnactive from "@/assets/images/payment/Checkout_unactive.svg";
import Bus from "@/assets/images/payment/bus-toy.svg";
import BusUnactiive from "@/assets/images/payment/bus-toy_unactive.svg";
import HomeIconTab from "@/assets/images/payment/Home.svg";
import HomeInactive from "@/assets/images/payment/Home_unactive.svg";
import Meal from "@/assets/images/payment/meal.svg";
import MealUnactive from "@/assets/images/payment/meal_unactive.svg";
import ProfileIcon from "@/assets/images/payment/profile.svg";
import ProfileUnactive from "@/assets/images/payment/profile_unactive.svg";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarHeight = Dimensions.get("screen").height * 0.08;

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#2B6128",
        // tabBarInactiveTintColor: "#2B6128",
        headerShown: false,
        tabBarShowLabel: false, // Hides labels
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            borderTopWidth: 0,
            borderTopColor: "#2B6128",
            height: 60
          },
          android: {
            backgroundColor: "white",
            // elevation: 8,
            borderTopWidth: 1,
            widthColor: "#2B6128",
            shadowOpacity: 0.1,
            height: Dimensions.get('screen').height * 0.08,
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }
        })
      }}
    >
      {[
        { name: "home", icon: HomeIconTab, inactiveIcon: HomeInactive },
        { name: "meal", icon: Meal, inactiveIcon: MealUnactive },
        { name: "cart", icon: Checkout, inactiveIcon: CheckOutUnactive },
        { name: "(bus)", icon: Bus, inactiveIcon: BusUnactiive },
        { name: "accounts", icon: ProfileIcon, inactiveIcon: ProfileUnactive }
      ].map((item: any, index: number) => (
        <Tabs.Screen
          key={index}
          name={item.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="rounded-full flex flex-col items-center justify-center"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: Dimensions.get("window").width * 0.14,
                  height: Dimensions.get("window").width * 0.14,
                  backgroundColor: focused ? "#2B6128" : "transparent",
                  marginTop: Dimensions.get("window").height * 0.023
                  // borderRadius: 9999
                }}
              >
                {focused ? (
                  <item.icon  />
                ) : (
                  <item.inactiveIcon  />
                )}
              </View>
            )
          }}
        />
      ))}
      
    </Tabs>
  );
}
