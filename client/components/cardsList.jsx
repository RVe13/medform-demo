import { Alert, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "./card";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";
import {SERVER_URL} from "@env"

const CardsList = ({parentPage}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [cardsData, setCardsData] = useState([])
    const [errorData, setErrorData] = useState([])
    useEffect(() => {
        fetchMediForm();
    }, []);

    const fetchMediForm= async () => {
        try {
            const mediFormResponse = await axios.get(
                `${SERVER_URL}/get-${parentPage}`
            );
            if(parentPage === "error"){ 
               setErrorData(mediFormResponse.data);
            }
            else {
              setCardsData(mediFormResponse.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const onRefresh = async()=>{
        setRefreshing(true)
       const mediFormResponse = await axios.get(`${SERVER_URL}/get-${parentPage}`)
        setRefreshing(false)
        if(parentPage === "error") setErrorData(mediFormResponse.data)
        else{setCardsData(mediFormResponse.data)}
    } 
    

    return (
        <>
        {(cardsData.length === 0 && parentPage !== "error") && (
            <Text style={{ paddingHorizontal: 20, color: "gray" }}>Empty.</Text>
        )}
        {(errorData.length === 0 && parentPage === "error") && (
            <Text style={{ paddingHorizontal: 20, color: "gray" }}>Empty.</Text>
        )}
        <FlatList
        refreshing={refreshing} 
        onRefresh={onRefresh}
        contentContainerStyle={{
            width: Dimensions.get("window").width,
                padding: 20,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
                paddingBottom: 150,
        }}
        data={parentPage === "error" ? errorData : cardsData}
        renderItem={({ item }) =>( 
            <Card cardData={item} onPress={()=>{router.navigate(`${parentPage}/${item._id}`)}}/>
        ) 
        }
        keyExtractor={item=> item._id}
        />
        </>
    );
};

export default CardsList;
