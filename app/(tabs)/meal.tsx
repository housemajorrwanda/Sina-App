import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Feather, FontAwesome, FontAwesome6, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const categories = [
  { name: 'Salad', items: [
    { id: '1', name: 'Vegan mix vegetables', image: require('../../assets/images/salad.jpeg') },
    { id: '2', name: 'Caesar Salad', image: require('../../assets/images/salad.jpeg') },
    { id: '3', name: 'Caesar Salad', image: require('../../assets/images/salad.jpeg') },

  ] },
  { name: 'Desserts', items: [
    { id: '4', name: 'Chocolate Cake', image: require('../../assets/images/salad.jpeg') },
    { id: '5', name: 'Fruit Salad', image: require('../../assets/images/salad.jpeg')  },
  ] },
  { name: 'Soups', items: [
    { id: '6', name: 'Tomato Soup', image: require('../../assets/images/salad.jpeg')  },
    { id: '7', name: 'Pumpkin Soup', image: require('../../assets/images/salad.jpeg')  },
  ] },
  { name: 'Drinks', items: [
    { id: '8', name: 'Orange Juice', image: require('../../assets/images/salad.jpeg')  },
    { id: '9', name: 'Smoothie', image: require('../../assets/images/salad.jpeg')  },
  ] },
  { name: 'Breakfast', items: [
    { id: '10', name: 'Pancakes', image: require('../../assets/images/salad.jpeg')  },
    { id: '11', name: 'Omelette', image: require('../../assets/images/salad.jpeg')  },
  ] },
  { name: 'Lunch', items: [
    { id: '12', name: 'Grilled Chicken', image: require('../../assets/images/salad.jpeg') },
    { id: '13', name: 'Rice & Beans', image: require('../../assets/images/salad.jpeg') },
  ] },
  { name: 'Supper', items: [
    { id: '14', name: 'Steak', image: require('../../assets/images/salad.jpeg')  },
    { id: '15', name: 'Vegetable Stir-fry', image: require('../../assets/images/salad.jpeg')  },
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
      <View className="flex-row items-center justify-between mt-10">
      <View className='bg-gray-300 p-2 rounded-full'>
<FontAwesome6 name="sliders" size={24} color="#2B6128" />

</View>
<View className='bg-gray-300 p-2 rounded-full'>
<FontAwesome name="bell" size={24} color="green" />


</View>

      </View>
      <View className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4  mb-3 border-b-4 border-l border-r border-secondary">
  <Octicons name="search" size={24} color="black" />
  <TextInput placeholder="Search Products" className="text-secondary flex-1 px-3" />
  <FontAwesome6 name="sliders" size={24} color="#2B6128" />
</View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(({ name, items }) => (
          <View key={name} className="mb-2">
            <TouchableOpacity onPress={() => toggleCategory(name)}>
              <View className="flex-row justify-between items-center border-b pb-2">
                <Text className="text-2xl font-semibold text-green-800">{name}</Text>
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
                    <Image source={item.image} className="w-24 h-24 rounded-2xl" />
                    <Text className="text-sm text-center mt-1">{item.name}</Text>
                    <TouchableOpacity className="bg-secondary px-4 py-1 rounded-full mt-1">
                      <Text className="text-white">Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity className="bg-secondary px-3 py-3 rounded-full" onPress={() => router.push('/screen/LoginScreen')}>
        <Text className="text-white text-2xl text-center font-bold">Check Out</Text>
      </TouchableOpacity>
 
    </View>
  );
}
