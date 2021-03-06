import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { Scene, Router, Actions, Reducer } from "react-native-router-flux";

import { Provider } from "react-redux";
import store from "./store";
import { Stack } from "react-native-router-flux";
import LoginPage from "./src/pages/login";
import RegisterationPage from "./src/pages/registeration";
import SplashScreen from "./src/pages/splashScreen";
import Home from "./src/pages/home";
import { AppLoading, Notifications } from "expo";
import * as Font from "expo-font";
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';
import Loading from "./src/components/loading";
import ConfirmModal from "./src/components/confirmModal";
import ErrorModal from "./src/components/ErrorModal";
import PostModal from "./src/components/postModal";
import CommentModal from "./src/components/commentModal";
import JNVList from "./src/components/jnvList";
import CameraModal from "./src/components/cameraModal";
import Camera from "./src/components/camera";
import OneTimeOperation from "./src/components/oneTimeOperation";

export default class App extends React.Component {

  state = {
    isReady : false,
    notification: {},
    screenType : 'loginPage' // 'loginPage'
  };

  componentWillMount() {
    this.loadFonts();
  }

  async componentDidMount() {
    registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    let userInfo = await AsyncStorage.getItem("userInfo");
    if(userInfo){
      userInfo = JSON.parse(userInfo);
      this.setState({
        screenType : 'home'
      });
    }
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  _handleNotification = (notification) => {
    console.log(notification, "Notification");
    this.setState({notification: notification});
  };

  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
          <Scene
            type="reset"
            hideNavBar={true}
            key="loginPage"
            component={LoginPage}
            title="LoginPage"
            initial={this.state.screenType == 'loginPage'}
          />
          <Scene
            type="reset"
            hideNavBar={true}
            key="home"
            component={Home}
            title="Home"
            initial={this.state.screenType == 'home'}
          />
          <Scene
            hideNavBar={true}
            key="splashScreen"
            component={SplashScreen}
            title="splashScreen"
          />
          <Scene
            hideNavBar={true}
            key="registerationPage"
            component={RegisterationPage}
            title="RegisterationPage"
          />
          </Stack>
        </Router>
        <Loading />
        <ConfirmModal />
        <PostModal />
        <CommentModal />
        <ErrorModal />
        <CameraModal />
        <Camera />
        <OneTimeOperation />
      </Provider>
    );
  }
}
