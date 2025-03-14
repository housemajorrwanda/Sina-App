import { View, TextInput } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface InputFieldProps {
  iconName: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  className?: string;
  value: string; // The value of the input field
  onChangeValue: (text: string) => void; // Function to handle changes in input
}

const Input: React.FC<InputFieldProps> = ({ 
  iconName, 
  placeholder, 
  keyboardType = "default", 
  secureTextEntry, 
  className, 
  value, 
  onChangeValue 
}) => {
  const IconComponent = iconName === "email" ? MaterialIcons : FontAwesome;

  return (
    <View className={`flex-row items-center bg-white pl-4 p-2 rounded-2xl ${className}`}>
      {/* @ts-ignore */}
      <IconComponent name={iconName} size={24} color="gray" />
      <TextInput
        className="ml-3 flex-1 text-gray-700"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="gray"
        value={value} // Bind the input value
        onChangeText={onChangeValue} // Handle text change
      />
    </View>
  );
};

export default Input;
