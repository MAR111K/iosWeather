import { Button } from "@rneui/base";
import axios, { AxiosResponse } from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { WeatherType } from "./types";
import { CitiesList } from "./components/Swiper";

export default function App() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState<WeatherType[]>([]);
  const searchCity = () => {
    handlerCityApi();
    setCity("");
    Keyboard.dismiss();
  };

  const handlerCityApi = async () => {
    const { data }: AxiosResponse<WeatherType> = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=0023282d696c468da1095804220302&q=${city}&aqi=no`
    );
    setCityData([...cityData, data]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text>Weather Application</Text>
        <TextInput
          value={city}
          onChangeText={(e) => setCity(e)}
          style={styles.weatherInput}
          placeholder="City"
        />
        <Button
          onPress={searchCity}
          title="Search"
          buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ color: "white", marginHorizontal: 20 }}
        />
      </View>
      <CitiesList info={cityData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 200,
    gap: 100,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#ff0000",
  },
  weatherInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
