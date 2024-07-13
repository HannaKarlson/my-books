import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {selectColormode} from '../store/colormode';
import colors, {getThemeColors} from '../theme/colors';

const AppInput = ({icon, error, ...props}) => {
  const {iconColor, buttonColor, textColor} = getThemeColors(
    useSelector(selectColormode),
  );
  return (
    <View
      testID="app-input"
      style={[
        styles.container,
        {backgroundColor: buttonColor},
        error && {borderColor: colors.error},
      ]}>
      {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}
      <TextInput
        {...props}
        style={[styles.input, {color: textColor}]}
        placeholderTextColor={iconColor}
        showSoftInputOnFocus={true}
        autoCorrect={false}
        autoComplete="off"
        maxLength={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    marginHorizontal: 5,
    flex: 1,
  },
});

export default AppInput;
