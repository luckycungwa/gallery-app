import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CamScreen from "./screens/CamScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View>
      <CamScreen/>
    </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
