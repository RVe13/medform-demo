import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import NetInfo from '@react-native-community/netinfo';
import { StyleSheet, Text, View } from "react-native";

const Layout = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });


    if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );
  }

    return () => {
      unsubscribe();
    };
  }, []); 

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "none",
      }}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff6347', // or any color you prefer
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff', // white text
    fontWeight: 'bold',
  },
});

export default Layout;
