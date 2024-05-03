import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, StatusBar, Dimensions } from "react-native";

const singleMedicament= () => {
    const {id} = useLocalSearchParams();
    console.log(id)
    const [medicament, setMedicament] = useState({})
    
    useEffect(() =>{
        const fetchMedicament = async ()=>{
            try {
                const medicamentResponse = await axios.get(`http://192.168.1.37:8000/get-medicament/${id}`)
                setMedicament(medicamentResponse.data)
            } catch (error) {
               console.log(error) 
            }
            
        }

        fetchMedicament();

    }, [])

    return  (
        <ScrollView contentContainerStyle={styles.container}>
           <Image source={{ uri: medicament.image }} style={{ width: 300, height: 270, borderRadius: 10 }} />
           <Text style={styles.title}>{medicament.title}</Text>
           <Text style={styles.content}>{medicament.content}</Text>
        </ScrollView>

    )

}


const styles = {
    container:{
        minHeight: '100%',
        backgroundColor: "#FFF",
        flexDirection: "columnt",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
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
        width: '100%',
        fontSize: 16,
        textAlign: "left",
    }

}


export default singleMedicament;
