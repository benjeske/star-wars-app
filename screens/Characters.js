import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilState } from "recoil"
import { appCharacter, appDetail } from "../recoil/atoms";
import axios from "axios";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import tailwind from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL, CHARACTER_URL } from "../utils/api";

export default function CharactersScreen({ navigation }) {
    const [selectedCharacter, setSelectedCharacter] = useRecoilState(appCharacter);
    const [detail, setDetail] = useRecoilState(appDetail);
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [loading, setLoading] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getCharacters();
        }
    }, [])

    const getCharacters = async () => {
        setLoading(true);
        await axios
            .get(BASE_URL + CHARACTER_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setFilteredCharacters(res.data.results);
                setCharacters(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = (text) => {
        if (text) {
            const newData = characters.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toLowerCase()
                        : ''.toLowerCase();
                    const textData = text.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredCharacters(newData);
            setSearch(text);
        } else {
            setFilteredCharacters(characters);
            setSearch(text);
        }
    };


    const Item = ({ item }) => (
            <TouchableOpacity
                onPress={() => {
                    setSelectedCharacter(item);
                    setDetail(`Height: ${item.height}`);
                    navigation.navigate("Details")
                }}
                style={tailwind("w-96 bg-gray-800 p-5 border-2 border-green-900 rounded items-center justify-center my-2")}
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
                placeholder="Search for a Character"
            />
        )
    }

    return (
        <SafeAreaView style={tailwind("h-full flex flex-1 justify-center items-center bg-gray-900")}>
            <Text style={tailwind("text-2xl text-white my-5")}>
                <Ionicons name="people" size={24} color={"#fff"} /> Characters
            </Text>
            {loading ? <LoadingIndicator /> : (
                <>
                    {renderHeader()}
                    <FlatList
                        data={filteredCharacters}
                        renderItem={renderItem}
                        keyExtractor={item => item?.name}
                        // ListHeaderComponent={renderHeader}
                    />
                </>
            )}
        </SafeAreaView>
    )
}