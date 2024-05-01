import React, {useState} from "react"
import {StyleSheet, Text, View, Button, Image, Alert, TextInput} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker"
import axios from "axios";

const AddMediForm = ()=>{
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
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    }

    const handleSubmit = async ()=>{
        if(!title || !description || !content || !type || !image){
        }

        let route;
        if(type === "Formation") route = "add-formation"
        if(type === "Medicament") route = "add-medicament"

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);
        formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: 'image.jpg',
        });

        const data = {title: title, content: content, description: description, image:{uri: 'image/jpeg', name: 'image.jpg'}}


        console.log(`http://192.168.1.37:8000/${route}`)
        try {
            const response = await axios.post(
                `http://192.168.1.37:8000/${route}`
, data);
            Alert.alert('Success', 'Blog post created successfully');
            console.log(response)
        } catch (error) {
            console.error('Error creating blog post:', error);
            Alert.alert('Error', 'Failed to create blog post');
        }
    }


    return(
        <View style={styles.container}>
            <TextInput 
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            />
            <TextInput 
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            />

            <TextInput 
            placeholder="Content"
            value={content}
            onChangeText={setContent}
            />

            <Picker 
                selectedValue={type}
                onValueChange={itemValue =>setType(itemValue)}
            >
                <Picker.Item label="Formation" value="Formation" />
                <Picker.Item label="Medicament" value="Medicament" />
            </Picker>
            <Button title="Select Image" onPress={selectImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Post" onPress={handleSubmit} />

        </View>
    )

}

const styles = StyleSheet.create({
         container: {
             marginTop:200
  },
  image: {
    width: 200,
    height: 200,
  },    })

export default AddMediForm
