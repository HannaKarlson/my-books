import React from 'react';
import {FlatList, View, ActivityIndicator, StyleSheet} from 'react-native';
import Book from './Book';
import colors from '../theme/colors';

const renderFooter = loadMoreIsLoading => () => {
  if (loadMoreIsLoading) {
    return <ActivityIndicator color={colors.blue500} style={styles.spinner} />;
  }
  return null;
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const BookList = ({books, loadMoreElements, loadMoreIsLoading}) => {
  console.log('books in list', books);

  return (
    <FlatList
      data={books}
      onEndReachedThreshold={0.1}
      onEndReached={() => loadMoreElements()}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={renderFooter(loadMoreIsLoading)}
      keyExtractor={item => item.key}
      renderItem={({item}) => (
        <Book
          title={item.title}
          authors={item.authorNames}
          imageUrl={item.imageUrl}
          worksKey={item.key}
        />
      )}
    />
  );
};

export default BookList;

const styles = StyleSheet.create({
  spinner: {
    padding: 10,
  },
  separator: {
    height: 5,
  },
});
