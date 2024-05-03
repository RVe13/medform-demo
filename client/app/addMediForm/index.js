import React, {useState} from "react"
import {StyleSheet, Text, View, StatusBar, Image, Alert, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker"
import axios from "axios";
import { router } from "expo-router";

const AddMediForm = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content , setContent] = useState("")
    const [type , setType] = useState("Formation")
    const [image, setImage] = useState(null) 

    const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
        base64: true
    });
    if (!result.canceled) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        console.log(image)
    }
    }

    const handleSubmit = async ()=>{
        if(!title || !description || !content || !type || !image){
            Alert.alert('Information Missing', 'Fill all the fields')
            return
        }

        let route;
        if(type === "Formation") route = "add-formation"
        if(type === "Medicament") route = "add-medicament"
        
        const formData = {
            title, 
            description,
            content,
            image
        }
        setIsLoading(true)

        try {
            const response = await axios.post(
                `http://192.168.1.37:8000/${route}`
, formData);
            let nextRoute;
            if(type === "Formation") nextRoute = "formation"
            else nextRoute = "medicament"
            Alert.alert('Success', 'post created successfully');
            setIsLoading(false)
            router.navigate(`${nextRoute}`)
        } catch (error) {
            console.error('Error creating the post:', error);
            setIsLoading(false)
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
          <Picker.Item label="Formation" value="Formation" />
          <Picker.Item label="Medicament" value="Medicament" />
        </Picker>
      </View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title..."
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter description..."
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Enter blog content..."
        value={content}
        onChangeText={setContent}
        multiline={true}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={selectImage}>
        <Text style={styles.imagePickerButtonText}>Choose Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
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
