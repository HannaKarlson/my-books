import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {selectColormode} from '../store/colormode';
import Cover from './Cover';
import colors, {getThemeColors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';

const Book = ({title, authors, imageUrl, worksKey}) => {
  const colormode = useSelector(selectColormode);
  const isDarkMode = colormode === 'dark';

  const {textColor} = getThemeColors(colormode);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.dark100 : colors.dark900},
      ]}
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
        <Text style={[styles.title, {color: textColor}]} numberOfLines={3}>
          {title}
        </Text>

        <Text
          style={[
            styles.author,
            {color: isDarkMode ? colors.dark600 : colors.dark300},
          ]}>
          {authors && authors.join()}
        </Text>
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
