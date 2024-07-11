import React from 'react';
import {FlatList, View} from 'react-native';
import Book from './Book';

const BookList = ({books, loadMoreElements}) => {
  console.log('books in list', books);


  return (
    <FlatList
      data={books}
      onEndReachedThreshold={0.1}
      onEndReached={() => loadMoreElements()}
      ItemSeparatorComponent={() => <View style={{height:5}}/>}
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
