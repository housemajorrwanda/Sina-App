import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  FontAwesome,
  Feather,
  FontAwesome5,
  Octicons,
  FontAwesome6,
  AntDesign,
  Foundation,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import LocationScreen from "../../components/LocatingUser";
import * as LocalAuthentication from 'expo-local-authentication';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
// @ts-ignore

// import Student from "../../assets/images/student.webp";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import {
  GetCategories,
  GetProducts,
  GetShopCategories,
  GetCategoryProducts
} from "../../store/slice/ProductSlice";
import { addToCart,removeFromCart } from "../../store/slice/cartSlice";
import GlobalText from "@/app/GlobalText";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user=useSelector((state: any) => state?.login?.user);
  const router=useRouter()
  // console.log("logged in user",user)
  const productCategories = useSelector(
    (state: any) => state?.products?.categories
  );
  // const cartState=useSelector((state: any) => state?.)
  const products = useSelector((state: any) => state?.products?.products);

  const ShopCategories = useSelector(
    (state: any) => state?.products?.shopCategories
  );

  // console.log(productCategories);
  // console.log(products);
  // console.log(ShopCategories);
  useEffect(() => {
    getProductCategoriesFunction();
    getShopCategories();
    getProducts();
  }, []);
  //Fetching Products Categories
  const getProductCategoriesFunction = async () => {
    const result = await dispatch(GetCategories());

    if (GetCategories.rejected.match(result)) {
      console.error("Failed to fetch categories: ", result);
    }
  };
  //Getting Categories
  const getShopCategories = async () => {
    const result = await dispatch(GetShopCategories());
    if (GetShopCategories.rejected.match(result)) {
      console.error("Failed to fetch shop categories: ", result);
    }
  };
  //Getting All Products
  const getProducts = async () => {
    const result = await dispatch(GetProducts());
    if (GetProducts.rejected.match(result)) {
      console.error("Failed to fetch products: ", result);
    }
  };
  const getCategoryProducts = async (category_id:string) => {
    setSelectedCategory(category_id);
    const result = await dispatch(
      GetCategoryProducts({ id: category_id })
    );
    // console.log("product selected",result?.payload)
    if (GetProducts.rejected.match(result)) {
      console.error("Failed to fetch products: ", result);
    }
  };
  
  const cartState=useSelector((state:any)=>state.cart?.products)
  const cartCheck=(id:any)=>{
    const existingProduct = cartState.find((p:any) => p.id === id);
    return existingProduct? true : false;
  }
  console.log("Cart ",cartState)
  const time = new Date().getHours();
  let greetings;
  if (time < 12) {
    greetings = "Good Morning";
  } else if (time < 18) {
    greetings = "Good Afternoon";
  } else {
    greetings = "Good Evining";
  }
  const [isSeeAll, setIsSeeAll] = useState(false);
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("Food menu");

  const handleSeeAll = () => {
    setIsSeeAll(true);
  };

  const handleCategoryPressed=(category:any)=>{
    console.log(category);
    router.push(`/(home)/${category.id}`)
    
  }
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {isSeeAll ? (
        <ScrollView className="flex-1">
          <View className="flex-row items-center justify-between mx-4">
            <TouchableOpacity onPress={()=>setIsSeeAll(false)} className="bg-gray-300 p-2 rounded-full">
              {/* <FontAwesome6 name="sliders" size={24} color="#2B6128" /> */}
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View className="items-center">
              <Text>Current Location</Text>
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="#2B6128"
                />
                <LocationScreen />
              </View>
            </View>
            <TouchableOpacity className="bg-gray-300 p-2 rounded-full">
              <FontAwesome name="bell" size={24} color="green" />
            </TouchableOpacity>
          </View>

          {/* Header Section */}
          <View className="relative m-4 rounded-3xl h-48 bg-black">
            <Image
              source={require("../../../assets/images/coffee.jpeg")}
              className="absolute w-full h-full  rounded-3xl "
            />
            <View className="absolute top-10 left-5  ">
              <View className="ml-3">
                <Text className="text-white text-lg font-bold">
                  Enjoy our special
                </Text>
                <Text className="text-white text-lg font-bold">Coffee</Text>
                <Text className="text-white text-sm">Best to order</Text>
                <Text className="text-white text-sm">before 10 mins</Text>
              </View>
              <TouchableOpacity className="bg-secondary p-2 rounded-full mx-2 mt-3 flex items-center">
                <Text className="text-white font-semiBold">Order Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4 border-b-4 border-l border-r border-secondary">
            <Octicons name="search" size={24} color="black" />
            <TextInput
              placeholder="Search Products"
              placeholderTextColor="#2B6128"
              className="text-secondary flex-1 px-3"
            />
            <FontAwesome6 name="sliders" size={24} color="#2B6128" />
          </View>

          {/* Special Order Button */}
          <View className="flex-row items-center justify-between mx-6"></View>

          {/* Categories */}

          {/* Products Sections */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 px-4"
          >
            {productCategories.map((category: any) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => {
                   getCategoryProducts(category.id);
                }}
                className={`px-4 py-2 mx-2 rounded-full border-b-4 border-l border-r border-secondary ${
                  selectedCategory === category?.id
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary"
                }`}
              >
                <Text
                  className={
                    selectedCategory === category?.id
                      ? "text-white font-bold"
                      : "text-black"
                  }
                >
                  {category?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="mt-5  flex-1 flex flex-col w-[95%] mx-auto">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-3"
            >
              <FlatList
                // @ts-ignore

                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3} // Ensure 3 items per row
                showsVerticalScrollIndicator={false}
                renderItem={(product:any)=>{
                  console.log(product?.item?.thumbnail)
                  return(
                    <View key={product.id} className=" p-2">
                    <View className="relative bg-third p-3 rounded-3xl">
                      <Image
                        source={{uri:product?.item?.thumbnail}}
                        className="w-16 h-16 mx-auto rounded-full"
                      />
                      <Text className="text-secondary font-bold text-center mt-2">
                        {product?.item?.name}
                      </Text>
                      <View className="flex-row items-center justify-between">
                        <GlobalText className="text-secondary text-sm font-semibold">
                          {product?.item?.price}
                        </GlobalText>
                        <Text className="text-secondary text-xs">
                          {product?.item?.is_pick_and_go?"Pick&GO":product?.item?.delivery}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={()=>{dispatch(addToCart({product,quantity:1}))}} className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center">
                        <Foundation name="plus" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  )
                }}
              />
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="flex-1">
          {/* Header Section */}
          <View className="relative w-full h-48 bg-black">
            <Image
              source={require("../../../assets/images/back.jpeg")}
              className="absolute w-full h-full opacity-50"
            />
            <View className="absolute top-10 left-5 flex-row items-center">
              <Image source={{uri:user?.user_data?.profile}} className="w-24 h-24 rounded-full border border-secondary" />
              <View className="ml-3">
                <GlobalText className="text-white text-lg font-bold">
                  {greetings}, {user?.user_data?.full_name ||user?.user_data?.phone_number || 'Anonymous'}
                </GlobalText>
                {/* <Text className="text-white text-sm">Kigali - Musanze</Text> */}
                <LocationScreen />
              </View>
            </View>
          </View>

          {/* Search Bar */}
          <View className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4 border-b-4 border-l border-r border-secondary">
            <Octicons name="search" size={24} color="black" />
            <TextInput
              placeholder="Search Products"
              placeholderTextColor="#2B6128"
              className="text-secondary flex-1 px-3"
            />
            <FontAwesome6 name="sliders" size={24} color="#2B6128" />
          </View>

          {/* Special Order Button */}
          <View className="flex-row items-center justify-between mx-6">
            <TouchableOpacity
              className="bg-secondary p-2 rounded-full mx-2 mt-3 flex items-center"
              onPress={() => router.push("meal")}
            >
              <Text className="text-white font-semiBold">Special Order</Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative flex flex-col " onPress={() => router.push("(cart)")}>
              <View className="absolute -top-3 -right-3 bg-third w-5 h-5 flex flex-col items-center justify-center rounded-full z-10">
              <Text className="text-xs ">{cartState?.length}</Text>
              </View>
              <FontAwesome5 name="shopping-cart" size={24} color="#2B6128" />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <View className="mt-6 px-2">
            <View className="flex-row items-center justify-between mx-6">
              <Text className="text-secondary text-lg font-bold">
                Categories
              </Text>

              <TouchableOpacity onPress={handleSeeAll}>
                <Text className="text-lg text-secondary font-bold">
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-3 flex-row"
            >
              {ShopCategories.map(
                (
                  category: { title: string; thumbnail: any,id:any },
                  index: number
                ) => (
                  <View key={index} className="items-center">
                    <TouchableOpacity onPress={()=>handleCategoryPressed(category)} className="w-40 h-40 bg-gray-200 rounded-3xl shadow-md mx-2 overflow-hidden relative">
                      <Image
                        source={{ uri: category.thumbnail }}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </TouchableOpacity>
                    <Text className="text-secondary text-center mt-2 text-sm font-semibold">
                      {category.title}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
          </View>

          {/* Products Sections */}
          {productCategories.map((category: any, index: number) => (
            <View key={index} className="mt-5 px-2">
              <View className="flex-row items-center justify-between px-4">
                <View className="h-0.5 w-64 bg-secondary my-4" />
                <Text className="text-secondary text-lg font-bold">
                  {category?.name}
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-3"
              >
                {category?.products?.map((product: any, index: number) => (
                  <View
                    key={index}
                    className="relative w-36 h-34 bg-third p-3 rounded-3xl mx-2"
                  >
                    {/* Product Image */}
                    <Image
                      source={{ uri: product.thumbnail }}
                      className="w-16 h-16 mx-auto rounded-full"
                    />

                    {/* Product Name */}
                    <Text className="text-secondary font-bold text-center mt-2">
                      {product.name}
                    </Text>

                    {/* Price */}
                    <View className="flex-row items-center justify-between ">
                      <Text className="text-secondary text-sm text-center font-semibold">
                        {product.price}
                      </Text>

                      {/* Delivery Time */}
                      <Text className="text-secondary text-xs text-center">
                        {product.delivery || "15min"}
                      </Text>
                    </View>

                    {/* Floating Add Button */}
                    {cartCheck(product.id)?<TouchableOpacity onPress={()=>{dispatch(removeFromCart({product,quantity:1}))}} className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center">
                    <AntDesign name="minus" size={20} color="white" />
                    </TouchableOpacity>:<TouchableOpacity onPress={()=>{dispatch(addToCart({product,quantity:1}))}} className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center">
                      <Foundation name="plus" size={20} color="white" />
                    </TouchableOpacity>}
                    
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
