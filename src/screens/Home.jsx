import { StyleSheet, Animated, TouchableOpacity, View, Text, StatusBar } from "react-native";
import React, { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const { width, height } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Ensure status bar is visible with light content
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <LinearGradient
      colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={[styles.mainContainer, { paddingTop: height * 0.06 }]}>
        {/* Title */}
        <Text style={[styles.title, { fontSize: width * 0.08 }]}>
          Rock Paper Scissors
        </Text>
        <Text style={[styles.subtitle, { fontSize: width * 0.04 }]}>
          Challenge your friends in this classic game
        </Text>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          {/* Animated Hand (Lottie) */}
          <LottieView
            style={{ width: '100%', height: '100%' }}
            source={require("../animations/rps.json")}
            autoPlay
            loop
          />
        </View>

        {/* Play Button */}
        <TouchableOpacity
          style={[styles.playButton, { width: width * 0.65 }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { fontSize: width * 0.055 }]}>
            START GAME
          </Text>
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View style={[styles.bottomContainer, { width: width * 0.95 }]}>
          {/* Profile Button */}
          <TouchableOpacity 
            style={styles.profileButton}
            activeOpacity={0.7}
          >
            <FontAwesome name="user" size={width * 0.05} color="#fff" style={styles.buttonIcon} />
            <Text style={[styles.bottomButtonText, { fontSize: width * 0.042 }]}>
              Profile
            </Text>
          </TouchableOpacity>

          {/* Leaderboard Button */}
          <TouchableOpacity 
            style={styles.leaderboardButton}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="trophy" size={width * 0.05} color="#fff" style={styles.buttonIcon} />
            <Text
              style={[styles.bottomButtonText, { fontSize: width * 0.042 }]}
              numberOfLines={1}
            >
              Leaderboard
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "System",
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontWeight: "400",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.9,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  playButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    letterSpacing: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 15,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(179, 136, 71, 0.85)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '48%',
    justifyContent: "center",
  },
  leaderboardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(179, 136, 71, 0.85)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '48%',
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 10,
  },
  bottomButtonText: {
    color: "white",
    fontWeight: "600",
  },
});