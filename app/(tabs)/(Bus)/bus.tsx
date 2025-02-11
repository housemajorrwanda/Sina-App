import { AntDesign, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";

interface ExtraItem {
  name: string;
  price: string;
}

const extras: ExtraItem[] = [
  { name: "Peanuts Butter", price: "2000 Rwf" },
  { name: "Salad", price: "3500 Rwf" },
  { name: "Spices", price: "300 Rwf" },
];

const MenuDetailsScreen: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(2);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheckbox = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
<View className="flex flex-col flex-1 items-center justify-center">
  <Text className="text-white">hello world</Text>
</View>
  );
};

export default MenuDetailsScreen;
