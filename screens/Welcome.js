import React from "react";
import { View, ImageBackground } from "react-native";
import Logo from "../components/UI/Logo";
import Button from "../components/UI/Button";
import tailwind from "tailwind-rn";
import splash from "../assets/splash.png";

export default function WelcomeScreen({ navigation }) {
    const navigate = () => {
        navigation.navigate("MainFlow");
    }

    return (
        <View style={tailwind("bg-gray-900 h-full items-center justify-center")}>
            <ImageBackground source={splash} resizeMode="cover" style={tailwind("flex-1 w-full justify-center items-center")}>
                <Logo />
            
                <View style={tailwind("mt-5")}>
                    <Button onPress={navigate} text="Go to Demo" />
                </View>
            </ImageBackground>
        </View>
    )
}