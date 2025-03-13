import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import useAuthStore from "../store/authStore";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={user ? "home" : "login"}>
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default AppNavigator;
