import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack initialRouteName="accounts" screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="accounts" />
        {/* <Stack.Screen name="(Chat)" /> */}
        
    </Stack>
}
export default Layout;