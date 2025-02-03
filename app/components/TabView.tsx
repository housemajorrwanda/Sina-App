import React, { useState } from "react";
import { View, Text, useWindowDimensions, TouchableOpacity } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import MobileMoney from "./MobileMoney";
import CardPayment from "./CardPayment";
// Tab screens
const FirstTab = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>First Tab</Text>
  </View>
);

const SecondTab = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Second Tab</Text>
  </View>
);

export default function Tabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "momo", title: "Mobile Money" },
    { key: "card", title: "Debit/Credit Card" },
    { key: "paypal", title: "Paypal" },
  ]);

  // Fix: Use `renderScene` instead of `SceneMap`
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "momo":
        return <MobileMoney />;
      case "card":
        return <CardPayment />;
      case "paypal":
        return <SecondTab />;
      default:
        return null;
    }
  };

  return (
    <View style={{ alignSelf: "center", width: layout.width * 0.9, height: layout.height * 0.6 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled={true}
        animationEnabled={true}
        initialLayout={{ width: layout.width }} // Fix: Use full width
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "black" }}
            style={{ backgroundColor: "white", borderRadius: 8 }}
            renderTabBarItem={({ route }) => {
              const isActive = props.navigationState.index === props.navigationState.routes.findIndex((r) => r.key === route.key);
              return (
                <TouchableOpacity onPress={() => setIndex(props.navigationState.routes.findIndex((r) => r.key === route.key))}>
                  <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
                    <Text style={{ color: isActive ? "black" : "grey" }}>{route.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      />
    </View>
  );
}
