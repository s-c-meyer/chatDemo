# Meyer's Messages 📱📨

This is a chat app that was built using React Native and tested using an Android Emulator and my iPhone. The app provides users with a chat interface and options to share their location and share images. Images may be shared either from the devices media library, or directly from the camera within the app.  

<br>
  
<div align=center>
  <img src="https://github.com/s-c-meyer/chatDemo/assets/127259009/1a42234d-dc6e-448a-b70e-a301ff17e839" width="30%" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/s-c-meyer/chatDemo/assets/127259009/00f29c76-04ac-4135-815a-90c7fa4c9d1b" width="30%" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/s-c-meyer/chatDemo/assets/127259009/c68362d7-b7e5-4dd4-a856-eb9910442d45" width="30%" />
</div>





## App Features
- Change the background color of the chat screen
- Send images from media library or from your device's camera
- Share your location with another user
  


## Get the Chat App up and running! 
### Node.js
Be sure you have [Node.js installed on your device](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

Expo recommends running on the latest LTS release, so run `nvm install lts` in your project terminal

<br>

### Expo 
This app uses Expo for developing and testing. In your project terminal also run `npm install -g expo-cli` to install expo globally

Install Expo Go on your device, either [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US&pli=1), to run the project on. 

Sign up for an [Expo Account](expo.dev) to be able to run the app on your device 

<br>

### Google Firebase
This app uses Google Firebase to store the data for the chat app, including the messages and the images. Follow the below instructions to set up the database to receive data from the app.

1. Start off at the [Google Firebase](https://firebase.google.com/) homepage. From there, click **Sign-In** in the upper right corner, and sign in using a Google login
2. On the next screen, click on **Create a Project**, enter a name for the project and click **Continue**
3. On Step 2 out of 3, uncheck *Enable Google Analytics for this project* and click **Create Project**
4. Wait until your project is created and click **Continue**
5. On the left hand side, click on **Build** and then **Firestore Database** from the dropdown, then select **Create Database**
6. This will bring up a popup. For the first step keep everything default and click **Next**, then be sure *Start in production mode* is selected and click **Enable**
7. On the next screen there are 4 tabs: Data, Rules, Indexes, and Usage. Click on **Rules**
8. Change `allow read, write: if false;` to `allow read, write, if true;` and click **Publish**
9. On the left hand side, click on **Build** and then **Storage** from the dropdown, then select **Get Started**
10. This will bring up a popup. Be sure *Start in production mode* is selected and click **Next**
11. On the next step, simply click **Done**
12. On the next screen there are 3 tabs: Files, Rules, and Usage. Click on **Rules**
13. Change `allow read, write: if false;` to `allow read, write, if true;` and click **Publish**
14. Finally, on the left hand side click on **Project Overview**
15. Click on the icon that has the **</>** symbol on it to link the database to the app
16. Give the app a nickname and click **Register app**
17. Copy all of the code that is included in `const firebaseConfig = { all of the code in here! };` and replace everything in `const firebaseConfig = { replace everything in here! };` from App.js shown below:

https://github.com/s-c-meyer/chatDemo/blob/b34510badb6bcdaf0ff8a1496e10364dd9920e93/App.js#L18-L31


You now have Google Firebase setup to house data for your messages and your images!

<br>

### Necessary Libraries
Run the following commands in the project terminal to ensure you have all the correct libraries for the app to function:
```
npm install --save @react-navigation/native @react-navigation/native-stack
npm install react-native-gifted-chat --save
npm install firebase --save
expo install react-native-screens react-native-safe-area-context
expo install @react-native-async-storage/async-storage
expo install @react-native-community/netinfo
expo install expo-image-picker
expo install expo-media-library
expo install expo-location
expo install react-native-maps
```
