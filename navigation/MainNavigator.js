import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import MainFlow from "./MainFlow";

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
      <MainStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Welcome"}
      >
        <MainStack.Screen name={"Welcome"} component={Welcome} />
        <MainStack.Screen name={"MainFlow"} component={MainFlow} />
      </MainStack.Navigator>
  );
};

export default MainNavigator;