import React,{useState} from 'react';
import { Modal, Text, View,TouchableWithoutFeedback } from "react-native";
import Tabs from "../components/TabView";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Payment = ({modal_status,onRequestClose}:any) => {
  const insets = useSafeAreaInsets();
  const [visible,setVisible]=useState(modal_status || false)
  return (
    <Modal animationType='slide' className="flex-1 bg-white" visible={modal_status || visible} onRequestClose={onRequestClose} >
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
