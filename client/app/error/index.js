import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";
import { Stack } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";

const Error =  () => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#f7b0b0",
            }}
        >

            <Stack.Screen options={{ gestureEnabled: false }} />
            <View style={{flex: 1}}>
                <Text style={styles.listHeader}>La Liste Des erreurs Déclaré: </Text>
                <CardsList parentPage={"error"}/>
            </View>
            <Navbar/>
        </View>
    );
};

const styles = StyleSheet.create({
   
    listHeader: {
        color: "white",
        paddingTop: StatusBar.currentHeight + 30,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 21,    },
 });

export default Error;
