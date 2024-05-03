import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Stack } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";
import axios from "axios";

const Formation = () => {
    const router = useRouter();
     const navigateToAdd = ()=>{
        router.navigate("addMediForm")
    }
    
    return (
        <View
            
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#FFFFFF",
            }}
        >

            <Stack.Screen options={{ gestureEnabled: false }} />
            <View style={{flex: 1}}>
                <Text style={styles.listHeader}>Formation: </Text>
                <CardsList parentPage={"formation"}/>
            </View>
            <Navbar header="formation" />
            <TouchableOpacity style={styles.addButton} onPress={navigateToAdd}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
   
    listHeader: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
        fontSize: 24,
    },
 addButton: {
    backgroundColor: '#D4EBFF', // Blue color
    height: 50,
    width:50,
    borderRadius:  50,
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    bottom: 120,
    right: 50,
        elevation:2,
  },
 addButtonText: {
    color: '#fff',
      fontSize: 25,
  },});

export default Formation;
