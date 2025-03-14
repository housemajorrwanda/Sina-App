import React,{useState} from 'react';
import { Modal, Text, View,TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Tabs from "../components/TabView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector,useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { updatePaymentModal } from '../store/slice/cartSlice';

const Payment = () => {
  const dispatch=useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  // const [visible,setVisible]=useState(modal_status || false)
  const visible=useSelector((state:any)=>state?.cart?.paymentModal)
  return (
    <Modal animationType='slide' style={{paddingTop:insets.top}} className="flex-1 bg-white " visible={visible} onRequestClose={()=>dispatch(updatePaymentModal({isVisible:false}))} >
      <TouchableOpacity onPress={()=>dispatch(updatePaymentModal({isVisible:false}))} style={{marginTop:insets.top}} className='ml-4 my-3 bg-gray-300 flex flex-col items-center justify-center rounded-full w-12 h-12'>
        <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
      <View
        className="flex-1 flex flex-col justify-center items-center"
        style={{ backgroundColor: "rgba(204, 194, 194, 0.4)" }}
      >
        
        <TouchableWithoutFeedback>
          <View className="bg-white py-3 rounded-md px-2">
            <Tabs  />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};
export default Payment;
