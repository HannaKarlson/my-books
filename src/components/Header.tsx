import React from 'react';
import {View, StyleSheet} from 'react-native';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import AppInput from './AppInput';
import SearchButton from './SearchButton';

type Props = {
  onChangeTitle: (text: string) => void;
  onChangeAuthor: (text: string) => void;
  onSearchBooks: () => void;
  validSearch: boolean;
  authorError: boolean;
  titleError: boolean;
};

const Header = ({
  onChangeTitle,
  onChangeAuthor,
  onSearchBooks,
  validSearch,
  authorError,
  titleError,
}: Props) => {
  return (
    <View style={styles.container}>
      <AppInput
        icon={faBook}
        placeholder={'Title'}
        onChangeText={(text: string) => onChangeTitle(text)}
        error={titleError}
      />
      <AppInput
        icon={faUserPen}
        placeholder="Author"
        onChangeText={(text: string) => onChangeAuthor(text)}
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
