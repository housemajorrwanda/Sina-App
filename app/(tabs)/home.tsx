import React from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome, Feather, FontAwesome5, Octicons, FontAwesome6 } from "@expo/vector-icons";

const HomeScreen = () => {
  return (


    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="relative w-full h-48 bg-black">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="absolute w-full h-full opacity-50"
          />
          <View className="absolute top-10 left-5 flex-row items-center">
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-white text-lg font-bold">Good Morning, Richard</Text>
              <Text className="text-white text-sm">Kigali - Musanze</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-5 mt-3 flex-row items-center bg-gray-100 rounded-full py-2 mx-4">
          <Octicons name="search" size={24} color="black" />
          <TextInput placeholder="Search Products" className="flex-1 px-3" />
          <FontAwesome6 name="sliders" size={24} color="#2B6128" />
        </View>

        {/* Special Order Button */}
<View className="flex-row items-center justify-between mx-6">
<TouchableOpacity className="bg-secondary p-3 rounded-full mx-2 mt-3 flex items-center">
          <Text className="text-white font-bold">Special Order</Text>
        </TouchableOpacity>
       
        <FontAwesome5 name="shopping-cart" size={24} color="#2B6128" />
</View>

        {/* Categories */}
        <View className="mt-6">
          <View className="flex-row items-center justify-between mx-6">
          <Text className="text-lg font-bold">Categories</Text>
          <Text className="text-lg text-secondary font-bold"> See all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 flex-row">
            {['Alimentation', 'Restaurant', 'Grilled Meal','Coffee','Ice Crem'].map((category) => (
              <TouchableOpacity key={category} className="w-24 h-24 bg-gray-200 rounded-lg p-2 shadow-md mx-2">
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }}
                  className="w-full h-16 rounded"
                />
                <Text className="text-center mt-2 text-sm font-semibold">{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Sections */}
        {['Milk Products', 'Drinks & Alcohol'].map((section) => (
          <View key={section} className="mt-5 px-5">
            <Text className="text-lg font-bold">{section}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
              {[1, 2, 3].map((item) => (
                <View key={item} className="w-32 h-40 bg-yellow-400 p-3 rounded-lg mx-2">
                  <Text className="text-white font-bold text-center">Akawe</Text>
                  <Text className="text-white text-sm text-center">500 Rwf</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

    </View>

  );
};

export default HomeScreen;
