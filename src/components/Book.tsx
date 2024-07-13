import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector as useSelector} from '../store/hooks';
import {selectColormode} from '../store/colormode';
import Cover from './Cover';
import AppText from './AppText';
import colors from '../theme/colors';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import type {Book as BookType} from '../types';

type Props = {
  book: BookType;
};

const Book = ({book}: Props) => {
  const {title, authors, imageUrl} = book;
  const colormode = useSelector(selectColormode);
  const isDarkMode = colormode === 'dark';
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.dark100 : colors.dark900},
      ]}
      onPress={() =>
        navigation.navigate('BookDetailsScreen', {
          book,
        })
      }>
      <Cover imageUrl={imageUrl} style={styles.image} />
      <View style={styles.textContainer}>
        <AppText header numberOfLines={3}>
          {title}
        </AppText>
        <AppText
          style={{color: isDarkMode ? colors.dark600 : colors.dark300}}
          numberOfLines={3}>
          {authors && authors.join(', ')}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default Book;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 170,
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
