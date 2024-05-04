import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import Navbar from "../../components/navbar";
import CardsList from "../../components/cardsList";
import { Stack } from "expo-router";

const Medicament = () => {
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
            <Text style={styles.listHeader}>La Liste Des Medicaments: </Text>
        <CardsList parentPage={"medicament"} />
        </View>
        <Navbar header="formation" />
          
        </View>
    );
};

const styles = StyleSheet.create({
        listHeader: {
         paddingTop: StatusBar.currentHeight + 30,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 21,    }, 
   });
export default Medicament;
