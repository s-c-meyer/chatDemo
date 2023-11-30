import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const StartScreen = ({ navigation }) => {
  const auth = getAuth();

  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('ChatScreen', {userID: result.user.uid, name: name, backgroundColor: backgroundColor });
        Alert.alert('Signed in Successfuly');
      })
      .catch((error) => {
        Alert.alert('Unable to sign, please try again later');
      })
  };

  const handleColorChange = (style) => {
    const color = StyleSheet.flatten(style).backgroundColor;
    setBackgroundColor(color);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Background-Image.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.screenOneContainer}>
          <TextInput 
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <Text style={styles.buttonText}>Choose Background Color:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonOne} onPress={() => {handleColorChange(styles.buttonOne)}}></TouchableOpacity>
            <TouchableOpacity style={styles.buttonTwo} onPress={() => {handleColorChange(styles.buttonTwo)}}></TouchableOpacity>
            <TouchableOpacity style={styles.buttonThree} onPress={() => {handleColorChange(styles.buttonThree)}}></TouchableOpacity>
            <TouchableOpacity style={styles.buttonFour} onPress={() => {handleColorChange(styles.buttonFour)}}></TouchableOpacity>
          </View> 
          <TouchableOpacity style={styles.chattingButton} onPress={signInUser}>
            <Text style={styles.chattingText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   justifyContent: 'center',
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: "flex-end",

  },
  whiteBackground: {
    backgroundColor: "white"
  },
  screenOneContainer: {
    backgroundColor: "white",
    alignItems: 'center',
    margin: 30,
    height: '44%',
    width: '88%',
  },
  buttonOne: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  buttonTwo: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  buttonThree: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  buttonFour: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    margin: 10,
  },
  chattingButton: {
    backgroundColor: '#757083',
    width: '88%',
    height: 50,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chattingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
})

export default StartScreen;