import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";
import { Stack } from "expo-router";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";

const Formation = () => {
    
    
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#d4b0f7",
            }}
        >

            <Stack.Screen options={{ gestureEnabled: false }} />
            <View style={{flex: 1}}>
                <Text style={styles.listHeader}>La Liste Des Formations: </Text>
                <CardsList parentPage={"formation"}/>
            </View>
            <Navbar header="formation" />
        </View>
    );
};

const styles = StyleSheet.create({
   
    listHeader: {
        color: "white",
        paddingTop: StatusBar.currentHeight + 30,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 21,
    },
 });

export default Formation;
