import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useAppSelector as useSelector} from '../store/hooks';
import {selectColormode} from '../store/colormode';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import colors, {getThemeColors} from '../theme/colors';

type Props = {
  onPress: () => void;
  validSearch: boolean;
};

const SearchButton = ({onPress, validSearch}: Props) => {
  const {iconColor, buttonColor} = getThemeColors(useSelector(selectColormode));
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: validSearch ? colors.blue500 : buttonColor},
      ]}
      onPress={onPress}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        color={validSearch ? colors.white : iconColor}
      />
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
    backgroundColor: colors.dark800,
  },
});
