import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AppText from './AppText';
import Book from './Book';
import {selectFavorites} from '../store/favorites';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText header>No favorite added</AppText>
      <AppText style={styles.text}>
        To add a book to favorites tap the heart icon in the book details page
      </AppText>
    </View>
  );
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const FavoritesScreen = () => {
  const favoriteBooks = useSelector(selectFavorites);
  return (
    <FlatList
      data={favoriteBooks}
      renderItem={({item}) => (
        <Book
          title={item.title}
          authors={item.authors}
          imageUrl={item.imageUrl}
          worksKey={item.worksKey}
        />
      )}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={EmptyList}
    />
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  text: {
    marginTop: 20,
  },
  separator: {
    height: 5,
  },
});

export default FavoritesScreen;
