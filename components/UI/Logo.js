import React from "react";
import { Image } from "react-native";
import logo from "../../assets/fortified.webp";
import tailwind from "tailwind-rn";

export default function Logo() {
    return (
        <Image source={logo} style={tailwind("")} />
    )
}