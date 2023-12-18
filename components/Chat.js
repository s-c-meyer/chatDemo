import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const ChatScreen = ({ db, route, isConnected, storage }) => {
  const { name } = route.params;
  const { userID } = route.params
  const { backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('cached_messages') || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('cached_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  let unsubMessages;

  useEffect(() => {
    if(isConnected === true) {

      //unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //Clean up code, code to execute when the component is unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]) //the message to be added will be the first one in the newMessages array, hence newMessages[0]
  };

  //Change the default colors of the text bubbles in the chat app
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        },
      }}
    />
  }

  //if there is no connection detected, do not show the InputToolbar
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />
    else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  //if you need to render multiple custom views, you would put a switch case or if else statement in this function
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
        minComposerHeight={40}
        maxComposerHeight={100}
      />
      {/*the two lines below prevent the keyboard from blocking the view. For Androids, use height, and for iOS, use padding */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
      {/* Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ChatScreen;