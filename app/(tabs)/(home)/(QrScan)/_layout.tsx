import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack initialRouteName="index" screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="index" />
        {/* <Stack.Screen name="[id]" /> */}
        
    </Stack>
}
export default Layout;