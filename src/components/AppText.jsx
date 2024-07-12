import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectColormode} from '../store/colormode';
import colors from '../theme/colors';

const AppText = ({children, header, style, ...props}) => {
  const textColor =
    useSelector(selectColormode) === 'dark' ? colors.white : colors.dark50;
  return (
    <Text
      style={[{color: textColor}, header ? styles.header : styles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  header: {
    fontWeight: '600',
    fontSize: 18,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
  },
});
