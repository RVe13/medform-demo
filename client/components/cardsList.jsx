import { Alert, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "./card";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";
import {SERVER_URL, API_KEY} from "@env"

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
     const deleteMediForm= async(id)=>{
        try {
            await axios.delete(`${SERVER_URL}/delete-${parentPage}/${id}`, {headers:{"Authorization" : API_KEY}})    
           if(parentPage !== "error") setCardsData(cardsData.filter(item => item._id !== id))
           if(parentPage === "error") setErrorData(errorData.filter(item => item._id !== id))
        } catch (error) {
            console.log(error.message) 
            Alert.alert('Error', 'Failed to delete the post');
        }
    }

    return (
        <>
        {(cardsData.length === 0 && parentPage !== "error") && (
            <Text style={{ paddingHorizontal: 20 }}>Empty.</Text>
        )}
        {(errorData.length === 0 && parentPage === "error") && (
            <Text style={{ paddingHorizontal: 20 }}>Empty.</Text>
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
            <>
            <Card cardData={item} onPress={()=>{router.navigate(`${parentPage}/${item._id}`)}}/>

            <TouchableOpacity style={styles.deleteButton} onPress={()=>{deleteMediForm(item._id)}}>
            <Text style={styles.deleteButtonText}>x</Text>
            </TouchableOpacity>
            </>
        ) 
        }
        keyExtractor={item=> item._id}
        />
        </>
    );
};


const styles = {
deleteButton: {
    backgroundColor: '#FF0088', // Blue color
    height: 30,
    width:30,
    borderRadius:  50,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
 deleteButtonText: {
    color: '#fff',
      fontSize: 15,
  },

}

export default CardsList;
