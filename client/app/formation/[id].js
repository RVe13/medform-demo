import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, StatusBar, Dimensions, View } from "react-native";
import { SERVER_URL } from "@env"
import { useFonts } from "expo-font";

const singleFormation = () => {
    const { id } = useLocalSearchParams();
    const [formation, setFormation] = useState({})
    let [fonts] = useFonts({
        'Righteous-Regular': require('../../assets/fonts/Righteous-Regular.ttf'),
        'PoetsenOne-Regular': require('../../assets/fonts/PoetsenOne-Regular.ttf'),
    })


    useEffect(() => {
        const fetchFormation = async () => {
            try {
                const formationResponse = await axios.get(`${SERVER_URL}/get-formation/${id}`)
                setFormation(formationResponse.data)
            } catch (error) {
                console.log(error)
            }

        }

        fetchFormation();

    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: formation.image }} style={{ width: 300, height: 270, borderRadius: 10 }} />
            <Text style={styles.title}>{formation.title}</Text>
            <Text style={styles.description}>{formation.description}</Text>
            <Text style={styles.content}>● {formation.content}</Text>
        </ScrollView>

    )

}


const styles = {
    container: {
        minHeight: '100%',
        backgroundColor: "#FFF",
        flexDirection: "columnt",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        paddingTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: "serif",
        fontStyle: "italic",
        width: '100%',
        fontSize: 24,
        color: "#000",
        textAlign: "left",
        fontWeight: "900",
        marginBottom: 10,

    },
    content: {
        width: '100%',
        fontSize: 14,
        letterSpacing: 1,
        textAlign: "left",
    },
    description: {
        fontFamily: "PoetsenOne-Regular",
        color: "red",
        width: '100%',
        fontSize: 16,
        marginBottom: 20,
    },
}

export default singleFormation;
