import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const ChatScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const { backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello Developer!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://picsum.photos/140/140" //placeimg says it stopped serving placeholders on June 30th of this year, so I selected a different placeholder
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  };

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

  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
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