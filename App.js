import { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from 'firebase/storage';


//import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

//create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["@firebase/auth: Auth"]);

const App = () => {
  const connectionStatus = useNetInfo();

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

  //Initialize Cloud Firestore and Cloud Storage and get a reference to the services
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <ChatScreen isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
