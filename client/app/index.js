import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Stack } from "expo-router";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: 50,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D4EBFF",
        position: "relative",
      }}
    >
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../assets/homebg.png")}
          style={styles.backgroundImage}
        ></ImageBackground>
        <Text
          style={{
            position: "absolute",
            top: "65%",
          }}
        >
          <Text
            style={{
              fontSize: 32,
              letterSpacing: 13,
              color: "#76BEF6",
            }}
          >
            Medi
          </Text>
          <Text
            style={{
              fontSize: 32,
              letterSpacing: 13,
            }}
          >
            Form
          </Text>
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            letterSpacing: 2,
            position: "absolute",
            top: "73%",
          }}
        >
          The simple guide for your medical journey
        </Text>
      </View>
      <Navbar header="home" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: 600,
    width: 620,
  },
  container: {
    flex: 1,
    backgroundColor: "#D4EBFF",
  },
});

export default Home;