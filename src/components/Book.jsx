import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Cover from './Cover';
import colors from '../theme/colors';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string,
  authors: string[],
  imageUrl: string,
  key: string,
};

const Book = ({title, authors, imageUrl, worksKey}: Props): React.FC => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  console.log({authors});
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('BookDetailsScreen', {
          title,
          imageUrl,
          authors,
          worksKey,
        })
      }>
      <Cover imageUrl={imageUrl} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>

        <Text style={styles.author}>{authors && authors.join()}</Text>
      </View>
    </TouchableOpacity>
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
