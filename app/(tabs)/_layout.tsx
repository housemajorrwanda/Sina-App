import { Tabs } from "expo-router";
import React from "react";
// import { UseSelector } from "react-redux";
import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform, View, Dimensions, Text } from "react-native";
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
import QRcode from "@/assets/images/qr-code.svg"
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import QRScanner from "./(home)/(QrScan)";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarHeight = Dimensions.get("screen").height * 0.08;
  const user=useSelector((state: any) => state?.login?.user);
  const cartState = useSelector((state: any) => state?.cart?.products);
  const userTabs=[
    { name: "(home)", icon: HomeIconTab, inactiveIcon: HomeInactive },
    { name: "meal", icon: Meal, inactiveIcon: MealUnactive },
    { name: "(cart)", icon: Checkout, inactiveIcon: CheckOutUnactive },
    { name: "(Bus)", icon: Bus, inactiveIcon: BusUnactiive },
    { name: "(Accounts)", icon: ProfileIcon, inactiveIcon: ProfileUnactive }
  ]
  const staffTabs=[
    { name: "(home)", icon: HomeIconTab, inactiveIcon: HomeInactive },
    // { name: "QrScan", icon: QRcode, inactiveIcon: QRcode, component: QRScanner },
    { name: "meal", icon: Meal, inactiveIcon: MealUnactive },
    { name: "(cart)", icon: Checkout, inactiveIcon: CheckOutUnactive },
    { name: "(Bus)", icon: Bus, inactiveIcon: BusUnactiive },
    { name: "(Accounts)", icon: ProfileIcon, inactiveIcon: ProfileUnactive }
  ]
  const tabsToRender=user?.user_data?.is_staff?staffTabs:userTabs
  // console.log("Tab user",user)
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#2B6128",
        // tabBarInactiveTintColor: "#2B6128",
        headerShown: false,
        tabBarShowLabel: false, // Hides labels
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard:true,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            borderTopWidth: 0,
            borderTopColor: "#2B6128",
            height: Dimensions.get("screen").height * 0.08
          },
          android: {
            backgroundColor: "white",
            // elevation: 8,
            borderTopWidth: 1,
            widthColor: "#2B6128",
            shadowOpacity: 0.1,
            height: Dimensions.get("screen").height * 0.08,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }
        })
      }}
    >
      {tabsToRender.map((item: any, index: number) => (
        <Tabs.Screen
          key={index}
          name={item.name}
          
          options={{
            
            tabBarIcon: ({ focused }) => (
              item.name =='QrScan'?<View
              className="rounded-full flex flex-col items-center justify-center relative"
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: Dimensions.get("window").width * 0.1,
                height: Dimensions.get("window").width * 0.1,
                backgroundColor: focused ? "#2B6128" : "transparent",
                marginTop: Dimensions.get("window").height * 0.023
                // borderRadius: 9999
              }}
            >
              
              <Ionicons name="scan" size={Dimensions.get('window').width * 0.07} color={focused?"white":"#2B6128"} />
            </View>:<View
                className="rounded-full flex flex-col items-center justify-center relative"
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
                {item.name === "(cart)" && (
                  <View
                    className={`absolute flex flex-col w-6 h-6 top-0 right-0 rounded-full items-center justify-center bg-third`}
                  >
                    <Text style={{ color: "white", fontSize: 8 }}>
                      {cartState?.length}
                    </Text>
                  </View>
                )}
                {focused ? <item.icon /> : <item.inactiveIcon />}
              </View>
            )
          }}
        />
      ))}
    </Tabs>
  );
}
