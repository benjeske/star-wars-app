import "react-native-gesture-handler";
import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import MainNavigator from "./navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  async function _cacheResourcesAsync() {
    const images = [require('./assets/fortified.webp')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  } else {

    return (
      <RecoilRoot>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </RecoilRoot>
    );
  }
}
