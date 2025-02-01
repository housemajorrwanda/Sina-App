import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const categories = [
  { name: 'Salad', items: [
    { id: '1', name: 'Vegan mix vegetables', image: require('../../assets/images/Logo.png') },
    { id: '2', name: 'Caesar Salad', image: require('../../assets/images/Logo.png') },
  ] },
  { name: 'Desserts', items: [
    { id: '3', name: 'Chocolate Cake', image: require('../../assets/images/Logo.png') },
    { id: '4', name: 'Fruit Salad', image: require('../../assets/images/Logo.png')  },
  ] },
  { name: 'Soups', items: [
    { id: '5', name: 'Tomato Soup', image: require('../../assets/images/Logo.png')  },
    { id: '6', name: 'Pumpkin Soup', image: require('../../assets/images/Logo.png')  },
  ] },
  { name: 'Drinks', items: [
    { id: '7', name: 'Orange Juice', image: require('../../assets/images/Logo.png')  },
    { id: '8', name: 'Smoothie', image: require('../../assets/images/Logo.png')  },
  ] },
  { name: 'Breakfast', items: [
    { id: '9', name: 'Pancakes', image: require('../../assets/images/Logo.png')  },
    { id: '10', name: 'Omelette', image: require('../../assets/images/Logo.png')  },
  ] },
  { name: 'Lunch', items: [
    { id: '11', name: 'Grilled Chicken', image: require('../../assets/images/Logo.png') },
    { id: '12', name: 'Rice & Beans', image: require('../../assets/images/Logo.png') },
  ] },
  { name: 'Supper', items: [
    { id: '13', name: 'Steak', image: require('../../assets/images/Logo.png')  },
    { id: '14', name: 'Vegetable Stir-fry', image: require('../../assets/images/Logo.png')  },
  ] },
];

export default function MealPlanScreen() {
  const [expandedCategories, setExpandedCategories] = useState(['Salad']);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <View className="flex-1 bg-white px-4 py-2">
      <View className="flex-row items-center justify-between mb-4">
        <Feather name="settings" size={24} color="green" />
        <TextInput
          placeholder="Search Recipes"
          className="flex-1 ml-4 p-2 bg-gray-100 rounded-lg"
        />
        <FontAwesome name="bell" size={24} color="green" className="ml-4" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(({ name, items }) => (
          <View key={name} className="mb-2">
            <TouchableOpacity onPress={() => toggleCategory(name)}>
              <View className="flex-row justify-between items-center border-b pb-2">
                <Text className="text-lg font-semibold text-green-800">{name}</Text>
                <Feather name={expandedCategories.includes(name) ? 'chevron-up' : 'chevron-down'} size={20} color="green" />
              </View>
            </TouchableOpacity>
            {expandedCategories.includes(name) && (
              <FlatList
                horizontal
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="m-2 items-center">
                    <Image source={item.image} className="w-24 h-24 rounded-lg" />
                    <Text className="text-sm mt-1">{item.name}</Text>
                    <TouchableOpacity className="bg-green-700 px-4 py-1 rounded mt-1">
                      <Text className="text-white">Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity className="bg-green-700 py-3 rounded-full mt-4" onPress={() => router.push('/screen/LoginScreen')}>
        <Text className="text-white text-center font-bold">Check Out</Text>
      </TouchableOpacity>
 
    </View>
  );
}
