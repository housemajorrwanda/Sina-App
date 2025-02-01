import { Image, StyleSheet, Platform,View,Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/button/PrimaryButton';
import Input from '@/components/input/Input';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignUpScreen';

export default function HomeScreens() {
  return (
    <View className="flex-1 bg-white">
    <SignupScreen/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
