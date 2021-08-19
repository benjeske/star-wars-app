import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text } from "react-native";
import { useRecoilState } from "recoil";
import { appCharacter, appDetail } from "../recoil/atoms";
import tailwind from "tailwind-rn";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import Button from "../components/UI/Button";

export default function Details({ navigation }) {
    const [selectedCharacter, setSelectedCharacter] = useRecoilState(appCharacter);
    const [detail, setDetail] = useRecoilState(appDetail);
    const [loading, setLoading] = useState(false);

    const navigate = () => {
        navigation.navigate("Characters");
    }

    const renderCharacter = () => {
        return (
            <>
            {selectedCharacter ? (
                <ScrollView contentContainerStyle={tailwind("h-full flex justify-center items-center")}>
                    <Text style={tailwind("text-2xl text-white")}>{selectedCharacter?.name}</Text>
                    <Text style={tailwind("text-2xl text-white")}>{selectedCharacter?.title}</Text>
                    <Text style={tailwind("text-lg text-white mt-5")}>{detail}</Text>
                </ScrollView>
            ) : (
                <View style={tailwind("h-full flex justify-center items-center")}>
                    <Text style={tailwind("text-2xl text-white text-center m-5")}>You haven't selected a character, planet, starship, or film.</Text>
                    <Button onPress={navigate} text="Find a Character" />
                </View>
            )}
            </>
        )
    }

    return (
        <SafeAreaView style={tailwind("h-full bg-gray-900")}>
            {loading ? 
                <LoadingIndicator /> 
            : renderCharacter()               
            }
        </SafeAreaView>
    )
}