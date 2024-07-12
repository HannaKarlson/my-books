import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Book from './Book';
import {selectFavorites} from '../store/favorites';
import {headerStyle, textStyle} from '../theme/styles';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={headerStyle}>No favorite added</Text>
      <Text style={[textStyle, styles.text]}>
        To add a book to favorites tap the heart icon in the book details page
      </Text>
    </View>
  );
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const FavoritesScreen = () => {
  const favoriteBooks = useSelector(selectFavorites);
  console.log({favoriteBooks});
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
