import { Text, TextProps } from "react-native";

export default function GlobalText(props: TextProps) {
  return <Text {...props} style={[{ fontFamily: "Akshar_400Regular" }, props.style]} />;
}
