import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../theme/colors';

const Cover = ({imageUrl, style}) => {
  const [isLoading, setIsLoading] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const opacityStyle = {opacity: opacityAnimation};

  useEffect(() => {
    const animateElement = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: 0.7,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animateElement();
  }, [opacityAnimation]);

  if (imageUrl) {
    return (
      <View>
        <FastImage
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          source={{uri: imageUrl}}
          resizeMode={FastImage.resizeMode.contain}
          style={style}
        />
        {isLoading && (
          <Animated.View
            style={[style, styles.loadingPlaceholder, opacityStyle]}
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={[style, styles.placeholder]}>
        <Text style={styles.text}>No image available</Text>
      </View>
    );
  }
};

export default Cover;

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
  loadingPlaceholder: {
    position: 'absolute',
    backgroundColor: colors.dark500,
  },
  placeholder: {
    backgroundColor: colors.dark500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
