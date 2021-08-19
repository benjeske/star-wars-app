import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tailwind from "tailwind-rn"

export default function Button({
    onPress,
    text = "Press me",
}) {
    return (
        <TouchableOpacity onPress={onPress} style={tailwind("bg-gray-700 p-5 rounded")}>
            <Text style={tailwind("text-white text-base")}>{text}</Text>
        </TouchableOpacity>
    )
}