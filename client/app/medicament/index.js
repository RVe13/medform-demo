import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";
import axios from "axios";

const Medicament = () => {
    const [data, setData] = useState(null)
      useEffect(()=>{
    fetchMedicaments()
       console.log(data)
   }, []) 

  const fetchMedicaments = async ()=>{
            try {
                const medicamentResponse = await axios.get("http://localhost:8000/get-medicament")
                    setData(medicamentResponse)
            } catch (error) {
    console.error('Error fetching data:', error);
    console.log('Response status:', error.response.status);
    console.log('Response data:', error.response.data);
            }
        } 
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
        <Text style={styles.listHeader}>Medicament: </Text>
        <CardsList cardDataList={data} /> 
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

export default Medicament;
