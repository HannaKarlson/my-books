import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import LottieView, {AnimationObject} from 'lottie-react-native';

const deviceWidth = Dimensions.get('window').width;

type Props = {
  animation: AnimationObject;
  loop: boolean;
};

const AnimationView = ({animation, loop}: Props) => (
  <View style={styles.container}>
    <LottieView
      style={styles.lottieView}
      source={animation}
      autoPlay
      loop={loop}
    />
  </View>
);

export default AnimationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  lottieView: {
    height: deviceWidth,
    width: deviceWidth,
  },
});
