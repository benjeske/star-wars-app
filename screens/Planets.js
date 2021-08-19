import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilState } from "recoil"
import { appCharacter } from "../recoil/atoms";
import axios from "axios";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import tailwind from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL, PLANETS_URL } from "../utils/api";

export default function Planets({ navigation }) {
    const [selectedCharacter, setSelectedCharacter] = useRecoilState(appCharacter);
    const [planets, setPlanets] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPlanets, setFilteredPlanets] = useState([])
    const [loading, setLoading] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getPlanets();
        }
    }, [])

    const getPlanets = async () => {
        setLoading(true);
        await axios
            .get(BASE_URL + PLANETS_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setPlanets(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = (text) => {
        if (text) {
            const newData = planets.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toLowerCase()
                        : ''.toLowerCase();
                    const textData = text.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredPlanets(newData);
            setSearch(text);
        } else {
            setFilteredPlanets(planets);
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
                placeholder="Search for a Planet"
            />
        )
    }

    return (
        <SafeAreaView style={tailwind("h-full flex-1 items-center justify-center bg-gray-900")}>
            <Text style={tailwind("text-2xl text-white my-5")}>
                <Ionicons name="planet" size={24} color={"#fff"} /> Planets
            </Text>
            {loading ? <LoadingIndicator /> : (
                <>
                    {renderHeader()}
                    <FlatList
                        data={filteredPlanets}
                        renderItem={renderItem}
                        keyExtractor={item => item?.name}
                    />
                </>
            )}
        </SafeAreaView>
    )
}