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
import CardsList from "../../components/cardsList";

const Formation = () => {
     const blogDataList = [
    { id: 1, title: 'Blog 1', author: 'Author 1', content: 'Lorem ipsum...' },
    { id: 2, title: 'Blog 2', author: 'Author 2', content: 'Lorem ipsum...' },
    // Add more blog data as needed
  ];
  return (
    <SafeAreaView
      style={{
        paddingTop: 50,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View>
        <Text style={styles.listHeader}>Formation: </Text>
        <CardsList cardDataList={blogDataList} /> 
      </View>
      <Navbar header="formation" />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    listHeader:{
        paddingBottom: 20,
        paddingHorizontal: 10,
        fontSize: 24,
    }
})

export default Formation;
