import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import colors from '../theme/colors';

const SearchButton = ({onPress, validSearch}) => {
  return (
    <TouchableOpacity style={[styles.button, validSearch &&{backgroundColor:colors.blue500}]} onPress={onPress}>
      <FontAwesomeIcon icon={faMagnifyingGlass} color={validSearch?colors.white:colors.dark300} />
    </TouchableOpacity>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
    backgroundColor:colors.dark800
  },
});
