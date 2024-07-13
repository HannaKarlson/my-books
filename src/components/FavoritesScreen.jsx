import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Book from './Book';
import InfoView from './InfoView';
import {selectFavorites} from '../store/favorites';
import {EMPTY_LIST} from '../constants';

const EmptyList = () => {
  return <InfoView info={EMPTY_LIST} />;
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
