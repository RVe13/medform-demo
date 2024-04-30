import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useRouter } from "expo-router";

const Navbar = ({ header }) => {
  const [currentPage, setCurrentPage] = useState(header);
  const router = useRouter();
  const switchToFormation = () => {
    setCurrentPage("formation");
    router.navigate("formation");
  };

  const switchToHome = () => {
    setCurrentPage("home");
    router.navigate("/");
  };

  const switchTomedicament = () => {
    setCurrentPage("medicament");
    router.navigate("medicament");
  };
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navbarbtn} onPress={switchToFormation}>
        <ImageBackground
          style={styles.btnImg}
          source={require("../assets/heartbeat.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navbarbtn} onPress={switchToHome}>
        <ImageBackground
          style={styles.btnImg}
          source={require("../assets/hospital.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navbarbtn} onPress={switchTomedicament}>
        <ImageBackground
          style={styles.btnImg}
          source={require("../assets/pill.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 40,
    right: 40,
    backgroundColor: "#D4EBFF",
    height: 50,
    borderRadius: 50,
  },
  navbarbtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#ffffff",
  },
  navbarbtnSelected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#ffffff",
  },
  btnImg: {
    width: 20,
    height: 20,
  },
  btnImgSelected: {
    width: 40,
    height: 40,
  },
});

export default Navbar;
