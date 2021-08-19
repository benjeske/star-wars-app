import React from "react";
import {
    createBottomTabNavigator,
    BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo-status-bar';
import Characters from "../screens/Characters";
import Details from "../screens/Details";
import Planets from "../screens/Planets";
import Starships from "../screens/Starships";
import Films from "../screens/Films";
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import tailwind from "tailwind-rn";

const Tab = createBottomTabNavigator();
const TabBarComponent = (props) => <BottomTabBar {...props} />;

const MainFlow = () => {
    return (
        <>
            <StatusBar style={"light"} />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    presentation: "modal",
                    animationEnabled: false,
                    showIcon: true,
                    inactiveTintColor: "gray",
                    tabBarActiveTintColor: "rgb(52, 211, 153)",
                    tabBarStyle: {
                        backgroundColor: "#1F2937"
                    }
                }}
                tabBar={(props) => (
                    <TabBarComponent
                        {...props}
                    />
                )}
            >
                <Tab.Screen
                    name={"Characters"}
                    component={Characters}
                    options={{
                        tabBarLabel: "Characters",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="people" size={24} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name={"Planets"}
                    component={Planets}
                    options={{
                        tabBarLabel: "Planets",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="planet" size={24} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name={"Starships"}
                    component={Starships}
                    options={{
                        tabBarLabel: "Starships",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="space-shuttle" size={24} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name={"Films"}
                    component={Films}
                    options={{
                        tabBarLabel: "Films",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="film" size={24} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name={"Details"}
                    component={Details}
                    options={{
                        tabBarLabel: "Details",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="group"
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default MainFlow;