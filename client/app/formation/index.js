import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Button,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Stack } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";
import axios from "axios";

const Formation = () => {
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetchFormation();
    }, []);

    const fetchFormation = async () => {
        try {
            const formationResponse = await axios.get(
                "http://192.168.1.37:8000/get-formation"
            );
            setData(formationResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            console.log("Response status:", error.response.status);
            console.log("Response data:", error.response.data);
        }
    };


    const handleClick = () => {
        router.navigate("/addMediForm")
    }
    return (
        <SafeAreaView
            style={{
                height: "100%",
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#FFFFFF",
            }}
        >

                <Button title="Add" onPress={handleClick} />
            <Stack.Screen options={{ gestureEnabled: false }} />
            <View>
                <Text style={styles.listHeader}>Formation: </Text>
                <CardsList cardDataList={data} />
            </View>
            <Navbar header="formation" />
        </SafeAreaView>
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
});

export default Formation;
