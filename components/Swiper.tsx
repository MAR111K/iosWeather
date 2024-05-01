import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { WeatherType } from "../types";
import { Icon } from "@rneui/base";

export const CitiesList = ({ info }: { info: WeatherType[] }) => {
  return (
    <>
      {info.length > 0 && (
        <Swiper style={styles.wrapper} showsButtons={true} height={400}>
          {info.map((elem) => {
            return (
              <View style={styles.slide} key={elem.location.tz_id}>
                <Text style={styles.text}>{elem.location.name}</Text>
                <Image
                  width={60}
                  height={60}
                  source={{
                    uri: `https:${elem.current.condition.icon}`,
                  }}
                />
                <Text style={styles.text}>{elem.current.condition.text}</Text>

                <Text style={styles.text}>Temp: {elem.current.temp_c}°C</Text>
                <Text style={styles.text}>Humidity: {elem.current.humidity}%</Text>
              </View>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    maxWidth: 300,
    textAlign: "center",
  },
});
