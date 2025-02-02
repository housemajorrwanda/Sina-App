import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2B6128',
        tabBarInactiveTintColor: '#2B6128',
        headerShown: false,
        tabBarShowLabel: false, // Hides labels
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'white',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            borderTopWidth: 0,
            borderTopColor: '#2B6128',
            height: 60, 
          },
          android: {
            backgroundColor: 'white',
            elevation: 8,
            borderTopWidth: 3,
            widthColor:"#2B6128",
            shadowOpacity: 0.1,
            height: 60, 
            
          },
        }),
      }}
    >
      {[
        { name: 'home', icon: Feather, iconName: 'home' },
        { name: 'meal', icon: FontAwesome6, iconName: 'plate-wheat' },
        { name: 'cart', icon: FontAwesome5, iconName: 'shopping-cart' },
        { name: 'bus', icon: MaterialCommunityIcons, iconName: 'bus-side' },
        { name: 'accounts', icon: FontAwesome5, iconName: 'user-alt' },
      ].map(({ name, icon: Icon, iconName }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className={`items-center justify-center p-1 rounded-full  ${
                  focused ? 'bg-[#2B6128]' : 'bg-transparent'
                }`}
                style={{
                  width: 60, // Ensures proper size
                  height: 60, // Ensures proper size
                }}
              >
                <Icon name={iconName} size={28} color={focused ? 'white' : '#2B6128'} />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
