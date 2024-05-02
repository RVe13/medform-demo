import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";
import axios from "axios";

const Medicament = () => {
  const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetchMedicament();
    }, []);

    const fetchMedicament = async () => {
        try {
            const medicamentResponse = await axios.get(
                "http://192.168.1.37:8000/get-medicament"
            );
            setData(medicamentResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            console.log("Response status:", error.response.status);
            console.log("Response data:", error.response.data);
        }
    };

    const navigateToAdd = ()=>{
        router.navigate("addMediForm")
    }


    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#FFFFFF",
            }}
        >

        <Stack.Screen options={{ gestureEnabled: false }} />
        <View style={{flex: 1}}>
        <Text style={styles.listHeader}>Medicament: </Text>
        <CardsList cardDataList={data} />
        </View>
        <Navbar header="formation" />
          <TouchableOpacity style={styles.addButton} onPress={navigateToAdd}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    listHeader: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
        fontSize: 24,
    }, 

    addButton: {
    backgroundColor: '#D4EBFF', // Blue color
    height: 70,
    width:70,
    borderRadius:  50,
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    bottom: 150,
    right: 30,
        elevation:2,
  },
  addButtonText: {
    color: '#fff',
      fontSize: 25,
  },
});
export default Medicament;
