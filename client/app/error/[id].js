import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StatusBar, View, StyleSheet, } from "react-native";
import {SERVER_URL} from "@env"

const singleError= () => {
    const {id} = useLocalSearchParams();
    const [error, setError] = useState({})
    
    useEffect(() =>{
        const fetchError = async ()=>{
            try {
                const formationResponse = await axios.get(`${SERVER_URL}/get-error/${id}`)
                setError(formationResponse.data)
            } catch (err) {
               console.log(err) 
            }
            
        }

        fetchError();

    }, [])

    console.log(error)

    return  (
        <ScrollView contentContainerStyle={styles.container}>
           <Text style={styles.mainTitle}>{error.title}</Text>
           <Text style={styles.title}>● Nom du medicament:</Text>
           <Text style={styles.description}>{error.medicamentName}</Text>
           <Text style={styles.title}>● Dosage:</Text>
           <Text style={styles.description}>{error.dosage}</Text>
           <Text style={styles.title}>● Pesonne impliquée dans l'erreur:</Text>
           <Text style={styles.description}>{error.grad === "Autre" ? error.gradDescription : error.grad}</Text>
           <Text style={styles.title}>● Type d'erreur:</Text>
           <Text style={styles.description}>{error.errorType}</Text>
           <Text style={styles.title}>● Nature de l'erreur:</Text>
           <Text style={styles.description}>{error.errorNature === "Autre" ? error.errorNatureDescription : error.errorNature}</Text>
           <Text style={styles.title}>● Correction immediate:</Text>
           <Text style={styles.description}>{error.correction}</Text>
           <Text style={styles.title}>● Voie d'administration:</Text>
           <Text style={styles.description}>{error.voie === "Autre" ? error.voieDescription : error.voie}</Text>
           <Text style={styles.title}>● Source de medicament:</Text>
           <Text style={styles.description}>{error.medicamentSource}</Text>
           <Text style={styles.title}>● Circonstance de l'erreur:</Text>
           <Text style={styles.description}>{error.errorCause === "Autre" ? error.errorCauseDescription : error.errorCause}</Text>
           <Text style={styles.title}>● Consequences sur le patient:</Text>
           <Text style={styles.description}>{error.concequence}</Text>
           {error.consequenceDescription && (
               <> 
           <Text style={styles.title}>● Détails des consequences:</Text>
           <Text style={styles.description}>{error.consequenceDescription}</Text>
                </>
           )}
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
    mainTitle:{
         width: '100%',
        fontSize: 20,
        color: "#000",
        textAlign: "left",
        fontWeight: "bold"
    },

    title:{
        marginTop: 10,
        width: '100%',
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        textAlign: "left",
         
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
