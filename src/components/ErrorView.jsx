import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';
import {getErrorExplained} from '../utils';

const ErrorView = ({error}) => (
  <View style={styles.container}>
    <AppText header>{error}</AppText>
    <AppText style={styles.errorExplained}>{getErrorExplained(error)}</AppText>
  </View>
);

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  errorExplained: {
    marginTop: 10,
  },
});
