import React, {useState} from "react"
import {StyleSheet, Text, View, StatusBar, Image, Alert, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker"
import axios from "axios";
import { router } from "expo-router";
import {SERVER_URL, API_KEY} from "@env"

const AddMediForm = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [medicamentName, setMedicamentName] = useState("")
    const [dosage, setDosage] = useState("")
    const [type , setType] = useState("Error")
    const [voie ,setVoie] = useState("Orale")
    const [voieDescription, setVoieDescription] = useState("")
    const [errorType, setErrorType] = useState("Erreur de prescription")
    const [errorNature, setErrorNature] = useState("Erreur de medicament")
    const [errorNatureDescription, setErrorNatureDescription] = useState("")
    const [medicamentSource, setMedicamentSource] = useState("pharmacie de l'hopital")
    const [errorCause, setErrorCause] = useState("Interruptions")
    const [causeDescription, setCauseDescription] = useState("")
    const [consequence, setConsequence] = useState("Détectée et corrigée immédiatement")
    const [consequenceDescription, setconsequenceDescription] = useState("")
    const [grad, setGrad] = useState("Infirmier(e)")
    const [gradDescription, setGradDescription] = useState("")
    const [correction, setCorrection] = useState("Oui")

    const voieArray = ["Orale", "Intraveineuse", "Intramusculaire", "Autre"]
    const errorTypeArray = ["Erreur de prescription", "Erreur de l'administration", "Erreur de suivi therapeutique"]
    const errorNatureArray = ["Erreur de medicament", "Erreur de dosage", "Erreur de posologie ou concentration", "Erreur de voie d'administration", "Erreur de moment d'administration","Erreur de débit d'administration", "Erreur de technique", "Erreur de l'identité de patient","Erreur d'omission", "Erreur de forme galénique Médicament périmé, détérioré ou mal conservé", "Autre"]
    const errorCauseArray = ["Interruptions", "Fatigue", "Stress","Confusion entre noms des medicaments", "Manque de formation", "Pression temporelle", "Communication inefficace", "Autre"]
    const gradArray = ["Infirmier(e)", "Aide soignant(e)", "Medecin", "Pharmacien(e)", "Autre"]
    const consequencesArray = ["Détectée et corrigée immédiatement", "A eu des conséquences mineures", "A eu des conséquences modérées", "A eu des conséquences majeures", "Aucune conséquence observée"] 
    const medicamentSourceArray = ["Pharmacie de l'hopital", "Pharmacie externe"] 

    

    const handleErrorSubmit = async ()=>{
        if(!title || !medicamentName || !dosage ||((voie === "Autre" && !voieDescription) ||(errorNature === "Autre" && !errorNatureDescription) || (grad === "Autre" && !gradDescription)|| (errorCause === "Autre" && !causeDescription)||((consequence !== "Détectée et corrigée immédiatement" &&  consequence !== "Aucune conséquence observée") && !consequenceDescription)) ){
            Alert.alert('Information Missing', 'Fill all the fields')
            return
        }

         const formData = {
            title, 
            medicamentName,
            dosage,
            voie,
            voieDescription,
            errorType,
            errorNature,
            errorNatureDescription,
            grad,
            gradDescription,
            medicamentSource,
            errorCause,
            causeDescription,
            correction,
            consequence,
            consequenceDescription
        }
        setIsLoading(true)

        try {
            const response = await axios.post(
                `${SERVER_URL}/add-error`
, formData);
            
            setIsLoading(false)
            Alert.alert('Success', 'post created successfully');
            router.navigate(`error`)
        } catch (err) {
            setIsLoading(false)
            console.error('Error creating the post:', err);
            Alert.alert('Error', 'Failed to create the post');
        }
    }


    return(
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Erreur" value="Error" />
        </Picker>
      </View>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez Titre..."
        value={title}
        onChangeText={setTitle}
      />

        {type === "Error" && (
        <View style={styles.pickerContainer}>
            <Text style={styles.label}>Nom du medicament</Text>
            <TextInput
            style={styles.input}
            placeholder="Entrez le Nom du medicament..."
            value={medicamentName}
            onChangeText={setMedicamentName}
            />
            
            <Text style={styles.label}>Dosage administré</Text>
            <TextInput
            style={styles.input}
            placeholder="Entrez le Dosage administré..."
            value={dosage}
            onChangeText={setDosage}
            />
            
            <Text style={styles.label}>Voie d'administration</Text>
            <Picker
            selectedValue={voie}
            onValueChange={(itemValue, itemIndex) => setVoie(itemValue)}
            style={styles.picker}
            >
            {voieArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker> 

            {voie === "Autre" && (
            <>
             <Text style={styles.label}>Précisez Voie d'administration</Text>
            <TextInput
            style={styles.input}
            placeholder="Précisez..."
            value={voieDescription}
            onChangeText={setVoieDescription}
            multiline={true}
            />
            </>
            )} 



            <Text style={styles.label}>Type d'erreur</Text>
            <Picker
            selectedValue={errorType}
            onValueChange={(itemValue, itemIndex) => setErrorType(itemValue)}
            style={styles.picker}
            >
            {errorTypeArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker>
            
            <Text style={styles.label}>La nature de l'erreur</Text>
            <Picker
            selectedValue={errorNature}
            onValueChange={(itemValue, itemIndex) => setErrorNature(itemValue)}
            style={styles.picker}
            >
            {errorNatureArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker>

             {errorNature === "Autre" && (
            <>
             <Text style={styles.label}>Précisez La nature de l'erreur</Text>
            <TextInput
            style={styles.input}
            placeholder="Précisez..."
            value={errorNatureDescription}
            onChangeText={setErrorNatureDescription}
            multiline={true}
            />
            </>
            )} 


            <Text style={styles.label}>Personne impliquée dans l'erreur</Text>
            <Picker
            selectedValue={grad}
            onValueChange={(itemValue, itemIndex) => setGrad(itemValue)}
            style={styles.picker}
            >
            {gradArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker>

            {grad === "Autre" && (
            <>
            <Text style={styles.label}>Précisez personne impliquée dans l'erreur</Text>
            <TextInput
            style={styles.input}
            placeholder="Précisez..."
            value={gradDescription}
            onChangeText={setGradDescription}
            multiline={true}
            />
            </>
            )}  

            
            <Text style={styles.label}>Source de medicament</Text>
            <Picker
            selectedValue={medicamentSource}
            onValueChange={(itemValue, itemIndex) => setMedicamentSource(itemValue)}
            style={styles.picker}
            >
            {medicamentSourceArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker> 



            <Text style={styles.label}>Circonstances de l'erreur</Text>
            <Picker
            selectedValue={errorCause}
            onValueChange={(itemValue, itemIndex) => setErrorCause(itemValue)}
            style={styles.picker}
            >
            {errorCauseArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker> 
            {errorCause=== "Autre" && (
            <>
            <Text style={styles.label}>Précisez Circonstances de l'erreur</Text>
            <TextInput
            style={styles.input}
            placeholder="Précisez..."
            value={causeDescription}
            onChangeText={setCauseDescription}
            multiline={true}
            />
            </>
            )}  


 
             
            <Text style={styles.label}>Correction immediate ?</Text>
            <Picker
            selectedValue={correction}
            onValueChange={(itemValue, itemIndex) => setCorrection(itemValue)}
            style={styles.picker}
            >
                <Picker.Item label={"Oui"} value={"Oui"} />
                <Picker.Item label={"Non"} value={"Non"} />
            </Picker> 

            <Text style={styles.label}>Consequences sur le patient</Text>
            <Picker
            selectedValue={consequence}
            onValueChange={(itemValue, itemIndex) => setConsequence(itemValue)}
            style={styles.picker}
            >
            {consequencesArray.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
            </Picker> 
            {consequence !== "Détectée et corrigée immédiatement" &&  consequence !== "Aucune conséquence observée"&& (
            <>
            <Text style={styles.label}>Précisez conséquence</Text>
            <TextInput
            style={styles.input}
            placeholder="Précisez..."
            value={consequenceDescription}
            onChangeText={setconsequenceDescription}
            multiline={true}
            />
            </>
            )} 

      </View>
 
        )}
       
        <TouchableOpacity style={styles.postButton} onPress={handleErrorSubmit}>
            <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
 {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </ScrollView>
    )

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
      paddingTop: StatusBar.currentHeight + 20
  },
    pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 50,
  },
  descriptionInput: {
    height: 100,
  },
  contentInput: {
      minHeight: 300,
  },
  imagePickerButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
     postButton: {
    backgroundColor: '#28a745', // Green color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20, // Adjust spacing as needed
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
     overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AddMediForm
