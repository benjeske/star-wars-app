import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilState } from "recoil"
import { appCharacter } from "../recoil/atoms";
import axios from "axios";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import tailwind from "tailwind-rn";
import { FontAwesome5 } from "@expo/vector-icons";
import { BASE_URL, STARSHIPS_URL } from "../utils/api";

export default function Starships({ navigation }) {
    const [selectedCharacter, setSelectedCharacter] = useRecoilState(appCharacter);
    const [starships, setStarships] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredStarships, setFilteredStarships] = useState([]);
    const [loading, setLoading] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getStarships();
        }
    }, [])

    const getStarships = async () => {
        setLoading(true);
        await axios
            .get(BASE_URL + STARSHIPS_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setStarships(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = (text) => {
        if (text) {
            const newData = starships.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toLowerCase()
                        : ''.toLowerCase();
                    const textData = text.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredStarships(newData);
            setSearch(text);
        } else {
            setFilteredStarships(starships);
            setSearch(text);
        }
    };

    const Item = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setSelectedCharacter(item);
                navigation.navigate("Details")
            }}
            style={tailwind("w-96 bg-gray-800 p-5 border-2 border-green-900 rounded flex items-center justify-center my-2")}
        >
            <Text style={tailwind("text-base text-white")}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const renderHeader = () => {
        return (
            <TextInput
                onChangeText={text => handleSearch(text)}
                value={search}
                underlineColorAndroid="transparent"
                style={tailwind("text-base border-2 border-gray-800 h-16 pl-2 text-white w-96 mb-4")}
                placeholderTextColor="white"
                placeholder="Search for a Starship"
            />
        )
    }

    return (
        <SafeAreaView style={tailwind("h-full flex-1 items-center justify-center bg-gray-900")}>
            <Text style={tailwind("text-2xl text-white my-5")}>
            <FontAwesome5 name="space-shuttle" size={24} color={"#fff"} /> Starships
            </Text>
            {loading ? <LoadingIndicator /> : (
                <>
                    {renderHeader()}
                    <FlatList
                        data={filteredStarships}
                        renderItem={renderItem}
                        keyExtractor={item => item?.name}
                    />
                </>
            )}
        </SafeAreaView>
    )
}