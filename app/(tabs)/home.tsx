import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome, Feather, FontAwesome5, Octicons, FontAwesome6, AntDesign, Foundation } from "@expo/vector-icons";

// @ts-ignore

import Student from '../../assets/images/student.webp';

const HomeScreen = () => {
  const categories = [
    { name: 'Alimentation', image: require('../../assets/images/alima.webp') },
    { name: 'Restaurant', image: require('../../assets/images/restaurant.jpeg') },
    { name: 'Grilled Meal', image: require('../../assets/images/meat.jpeg') },
    { name: 'Coffee', image: require('../../assets/images/coffee.jpeg') },
    { name: 'Ice Cream', image: require('../../assets/images/ice.jpeg') },
  ];
  const productsData = {
    "Milk Products": [
      { id: 1, name: "Akawe", price: "500 Rwf", delivery: "Pick&Go", image: require("../../assets/images/akabanga.jpg") },
      { id: 2, name: "Akawe", price: "500 Rwf", delivery: "10 mins", image: require("../../assets/images/akanoza.jpg") },
      { id: 3, name: "Akawe", price: "500 Rwf", delivery: "Pick&Go", image: require("../../assets/images/amazi.jpg") },
    ],
    "Drinks & Alcohol": [
      { id: 4, name: "Akawe", price: "500 Rwf", delivery: "Pick&Go", image: require("../../assets/images/amata.jpg") },
      { id: 5, name: "Akawe", price: "500 Rwf", delivery: "20 mins", image: require("../../assets/images/juice.jpg") },
      { id: 6, name: "Akawe", price: "500 Rwf", delivery: "Pick&Go", image: require("../../assets/images/amazi.jpg") },
    ],
  };


  const [isSeeAll, setIsSeeAll] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(categories);

  const handleSeeAll = () => {
    setIsSeeAll(true);
    // setDisplayedProducts(allProducts);
  };

  return (
    <View className="flex-1 bg-white">
      {isSeeAll ? 
( 
  
  <ScrollView className="flex-1">
          <View className="flex-row items-center justify-between mx-4 mt-10">
      <View className='bg-gray-300 p-2 rounded-full'>
<FontAwesome6 name="sliders" size={24} color="#2B6128" />

</View>
<View className='bg-gray-300 p-2 rounded-full'>
<FontAwesome name="bell" size={24} color="green" />


</View>

      </View>
    
  {/* Header Section */}
  <View className="relative m-4 rounded-2xl h-48 bg-black">
    <Image
      source={require('../../assets/images/coffee.jpeg')}
      className="absolute w-full h-full opacity-50"
    />
    <View className="absolute top-10 left-5  ">

      <View className="ml-3">
        <Text className="text-white text-lg font-bold">Good Morning, Richard</Text>
        <Text className="text-white text-sm">Kigali - Musanze</Text>
      </View>
      <TouchableOpacity className="bg-secondary p-2 rounded-full mx-2 mt-3 flex items-center">
      <Text className="text-white font-semiBold">Order Now</Text>
    </TouchableOpacity>
    </View>
  </View>

  {/* Search Bar */}
  <View className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4 border-b-4 border-l border-r border-secondary">
<Octicons name="search" size={24} color="black" />
<TextInput placeholder="Search Products" className="text-secondary flex-1 px-3" />
<FontAwesome6 name="sliders" size={24} color="#2B6128" />
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 flex-row">
      {categories.map((category, index) => (
        <View key={index} className="items-center">
          <TouchableOpacity className="bg-white rounded-full p-4  mx-4 border-b-4 border-l border-r border-secondary">
          <Text className="text-secondary text-center text-sm font-semibold">{category.name}</Text>

          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>

  {/* Special Order Button */}
  <View className="flex-row items-center justify-between mx-6">

  </View>

  {/* Categories */}


  {/* Products Sections */}
  {Object.entries(productsData).map(([section, products]) => (
  <View key={section} className="mt-5 px-2">
<View className="flex-row items-center justify-between px-4">


</View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
      {products.map((product) => (
        <View key={product.id} className="relative w-36 h-34 bg-third p-3 rounded-3xl mx-2">
          {/* Product Image */}
          <Image source={product.image} className="w-16 h-16 mx-auto rounded-full" />

          {/* Product Name */}
          <Text className="text-secondary font-bold text-center mt-2">{product.name}</Text>

          {/* Price */}
<View className="flex-row items-center justify-between ">
<Text className="text-secondary text-sm text-center font-semibold">{product.price}</Text>

{/* Delivery Time */}
<Text className="text-secondary text-xs text-center">{product.delivery}</Text>
</View>

          {/* Floating Add Button */}


          <TouchableOpacity className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center">
          <Foundation name="plus" size={20} color="white" />

          </TouchableOpacity>
        </View>

      ))}
    </ScrollView>
  </View>
))}

</ScrollView>
  
)
: (  
  <ScrollView className="flex-1">
  {/* Header Section */}
  <View className="relative w-full h-48 bg-black">
    <Image
      source={require('../../assets/images/back.jpeg')}
      className="absolute w-full h-full opacity-50"
    />
    <View className="absolute top-10 left-5 flex-row items-center">
      <Image source={Student} className="w-24 h-24 rounded-full" />
      <View className="ml-3">
        <Text className="text-white text-lg font-bold">Good Morning, Richard</Text>
        <Text className="text-white text-sm">Kigali - Musanze</Text>
      </View>
    </View>
  </View>

  {/* Search Bar */}
  <View className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4 border-b-4 border-l border-r border-secondary">
<Octicons name="search" size={24} color="black" />
<TextInput placeholder="Search Products" className="text-secondary flex-1 px-3" />
<FontAwesome6 name="sliders" size={24} color="#2B6128" />
</View>


  {/* Special Order Button */}
  <View className="flex-row items-center justify-between mx-6">
    <TouchableOpacity className="bg-secondary p-2 rounded-full mx-2 mt-3 flex items-center">
      <Text className="text-white font-semiBold">Special Order</Text>
    </TouchableOpacity>
    <FontAwesome5 name="shopping-cart" size={24} color="#2B6128" />
  </View>

  {/* Categories */}
  <View className="mt-6 px-2">
    <View className="flex-row items-center justify-between mx-6">
      <Text className="text-secondary text-lg font-bold">Categories</Text>
                   
      <TouchableOpacity onPress={handleSeeAll}>
          <Text className="text-lg text-secondary font-bold">See all</Text>
        </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 flex-row">
      {categories.map((category, index) => (
        <View key={index} className="items-center">
          <TouchableOpacity className="w-40 h-40 bg-gray-200 rounded-3xl shadow-md mx-2 overflow-hidden relative">
            <Image source={category.image} className="absolute top-0 left-0 w-full h-full" />
          </TouchableOpacity>
          <Text className="text-secondary text-center mt-2 text-sm font-semibold">{category.name}</Text>
        </View>
      ))}
    </ScrollView>
  </View>

  {/* Products Sections */}
  {Object.entries(productsData).map(([section, products]) => (
  <View key={section} className="mt-5 px-2">
<View className="flex-row items-center justify-between px-4">
<View className="h-0.5 w-64 bg-secondary my-4" />
<Text className="text-secondary text-lg font-bold">{section}</Text>

</View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
      {products.map((product) => (
        <View key={product.id} className="relative w-36 h-34 bg-third p-3 rounded-3xl mx-2">
          {/* Product Image */}
          <Image source={product.image} className="w-16 h-16 mx-auto rounded-full" />

          {/* Product Name */}
          <Text className="text-secondary font-bold text-center mt-2">{product.name}</Text>

          {/* Price */}
<View className="flex-row items-center justify-between ">
<Text className="text-secondary text-sm text-center font-semibold">{product.price}</Text>

{/* Delivery Time */}
<Text className="text-secondary text-xs text-center">{product.delivery}</Text>
</View>

          {/* Floating Add Button */}


          <TouchableOpacity className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center">
          <Foundation name="plus" size={20} color="white" />

          </TouchableOpacity>
        </View>

      ))}
    </ScrollView>
  </View>
))}

</ScrollView>
)}

    </View>
  );
};

export default HomeScreen;
