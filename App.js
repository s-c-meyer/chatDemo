import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

//create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAPKbxgv5Kit_HpaF_xi7k07nKmtbLubWo",
    authDomain: "chat-app-b066c.firebaseapp.com",
    projectId: "chat-app-b066c",
    storageBucket: "chat-app-b066c.appspot.com",
    messagingSenderId: "816829909177",
    appId: "1:816829909177:web:107746e694fad83e30b368"
  };

  //Intialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen" //this name should match one of the name's listed below in the <Stack.Screen /> component
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
        />
        <Stack.Screen
          name="ChatScreen"
          //component={ChatScreen}
        >
          {props => <ChatScreen db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;
