import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,Alert,
  ActivityIndicator,
  BackHandler,
  
} from "react-native";
import { useState } from "react";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Octicons
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { GetfoodCategories } from "../store/slice/ProductSlice";
import { addToCart } from "../store/slice/cartSlice";


export default function MealPlanScreen() {
  const [expandedCategories, setExpandedCategories] = useState(["Salad"]);
  const insets = useSafeAreaInsets();
  const MealCategories=useSelector((state:any) => state?.products?.foodsCategories);
  const cartState=useSelector((state:any) => state?.cart?.products);
  const loading=useSelector((state:any) => state?.products?.loading);
  const dispatch = useDispatch<AppDispatch>();
  // console.log("meal categories",MealCategories)
  useEffect(()=>{
    fetchFoodCategoriesFunction();
  },[])

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        { text: "Cancel", style: "cancel", onPress: () => null },
        { text: "YES", onPress: () => router.back() },
      ]);
      return true; // Prevent default back action
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);
  const fetchFoodCategoriesFunction=async()=>{
    const result=await dispatch(GetfoodCategories());
    console.log(result);
    if(GetfoodCategories.rejected.match(result)) {
      Alert.alert("Failed to fetch food categories");
      return;
    }
  }
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <View
      className="flex-1 bg-white px-4 pb-2"
      style={{ paddingTop: insets.top }}
    >
      {loading && <ActivityIndicator size='large' collapsable  />}
      <View className="flex-row items-center justify-between pt-4 ">
        <TouchableOpacity className="bg-gray-300 p-2 rounded-full">
          <FontAwesome6 name="sliders" size={24} color="#2B6128" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-300 p-2 rounded-full">
          <FontAwesome name="bell" size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4  mb-3 border-b-4 border-l border-r border-secondary">
        <Octicons name="search" size={24} color="black" />
        <TextInput
          placeholder="Search Products"
          className="text-secondary flex-1 px-3"
        />
        <FontAwesome6 name="sliders" size={24} color="#2B6128" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {MealCategories?.map(( category:any, index:number) => (
          <View key={index} className="mb-2">
            <TouchableOpacity onPress={() => toggleCategory(category?.name)}>
              <View className="flex-row justify-between items-center border-b pb-2">
                <Text className="text-2xl font-semibold text-green-800">
                  {category?.name}
                </Text>
                <Feather
                  name={
                    expandedCategories.includes(category?.name)
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                  color="green"
                />
              </View>
            </TouchableOpacity>
            {expandedCategories.includes(category?.name) && (
              <FlatList
                horizontal
                data={category.foods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="m-2 items-center">
                    <Image
                      source={{uri:item?.thumbnail}}
                      className="w-24 h-24 rounded-2xl"
                    />
                    <Text className="text-sm text-center mt-1">
                      {item?.name}
                    </Text>
                    <TouchableOpacity onPress={()=>dispatch(addToCart({product:item,quantity:1}))} className="bg-secondary px-4 py-1 rounded-full mt-1">
                      <Text className="text-white">Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        className="bg-secondary px-3 py-3 rounded-full"
        onPress={() => router.push("(cart)")}
      >
        <Text className="text-white text-2xl text-center font-bold">
          Check Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
