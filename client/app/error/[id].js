import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StatusBar, View, StyleSheet, } from "react-native";

const singleError= () => {
    const {id} = useLocalSearchParams();
    const [error, setError] = useState({})
    
    useEffect(() =>{
        const fetchError = async ()=>{
            try {
                const formationResponse = await axios.get(`http://192.168.1.33:8000/get-error/${id}`)
                setError(formationResponse.data)
            } catch (err) {
               console.log(err) 
            }
            
        }

        fetchError();

    }, [])

    return  (
        <ScrollView contentContainerStyle={styles.container}>
           <Text style={styles.title}>{error.title}</Text>
           <Text style={styles.description}>● Grad: {error.grad}</Text>
           <Text style={styles.description}>● Type: {error.type}</Text>
           <Text style={styles.content}>{error.content}</Text>
        </ScrollView>

    )

}


const styles = StyleSheet.create({
    container:{
        minHeight: '100%',
        backgroundColor: "#FFF",
        flexDirection: "columnt",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        paddingTop : StatusBar.currentHeight + 20,
        paddingHorizontal: 30,
    },
    title:{
        width: '100%',
        fontSize: 20,
        color: "#000",
        textAlign: "left",
        fontWeight: "bold"
         
    },
    content:{
        paddingTop: 10,
        width: '100%',
        fontSize: 14,
        textAlign: "left",
    },
     description: {
        width: '100%',
    textAlign: "left",
    fontSize: 16,
  },
})

  
export default singleError;
