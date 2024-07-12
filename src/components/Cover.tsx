import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../theme/colors';

type Props = {
  imageUrl: string | null;
  style: Object; //change to style object
};

const Cover = ({imageUrl, style}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  if (imageUrl) {
    return (
      <FastImage
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        source={{uri: imageUrl}}
        resizeMode={FastImage.resizeMode.contain}
        style={[style, isLoading && {backgroundColor: colors.dark500}]}
      />
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
  placeholder: {
    backgroundColor: colors.dark500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
