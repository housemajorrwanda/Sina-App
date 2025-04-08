import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  Linking,
  Alert,
  ActivityIndicator
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Filter from "@/assets/images/Filter.svg";
import Bell from "@/assets/images/Bell.svg";
import Search from "@/assets/images/search4.svg";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { changeProfile, fetchChatRooms } from "@/app/store/slice/ChatSlice";
import { Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";
// import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
const AllChat = () => {
  const inset = useSafeAreaInsets();
  const router=useRouter()
  const user = useSelector((state: any) => state?.login?.user);
  const [is_loading,setIsLoading]=useState(false)
  // console.log(user?.user_data);
  const dispatch = useDispatch<AppDispatch>();
  useFocusEffect(
    useCallback(() => {
      const fetchRooms = () => {
        dispatch(fetchChatRooms());
      };
  
      fetchRooms(); // Fetch immediately when the screen is focused
      const interval = setInterval(fetchRooms, 10000);
  
      return () => clearInterval(interval); // Clear interval when navigating away
    }, [dispatch])
  );
  const rooms = useSelector((state: any) => state?.chat?.chatRooms);
  // console.log("Chat Rooms", rooms);
  useEffect(()=>{
    if(rooms?.length < 1){
      setIsLoading(true)
    }else{
      setIsLoading(false)
    }
  },[])
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    const isToday = date.toDateString() === now.toDateString();
    
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
    }
  };
  const handleChangeProfile = async (item: any) => {
    if (!item?.id || !item?.client_data) return;
  
    await dispatch(changeProfile(item.client_data));
  
    router.push({
      pathname: `/(tabs)/(Bus)/(Chat)/${item.id}`,
      params: { chatRoomId: item.id }, // ✅ Correct way to pass parameters
    });
  };
 

  
  const renderRooms = (item: any) => {
    // console.log(item);
    return (
      <TouchableOpacity onPress={()=>handleChangeProfile(item)} className="my-1 flex flex-row items-center justify-between">
        {/* Profile */}
        <View className="flex flex-row items-center gap-x-2">
          {item?.client_data?.profile ? (
            <Avatar.Image source={{ uri: item?.client_data?.profile }} />
          ) : (
            <Avatar.Text
              label={item?.client_data?.full_name?.slice(0, 2)}
            />
          )}
          {/* Names and last message */}
          <View className="flex flex-col">
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-xl font-bold text-secondary">{item?.client_data?.full_name|| item?.client_data?.phone_number}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className="">{item?.last_message_details?.message|| ""}</Text>
          </View>
        </View>
        {/* Chat Time and unread */}
        <View className="flex flex-col items-end">
          <Text className="text-sm text-gray-400">{formatTimestamp(item?.updated_at)}</Text>
          {item?.unread_messages_count>0 &&<View className="rounded-full min-w-7 min-h-7 px-1 flex-flex-col items-center justify-center bg-secondary">
            <Text className="text-third">{item?.unread_messages_count>0 && item?.unread_messages_count}</Text>
          </View>}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 bg-secondary " style={{ paddingTop: inset.top }}>
      <View className="w-[95%] mx-auto flex flex-col">
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity className="w-12 h-12 flex flex-col items-center justify-center rounded-full bg-[#D9D9D9]">
            <Filter />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 flex flex-col items-center justify-center rounded-full bg-[#D9D9D9]">
            <Bell />
          </TouchableOpacity>
        </View>
        <View className="mx-3 flex flex-row my-4 items-center gap-x-5">
          <View className="w-[20vw] h-[20vw] rounded-full ">
            <Image
              source={{ uri: user?.user_data?.profile }}
              className="w-24 h-24 rounded-full border border-third"
            />
          </View>
          <View className="flex flex-col text-center items-center">
            <Text className="text-white text-2xl font-bold mb-3">
              {user?.user_data?.full_name}
            </Text>
            <Text className="text-white">{user?.user_data?.email}</Text>
            <Text className="text-white">{user?.user_data?.phone_number}</Text>
          </View>
        </View>
      </View>
      <View className="bg-white flex-1 rounded-t-[3rem] py-4 flex flex-col">
        <View className="w-[90%] mx-auto flex flex-col">
          {is_loading && <ActivityIndicator color='#2B6128' size='large' />}
          <Text className="text-3xl font-bold">Messages</Text>
          <View
            style={{
              shadowColor: "#2B6128",
              shadowOffset: { width: 0, height: 3 }, // Only shadow on the bottom
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation:8,
              backgroundColor:'white'
            }}
            className={`flex flex-row gap-x-2 items-center my-1 ${Platform.OS=='ios'?'py-3 px-4':'py-1 px-4'} rounded-full bg-white px-2 shadow-lg shadow-t-0 shadow-b-0 z-2 elevation-5 shadow-secondary `}
          >
            <TouchableOpacity className="">
              <Search  />
            </TouchableOpacity>
            <TextInput className="flex-1 " />
            <TouchableOpacity>
              <Filter />
            </TouchableOpacity>
          </View>
          <FlatList
            className="my-4"
            data={rooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderRooms(item)}
          />
        </View>
      </View>
    </View>
  );
};
export default AllChat;
