import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "./card";
import { GestureHandlerRootView, RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";

const CardsList = ({  parentPage}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [cardsData, setCardsData] = useState([])
    useEffect(() => {
        fetchMediForm();
    }, []);

    const fetchMediForm= async () => {
        try {
            const mediFormResponse = await axios.get(
                `http://192.168.1.37:8000/get-${parentPage}`
            );
            setCardsData(mediFormResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            console.log("Response status:", error.response.status);
            console.log("Response data:", error.response.data);
        }
    };


    const onRefresh = async()=>{
       const mediFormResponse = await axios.get(`http://192.168.1.37:8000/get-${parentPage}`)
        setCardsData(mediFormResponse.data)
    } 
     const deleteMediForm= async(id)=>{
        try {
            await axios.delete(`http:/192.168.1.37:8000/delete-${parentPage}/${id}`)    
            console.log(cardsData.filter(item => item._id !== id))
            setCardsData(cardsData.filter(item => item._id !== id))
        } catch (error) {
            console.log(error.message) 
        }
    }

  return (
    <>
      {cardsData.length === 0 && (
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
        data={cardsData}
        renderItem={({ item }) =>( 
            <>
            <Card cardData={item} />

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
