import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Button, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import useAuthStore from "../store/authStore";

const { height, width } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginUser = useAuthStore((state) => state.login);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      loginUser({
        uid: user.uid,
        email: user.email,
        username: user.username,
      });
      console.log("User logged in successfully");
      navigation.navigate("home");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LottieView
              style={styles.lottie}
              source={require("../animations/login.json")}
              autoPlay
              loop
            />
            <Text style={styles.headerText}>LOGIN</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              <Button
                labelStyle={{
                  fontSize: 20,
                }}
                style={styles.button}
                mode="contained-tonal"
                onPress={handleLogin}
              >
                Login
              </Button>
              <Text style={styles.redirectText}>
                Don't have an account?
                <Text
                  style={{ color: "red" }}
                  onPress={() => navigation.navigate("register")}
                >
                  {" "}
                  Register
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  lottie: {
    width: width,
    height: height * 0.4,
  },
  headerText: {
    fontSize: 38,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: width * 0.9,
    height: height * 0.06,
    margin: height * 0.01,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: width * 0.1,
    height: height * 0.4,
  },
  button: {
    margin: width * 0.05,
    width: 100,
    height: 40,
  },
  redirectText: {
    fontSize: 20,
  },
});
