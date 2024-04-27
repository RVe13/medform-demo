import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Stack } from "expo-router";
import Navbar from "../../components/navbar";

const Formation = () => {
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
      <Navbar header="medicament" />
    </SafeAreaView>
  );
};

export default Formation;
