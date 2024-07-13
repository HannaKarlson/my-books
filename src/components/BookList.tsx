import React from 'react';
import {FlatList, View, ActivityIndicator, StyleSheet} from 'react-native';
import Book from './Book';
import colors from '../theme/colors';
import InfoView from './InfoView';
import {NO_MATCH} from '../constants';
import type {Book as BookType} from '../types';

type BookListProps = {
  books: BookType[];
  loadMoreElements: Function;
  loadMoreIsLoading: boolean;
};

const renderFooter = (loadMoreIsLoading: boolean) => () => {
  if (loadMoreIsLoading) {
    return <ActivityIndicator color={colors.blue500} style={styles.spinner} />;
  }
  return null;
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;
const EmptyList = () => <InfoView info={NO_MATCH} />;

const BookList = ({
  books,
  loadMoreElements,
  loadMoreIsLoading,
}: BookListProps) => {
  return (
    <FlatList
      contentContainerStyle={styles.contentContaier}
      data={books}
      onEndReachedThreshold={0.1}
      onEndReached={() => loadMoreElements()}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={renderFooter(loadMoreIsLoading)}
      ListEmptyComponent={EmptyList}
      keyExtractor={item => item.key}
      renderItem={({item}) => <Book book={item} />}
    />
  );
};

export default BookList;
export {ItemSeparatorComponent};

const styles = StyleSheet.create({
  contentContaier: {
    paddingBottom: 20,
  },
  spinner: {
    padding: 10,
  },
  separator: {
    height: 5,
  },
});
