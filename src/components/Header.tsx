import React from 'react';
import {View, StyleSheet} from 'react-native';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import AppInput from './AppInput';
import SearchButton from './SearchButton';

const Header: React.JSX.Element = ({
  onChangeTitle,
  onChangeAuthor,
  onSearchBooks,
  validSearch,
}) => {
  return (
    <View style={styles.container}>
      <AppInput
        icon={faBook}
        placeholder="Title"
        onChangeText={text => onChangeTitle(text)}
      />
      <AppInput
        icon={faUserPen}
        placeholder="Author"
        onChangeText={text => onChangeAuthor(text)}
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
