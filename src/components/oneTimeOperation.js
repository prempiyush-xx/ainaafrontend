import React, { useReducer, useState, useContext, useRef, useEffect } from 'react';
import {
  Container,
  Content,
} from "native-base";
import {AsyncStorage} from 'react-native';
import {
  Color,
  viewObj,
  textObj
} from "../global/util";
import { useDispatch, useSelector } from 'react-redux';
import HeaderSection from "./../components/header";
import JNVList from "./../components/jnvList";
import { setData, updateUserDetails, getUserDetail } from "./../redux/action";
import { Text, View, TextInput, Image, Touch, SearchModal } from './../ui-kit';
const firebase = require("firebase");

var firebaseConfig = {
    apiKey: "AIzaSyBbbVxbYovm9y89nFZbbMPTL4TygadG4pA",
    authDomain: "ainaa-a27c5.firebaseapp.com",
    databaseURL: "https://ainaa-a27c5.firebaseio.com",
    projectId: "ainaa-a27c5",
    storageBucket: "ainaa-a27c5.appspot.com",
    messagingSenderId: "312253846320",
    appId: "1:312253846320:web:cb0ce51fc16c70ae742ef5",
    measurementId: "G-4KGQX82H92"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var dbRef = firebase.database().ref();

export default () => {

    useEffect(() => {
        this.getJnvList();
        this.getBloodGroupList();
        this.getCityAndStateList();
        this.getUserDetails();
    }, []);

    const dispatch = useDispatch()
    const setDataAction = (arg) => dispatch(setData(arg))
    getUserDetails = async () => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        dispatch(getUserDetail(userInfo._id))
    }

    getJnvList = () => {
        var dailyPricesRef = dbRef.child('jnvList/');
        dailyPricesRef.once('value', (data) => {
           let jnvList = data.val();
           setDataAction({ jnvList });
        }).catch(() => {
            // alert("OOPS something went wrong");
        });
    }

    getBloodGroupList = () => {
        var dailyPricesRef = dbRef.child('bloodGroup/');
        dailyPricesRef.once('value', (data) => {
           let bloodGroupList = data.val();
           setDataAction({ bloodGroupList });
        }).catch(() => {
            // alert("OOPS something went wrong");
        });
    }

    getCityAndStateList = () => {
        var dailyPricesRef = dbRef.child('stateAndCity/');
        dailyPricesRef.once('value', (data) => {
           let stateAndCity = data.val();
           let cityList = [];
           let stateList = [];
           for (let key in stateAndCity){
                cityList.push(...stateAndCity[key]);
                stateList.push({ id : key, name : key});
           }
           setDataAction({ cityList, stateList });
        }).catch(() => {
            // alert("OOPS something went wrong");
        });
    }

    return <></>
}