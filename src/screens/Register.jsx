import { 
    Dimensions, 
    StyleSheet, 
    Text, 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard 
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import LottieView from "lottie-react-native";
  import { Button, TextInput } from "react-native-paper";
  
  const { height, width } = Dimensions.get("window");
const Register = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const [username, setUsername] = useState('');
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
            source={require("../animations/register.json")}
            autoPlay
            loop
          />
          <Text style={styles.headerText}>REGISTER</Text>
          <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              mode="outlined"
              label="Create a Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Enter Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Enter Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Button
              labelStyle={{
                fontSize: 20
              }}
              style={styles.button}
              mode="contained-tonal"
            >
              Register
            </Button>
            <Text style={styles.redirectText}>
              Already have an account?
              <Text style={{ color: "red" }} onPress={() => navigation.navigate('login')}> Login</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
    lottie: {
        width: width,
        height: height * 0.4,
      },
      headerText: {
        fontSize: 38,
        textAlign: "center",
        fontWeight: "bold",
        margin: 10,
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
        width: 150,
        height:40,
      },
      redirectText: {
        fontSize: 20,
      },
})