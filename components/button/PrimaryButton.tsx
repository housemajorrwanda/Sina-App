import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

const PrimaryButton: React.FC<CustomButtonProps> = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity className={`w-full bg-secondary p-3 rounded-full mt-4 ${className}`} onPress={onPress}>
      <Text className="text-white text-center font-semiBold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
