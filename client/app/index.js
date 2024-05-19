import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Navbar from "../components/navbar";
import { Stack } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: 50,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View
      style={{
          display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
      }}
      >
      <ImageBackground
      source={require("../assets/homebg.png")}
      style={styles.backgroundImage}
      />
      <Text
      style={{
          fontSize: 32,
      }}
      >
      Learn By
      </Text>

      <Text
      style={{
          fontSize: 32,
              letterSpacing: 13,
              color: "#76BEF6",
      }}
      >
      Declaring
      </Text>
      </View>
      <Navbar header="home" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
      height: '100%',
    resizeMode: "cover",
    height: 400,
    width: 420,
    alignSelf: 'center'
  },
  
});

export default Home;
