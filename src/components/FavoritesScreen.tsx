import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useAppSelector as useSelector} from '../store/hooks';
import Book from './Book';
import InfoView from './InfoView';
import {selectFavorites} from '../store/favorites';
import {EMPTY_LIST} from '../constants';
import type {Book as BookType} from '../types';

const EmptyList = () => {
  return <InfoView info={EMPTY_LIST} />;
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const FavoritesScreen = () => {
  const favoriteBooks: BookType[] = useSelector(selectFavorites);
  return (
    <FlatList
      data={favoriteBooks}
      renderItem={({item}) => <Book book={item} />}
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
    marginTop: '50%',
  },
  text: {
    marginTop: 20,
  },
  separator: {
    height: 5,
  },
});

export default FavoritesScreen;
