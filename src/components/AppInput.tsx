import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {selectColormode} from '../store/colormode';
import colors, {getThemeColors} from '../theme/colors';

type Props = {
  icon: IconProp;
  error: boolean;
  placeholder: string;
  onChangeText: (text: string) => void;
};

const AppInput = ({icon, error, placeholder, onChangeText}: Props) => {
  const {iconColor, buttonColor, textColor} = getThemeColors(
    useSelector(selectColormode),
  );
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: buttonColor},
        error && {borderColor: colors.error},
      ]}>
      {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}
      <TextInput
        style={[styles.input, {color: textColor}]}
        placeholderTextColor={iconColor}
        showSoftInputOnFocus={true}
        autoCorrect={false}
        autoComplete="off"
        maxLength={100}
        placeholder={placeholder}
        onChangeText={onChangeText}
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
