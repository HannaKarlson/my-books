import React, {PropsWithChildren} from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import {useAppSelector as useSelector} from '../store/hooks';
import {selectColormode} from '../store/colormode';
import colors from '../theme/colors';

type Props = {
  header?: boolean;
  style?: TextStyle;
  props?: TextProps;
  numberOfLines?: number;
};

const AppText = ({
  children,
  header,
  numberOfLines,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  const textColor =
    useSelector(selectColormode) === 'dark' ? colors.white : colors.dark50;
  return (
    <Text
      style={[{color: textColor}, header ? styles.header : styles.text, style]}
      numberOfLines={numberOfLines}
      {...props}>
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
