import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack initialRouteName="cart" screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="cart" />
        <Stack.Screen name="[id]" />
        
    </Stack>
}
export default Layout;