import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../theme/colors';

type Props = {
  title: string,
  authors: string[],
  imageUrl: string,
};

const Book = ({title, authors, imageUrl}: Props): React.FC => {
    const [isLoading, setIsLoading] = useState(true)

  console.log({authors});
  return (
    <View style={styles.container}>
      {imageUrl ? (
        <FastImage
          source={{uri: imageUrl}}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={() => setIsLoading(false)}
          style={[styles.image, isLoading &&{backgroundColor: colors.dark500}]}
        />
      ) : (
        <View style={[styles.image, {backgroundColor: colors.dark500}]} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>

        <Text style={styles.author}>
          {authors && authors.join()}
        </Text>
      </View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 170,
    backgroundColor: colors.dark900,
    padding: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark50,
  },
  author: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.dark200,
  },
  image: {
    width: 100,
    height: 150,
  },
});
