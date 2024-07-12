import React from 'react';
import {View, StyleSheet} from 'react-native';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import AppInput from './AppInput';
import SearchButton from './SearchButton';

const Header = ({
  onChangeTitle,
  onChangeAuthor,
  onSearchBooks,
  validSearch,
  authorError,
  titleError,
}) => {
  console.log({validSearch});
  return (
    <View style={styles.container}>
      <AppInput
        icon={faBook}
        placeholder="Title"
        onChangeText={text => onChangeTitle(text)}
        error={titleError}
      />
      <AppInput
        icon={faUserPen}
        placeholder="Author"
        onChangeText={text => onChangeAuthor(text)}
        error={authorError}
      />
      <SearchButton onPress={onSearchBooks} validSearch={validSearch} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
