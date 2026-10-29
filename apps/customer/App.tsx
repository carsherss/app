import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#071426" />
      <View style={styles.container}>
        <View style={styles.mark}><Text style={styles.markText}>C</Text></View>
        <Text style={styles.brand}>CARSHERS</Text>
        <Text style={styles.tagline}>CLEANER RIDES, BRIGHTER DAYS</Text>
        <Text style={styles.heading}>A cleaner ride, at your doorstep.</Text>
        <Text style={styles.body}>Book car and bike washing services in Hyderabad.</Text>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Explore services</Text>
        </Pressable>
        <Text style={styles.note}>MVP preview · Booking is not enabled yet</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#071426" },
  container: { flex: 1, justifyContent: "center", padding: 28, alignItems: "center" },
  mark: { width: 76, height: 76, borderRadius: 22, borderWidth: 2, borderColor: "#16B8FF", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  markText: { color: "#16B8FF", fontSize: 48, fontWeight: "900" },
  brand: { color: "#FFFFFF", fontSize: 31, fontWeight: "900", letterSpacing: 2 },
  tagline: { color: "#48C8FF", fontSize: 9, letterSpacing: 2, marginTop: 4 },
  heading: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", textAlign: "center", marginTop: 56 },
  body: { color: "#B9C9D9", fontSize: 15, textAlign: "center", marginTop: 12, lineHeight: 22 },
  button: { backgroundColor: "#087FF5", paddingVertical: 16, paddingHorizontal: 28, borderRadius: 13, marginTop: 30, width: "100%", alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  note: { color: "#8094AA", fontSize: 11, marginTop: 24 }
});
