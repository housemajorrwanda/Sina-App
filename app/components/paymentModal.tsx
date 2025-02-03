import React,{useState} from 'react';
import { Image, StyleSheet, Platform,View,Text, TouchableOpacity} from 'react-native';
import Payment from '../(pages)/payment';
export default function HomeScreen() {
  const [payment,SetPayment]=useState(false);
  return (
    <View className='h-screen flex flex-col items-center justify-center'>
      <Text className='text-white font-bold text-2git initxl'>Sina app</Text>
      <TouchableOpacity onPress={()=>SetPayment(true) } className='w-fit px-4 py-3 rounded-full bg-pomme_green'>
        <Text className='text-white font-bold'>CheckOut</Text>
      </TouchableOpacity>
      {payment && <Payment modal_status={true} onRequestClose={()=>SetPayment(false)} />}
    </View>
  );
}


