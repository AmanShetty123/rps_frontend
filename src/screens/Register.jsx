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
  import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { format } from "date-fns";
  
  const { height, width } = Dimensions.get("window");
const Register = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const formatDate = (date) => {
      const day = date.getDate();
      const suffix = getDaySuffix(day);
      return `${day}${suffix} ${format(date, "MMMM yyyy")}`;
    };
    
    // Function to get the correct suffix (st, nd, rd, th)
    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const handleRegister = async() => {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password);
        const user = userCredential.user; 
        const now = new Date();
        const formattedDate = formatDate(now);
        //store the register users data to firestore db
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          createdAt: formattedDate,
        })
      console.log("user registered successfully", user.uid)
      navigation.navigate("login")
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    }

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
              onPress={handleRegister}
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