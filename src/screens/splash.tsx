import React, {useEffect} from 'react';
import {View,Image, StyleSheet} from 'react-native';
import * as COLORS from '../constants/colors';
import {useAuth} from '@realm/react';
import splashImage from "../assets/images/splash.gif"

const RealmLogin = () => {
  const {logInWithAnonymous} = useAuth();
    logInWithAnonymous();

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.imageContainer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: COLORS.SPLASH_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    width:"100%",
    height:300,
    resizeMode:"contain"
  }
});

export default RealmLogin;
