import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React,{} from 'react';
import { Alert, View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import IndexFile from './src';
import EStyleSheet from 'react-native-extended-stylesheet';
import Codepush from 'react-native-code-push';
import PushNotification from "react-native-push-notification";
import Firebase from '@react-native-firebase/app';
import { useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({
  $rem: entireScreenWidth / (Platform.OS == 'ios' ? 380 : 450),
});



const CODEPUSH_OPTIONS = { checkFrequency: Codepush.CheckFrequency.ON_APP_START,updateDialog: true};

const slides = [
  {
    key: "1",
    title: 'BookOcean',
    text: 'Largest free ebook library\n\nGo anywhere, Read everyday, For free',
    image: require('./assets/images/intro1.png'),
    backgroundColor: 'black',
  },
  {
    key: "2",
    title: 'GTU University',
    text: 'Get syllabus, question paper, circular,\n\nand many more for GTU student',
    image: require('./assets/images/intro2.png'),
    backgroundColor: '#E1EDFD',
  },
  {
    key: "3",
    title: 'Categories',
    text: 'Find your book more precisely\n\nin 23 categories and 296 sub-categories',
    image: require('./assets/images/intro3.png'),
    backgroundColor: '#D5FDF7',
  },
  {
    key: "4",
    title: 'Manage in App',
    text: 'Manage your downloads, favourites\n\nand read book in App',
    image: require('./assets/images/intro4.png'),
    backgroundColor: '#E7F3FF',
  }
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 25
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginTop: 25,
    textAlign: 'center',
  },
  title: {
    fontSize: 35,
    letterSpacing: 0.5,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});


class App extends React.Component {


  state = {
    showRealApp: undefined
  }
  
  themecolor;

  getIntroDone = async () => {
    try {

      return await AsyncStorage.getItem('INTRO_DONE')
    } catch (e) {
      // read error
    }

    console.log('Done.')

  }



  setIntroDone = async (value) => {
    try {
      await AsyncStorage.setItem('INTRO_DONE', value)
    } catch (e) {
      console.log(e);
    }

    console.log('Done.')
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  _renderNextButton = () => {
    return (
      <View style={{ paddingTop: 3 }}>
        <Icon
          name="arrow-right-circle"
          color="black"
          size={40}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={{ paddingTop: 3 }}>
        <Ionicons
          name="checkmark-circle"
          color="black"
          size={40}
        />
      </View>
    );
  };


  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setIntroDone("true");
    this.setState({ showRealApp: "true" });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async splash() {
    SplashScreen.show()
    console.log(await this.getIntroDone());
    this.setState({ showRealApp: await this.getIntroDone() });
    await this.sleep(2000);
    SplashScreen.hide();
  }

  

  componentDidMount() {
    // this.splash();
    

    // Codepush.sync({ installMode: Codepush.InstallMode.IMMEDIATE })

    //notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      PushNotification.localNotification({
        channelId: "firebase-foreground",
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        bigPictureUrl: remoteMessage.notification.android.imageUrl
      });
    });

    PushNotification.createChannel(
      {
        channelId: "firebase-foreground", // (required)
        channelName: "Firebase FG", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        console.log(PushNotification.FetchResult);
        notification.finish(PushNotification.FetchResult?.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

    return unsubscribe;

  }

  render() {
    // LogBox.ignoreAllLogs(true);\
  
    // return  (this.state.showRealApp === "true") ?
  return (
        <NavigationContainer>
          <Provider store={store}>
            <IndexFile />
          </Provider>
        </NavigationContainer>
      ) ;
      // : (
      //   <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone} renderDoneButton={this._renderDoneButton}
      //     renderNextButton={this._renderNextButton} />
      // );
  }
}


export default Codepush(CODEPUSH_OPTIONS)(App);
 

// appcenter codepush release-react -a  bookocean/bookocean-rn -d Staging