import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {headerStyle, textStyle} from '../theme/styles';

const EmptyList = () => (
  <View style={styles.container}>
    <Text style={headerStyle}>No match found</Text>
    <Text style={textStyle}>Try changing the searched author and/or title</Text>
  </View>
);

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50%',
  },
});
