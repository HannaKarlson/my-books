import React from 'react';
import {Pressable, StyleSheet, Keyboard} from 'react-native';
import AppText from './AppText';
import AnimationView from './AnimationView';
import {getInfoDetails} from '../utils';
import {WELCOME} from '../constants';

const dismissKeyboard = () => Keyboard.dismiss();

const InfoView = ({info}) => {
  const {text, animation} = getInfoDetails(info);
  const loop = info !== WELCOME;
  return (
    <Pressable onPress={dismissKeyboard} style={styles.container}>
      <AppText header>{info}</AppText>
      <AppText style={styles.text}>{text}</AppText>
      <AnimationView animation={animation} loop={loop} />
    </Pressable>
  );
};

export default InfoView;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    marginTop: 10,
    marginBottom: '10%',
  },
});
