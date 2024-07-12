import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';

const EmptyList = () => (
  <View style={styles.container}>
    <AppText header>No match found</AppText>
    <AppText style={styles.text}>
      Try changing the searched author and/or title
    </AppText>
  </View>
);

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50%',
  },
  text: {
    marginTop: 10,
  },
});
