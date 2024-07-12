import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';

const WelcomeView = () => {
  return (
    <View style={styles.container}>
      <AppText header>Find your next read</AppText>
      <AppText style={styles.text}>
        Add title and/or author to search the Open Library for books. Tap the
        heart icon in the book details page to add it to favorites.
      </AppText>
    </View>
  );
};

export default WelcomeView;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    marginTop: 10,
  },
});
