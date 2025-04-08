import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";
import {
  FontAwesome,
  Feather,
  FontAwesome5,
  Octicons,
  FontAwesome6,
  AntDesign,
  Foundation,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import LocationScreen from "../../components/LocatingUser";
import * as LocalAuthentication from "expo-local-authentication";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setSearchResults } from "@/app/store/slice/searchSlice";
// import QRcode from "@/assets/images/qr-code.svg";
import QrCode from "@/assets/images/QrCode.svg";
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
import { addToCart, removeFromCart } from "../../store/slice/cartSlice";
import GlobalText from "@/app/GlobalText";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const cartState=useSelector((state: any) => state?.)
  const products = useSelector((state: any) => state?.products?.products);
  const loading = useSelector((state: any) => state?.products?.loading);
  const user = useSelector((state: any) => state?.login?.user);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const [Loading, setLoading] = useState(loading);
  // console.log("logged in user",user)
  const productCategories = useSelector(
    (state: any) => state?.products?.categories
  );

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
  const getCategoryProducts = async (category_id: string) => {
    setSelectedCategory(category_id);
    const result = await dispatch(GetCategoryProducts({ id: category_id }));
    // console.log("product selected",result?.payload)
    if (GetProducts.rejected.match(result)) {
      console.error("Failed to fetch products: ", result);
    }
  };

  const cartState = useSelector((state: any) => state.cart?.products);
  const cartCheck = (id: any) => {
    const existingProduct = cartState.find((p: any) => p.id === id);
    return existingProduct ? true : false;
  };
  console.log("Cart ", cartState);
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

  const handleCategoryPressed = (category: any) => {
    console.log(category);
    router.push(`/(home)/${category.id}`);
  };
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = () => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product: any) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  const handleSearchs = () => {
    if (searchQuery.trim() !== "") {
      setLoading(true);
      const filteredProducts = products?.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      dispatch(setSearchResults(filteredProducts));
      setLoading(false);
      router.push({
        pathname: "/search",
        params: { query: searchQuery }
      });
    }
  };
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  // console.log(user)
  return (
    <View className="flex-1 " style={{ paddingTop: insets.top }}>
      {loading && (
        <ActivityIndicator size="large" color="#F1A10C" collapsable />
      )}
      {isSeeAll ? (
        <ScrollView className="flex-1 pb-10 py-2 bg-white" stickyHeaderIndices={[4]}>
          
          <View className="flex-row items-center justify-between mx-4">
            <TouchableOpacity
              onPress={() => setIsSeeAll(false)}
              className="bg-gray-300 p-2 rounded-full"
            >
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
          <View
            className="px-5 mt-3 flex-row items-center bg-white rounded-full py-2 mx-4 z-10 my-2"
            style={{
              shadowColor: "#2B6128",
              shadowOffset: { width: 0, height: 4 }, // adds shadow only below on iOS
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: 6, // visible shadow on Android
              zIndex:10,
              backgroundColor:'white'
            }}
          >
            <TouchableOpacity onPress={() => handleSearch()}>
              <Octicons name="search" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search Products"
              placeholderTextColor="#2B6128"
              className="text-secondary flex-1 px-3"
              value={search}
              onChangeText={(text) => setSearch(text)}
              onEndEditing={() => handleSearch()}
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
            className=" px-4 py-2  w-[98%] bg-white mx-auto"
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
          <View className="mt-5 flex-1 flex w-[98%] mx-auto">
            <ScrollView>
              <View
                className="flex flex-row flex-wrap"
                style={{ paddingBottom: insets.bottom }}
              >
                {(search.trim() ? filteredProducts : products)?.map(
                  (item: any, index: number) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() =>
                        router.push(`/(tabs)/(home)/(products)/${item?.id}`)
                      }
                      className="p-1 w-[33.33%] flex flex-col "
                    >
                      {/* Ensure three columns */}
                      <View
                        style={{
                          height: Dimensions.get("screen").height * 0.19
                        }}
                        className="relative bg-[#F1A10C] items-center justify-center px-3 gap-y-2 py-3 rounded-3xl"
                      >
                        <View
                          className="rounded-full overflow-hidden items-center justify-center flex flex-col"
                          style={{
                            height: Dimensions.get("screen").height * 0.1,
                            width: Dimensions.get("screen").height * 0.1
                          }}
                        >
                          <Image
                            source={{ uri: item?.thumbnail }}
                            className="mx-auto "
                            resizeMode="cover"
                            style={{
                              height: Dimensions.get("screen").height * 0.1,
                              width: Dimensions.get("screen").height * 0.1
                            }}
                          />
                        </View>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          className="text-secondary font-bold text-center mt-2"
                        >
                          {item?.name}
                        </Text>
                        <View className="flex flex-row items-center w-[100%] justify-between">
                          <Text className="text-secondary text-xs font-semibold">
                            {item?.price?.split(".")[0]} Rwf
                          </Text>
                          <Text className="text-secondary text-xs">
                            {item?.is_pick_and_go
                              ? "Pick&GO"
                              : item?.delivery || "15 min"}
                          </Text>
                        </View>
                        {cartCheck(item.id) ? (
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(
                                removeFromCart({ product: item, quantity: 1 })
                              );
                            }}
                            className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            <AntDesign name="minus" size={20} color="white" />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(
                                addToCart({ product: item, quantity: 1 })
                              );
                            }}
                            className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            <Foundation name="plus" size={20} color="white" />
                          </TouchableOpacity>
                        )}
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
            >
              {/* Header Section */}
              <View className="relative w-full h-48 bg-black">
                <Image
                  source={require("../../../assets/images/back.jpeg")}
                  className="absolute w-full h-full opacity-50"
                />
                <View className="absolute top-10 left-5 flex-row items-center">
                  <Image
                    source={{ uri: user?.user_data?.profile }}
                    className="w-24 h-24 rounded-full border border-secondary"
                  />
                  <View className="ml-3">
                    <Text className="text-white text-lg font-bold">
                      {greetings},{" "}
                      {user?.user_data?.full_name ||
                        user?.user_data?.phone_number ||
                        "Anonymous"}
                    </Text>
                    {/* <Text className="text-white text-sm">Kigali - Musanze</Text> */}
                    <LocationScreen />
                  </View>
                </View>
              </View>

              {/* Search Bar */}
              <View style={{
              shadowColor: "#2B6128",
              shadowOffset: { width: 0, height: 4 }, // adds shadow only below on iOS
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: 6, // visible shadow on Android
              zIndex:10,
              backgroundColor:'white'
            }} className="px-5 mt-3 flex-row items-center bg-white rounded-full  py-2 mx-4 ">
                <TouchableOpacity onPress={() => handleSearchs()}>
                  <Octicons name="search" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                  placeholder="Search Products"
                  placeholderTextColor="#2B6128"
                  className="text-secondary flex-1 px-3"
                  value={searchQuery}
                  onChangeText={(text) => setsearchQuery(text)}
                  onEndEditing={() => handleSearchs()}
                />
                <FontAwesome6 name="sliders" size={24} color="#2B6128" />
              </View>
              {Loading && <ActivityIndicator size="large" color="#F1A10C" />}
              {/* Special Order Button */}
              <View className="flex-row items-center justify-between mx-6">
                <TouchableOpacity
                  className="bg-secondary p-2 rounded-full mx-2 mt-3 flex items-center"
                  onPress={() => router.push("/(tabs)/meal")}
                >
                  <Text className="text-white font-semiBold">
                    Special Order
                  </Text>
                </TouchableOpacity>

                <View className="flex flex-row items-center gap-x-4">
                  {user?.user_data?.is_staff && (
                    <TouchableOpacity
                      onPress={() => router.push("/(QrScan)")}
                      className=""
                    >
                      <QrCode />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    className="relative flex flex-col "
                    onPress={() => router.push("/(cart)")}
                  >
                    <View className="absolute -top-3 -right-3 bg-third w-5 h-5 flex flex-col items-center justify-center rounded-full z-10">
                      <Text className="text-xs ">{cartState?.length}</Text>
                    </View>
                    <FontAwesome5
                      name="shopping-cart"
                      size={24}
                      color="#2B6128"
                    />
                  </TouchableOpacity>
                </View>
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
                  {ShopCategories?.map(
                    (
                      category: { title: string; thumbnail: any; id: any },
                      index: number
                    ) => (
                      <View key={index} className="items-center">
                        <TouchableOpacity
                          onPress={() => handleCategoryPressed(category)}
                          className="w-40 h-40 bg-gray-200 rounded-3xl shadow-md mx-2 overflow-hidden relative"
                        >
                          <Image
                            source={{ uri: category.thumbnail }}
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </TouchableOpacity>
                        <Text className="text-secondary text-center mt-2 text-sm font-semibold">
                          {category?.title}
                        </Text>
                      </View>
                    )
                  )}
                </ScrollView>
              </View>

              {/* Products Sections */}
              {!productCategories ? (
                <ActivityIndicator size="large" color="#F1A10C" />
              ) : (
                productCategories?.map((category: any, index: number) => (
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
                      {category?.products?.map(
                        (product: any, index: number) => (
                          <TouchableOpacity
                            onPress={() =>
                              router.push(
                                `/(tabs)/(home)/(products)/${product.id}`
                              )
                            }
                            key={index}
                            className="relative   bg-third px-3 py-3 pt-1 pb-4 flex flex-col gap-y-1  rounded-3xl mx-2"
                            style={{
                              // height: Dimensions.get("screen").height * 0.21,
                              width: Dimensions.get("screen").width * 0.33
                            }}
                          >
                            {cartCheck(product.id) ? (
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(
                                    removeFromCart({ product, quantity: 1 })
                                  );
                                }}
                                className="self-end absolute top-2  right-1 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                              >
                                <AntDesign
                                  name="minus"
                                  size={20}
                                  color="white"
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(addToCart({ product, quantity: 1 }));
                                }}
                                className="absolute  top-2 right-1 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                              >
                                <Foundation
                                  name="plus"
                                  size={20}
                                  color="white"
                                />
                              </TouchableOpacity>
                            )}
                            {/* Product Image */}
                            <Image
                              source={{ uri: product.thumbnail }}
                              className=" mx-auto rounded-full"
                              style={{
                                height: Dimensions.get("screen").height * 0.1,
                                width: Dimensions.get("screen").height * 0.1
                              }}
                            />

                            {/* Global Name */}
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              className="text-secondary font-bold text-center mt-2"
                            >
                              {product.name}
                            </Text>

                            {/* Price */}
                            <View className="flex-row items-center justify-between ">
                              <Text className="text-secondary text-sm text-center font-semibold">
                                {product.price}
                              </Text>

                              {/* Delivery Time */}
                              <Text className="text-secondary text-xs text-center">
                                {product?.delivery ||
                                  (product?.is_pick_and_go && "Pick&Go") ||
                                  "15min"}
                              </Text>
                            </View>

                            {/* Floating Add Button */}
                          </TouchableOpacity>
                        )
                      )}
                    </ScrollView>
                  </View>
                ))
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
