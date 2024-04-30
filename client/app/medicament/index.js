import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";
import axios from "axios";

const Medicament = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchMedicaments();
  }, []);

  const fetchMedicaments = async () => {
    try {
      const medicamentResponse = await axios.get(
        "http://192.168.1.39:8000/get-medicament"
      );
      setData(medicamentResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
    }
  };
  return (
    <SafeAreaView
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View>
        <Text style={styles.listHeader}>Medicament: </Text>
        <CardsList cardDataList={data} />
      </View>
      <Navbar header="formation" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 10,
    fontSize: 24,
  },
});

export default Medicament;
