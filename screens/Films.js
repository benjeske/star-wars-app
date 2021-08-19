import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilState } from "recoil"
import { appCharacter } from "../recoil/atoms";
import axios from "axios";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "tailwind-rn";
import { BASE_URL, FILMS_URL } from "../utils/api";

export default function Films({ navigation }) {
    const [selectedCharacter, setSelectedCharacter] = useRecoilState(appCharacter);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getFilms();
        }
    }, [])

    const getFilms = () => {
        setLoading(true);
        axios
            .get(BASE_URL + FILMS_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setCharacters(res.data.results);
                console.log(res.data.results)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const Item = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setSelectedCharacter(item);
                console.log(item)
                navigation.navigate("Details")
            }}
            style={tailwind("w-96 bg-gray-800 p-5 border-2 border-green-900 rounded flex items-center justify-center my-2")}
        >
            <Text style={tailwind("text-base text-white")}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <SafeAreaView style={tailwind("h-full flex-1 items-center justify-center bg-gray-900")}>
            <Text style={tailwind("text-2xl text-white my-5")}>
                <Ionicons name="film" size={24} color={"#fff"} /> Films
            </Text>
            {loading ? <LoadingIndicator /> : (
                <>
                    <FlatList
                        data={characters}
                        renderItem={renderItem}
                        keyExtractor={item => item?.title}
                    />
                </>
            )}
        </SafeAreaView>
    )
}