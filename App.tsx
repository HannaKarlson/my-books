/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useRef, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  // Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {fetchBooks, fetchMoreBooks} from './src/services';
import Header from './src/components/Header';
import BookList from './src/components/BookList';
import Book from './src/components/Book';
import colors from './src/theme/colors';
import HomeScreen from './src/components/HomeScreen';
import BookDetailsScreen from './src/components/BookDetailsScreen';
import FavoritesScreen from './src/components/FavoritesScreen';
//

const Stack = createNativeStackNavigator();

const App = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState(null);
  const numFoundRef = useRef()
  const searchUrlRef = useRef()
  const currentSearchRef = useRef()
  const [isLoading, setIsLoading] = useState(false);
  // put colormode in redux
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark50 : colors.white,
  };

  const handleChangeAuthor = useCallback(text => setAuthor(text), []);
  const handleChangeTitle = useCallback(text => setTitle(text), []);
  const handleSearchBooks = async () => {
    console.log('search', title, author);
    setIsLoading(true);
    try {
      const {data, numFound, searchUrl} = await fetchBooks({author, title});
      setBooks(data);
      numFoundRef.current = numFound
      searchUrlRef.current = searchUrl
      currentSearchRef.current = {numFound:numFound, searchUrl:searchUrl}
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    //error handling
  };
  console.log('numFoundRef.current',numFoundRef.current)
  console.log('searchUrl', searchUrlRef.current)
  console.log('currentSearchRef', currentSearchRef.current)
  const loadMoreElements = async() => {
    console.log('in function')
    const {numFound, searchUrl} = currentSearchRef?.current
    if(numFound > books.length && searchUrl){
      console.log('in if')
    const moreData = await fetchMoreBooks({offset:books.length, searchUrl})
    console.log({moreData})
    setBooks([...books, ...moreData])
    }
 
  }
const renderContent = () => {
  if(books === null && !isLoading){
    return <View><Text>Welcome</Text></View>
  }
  if(isLoading){
    return <View><Text>loading</Text></View>
  }
  return <BookList books={books} loadMoreElements={loadMoreElements}/>
}
return(
  <NavigationContainer>
    <Stack.Navigator screenOptions={{contentStyle:{backgroundColor:'white'}, headerShadowVisible:false}}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name='BookDetailsScreen' component={BookDetailsScreen} options={{title:''}} />
      <Stack.Screen name='FavoritesScreen' component={FavoritesScreen} options={{title:'Favorites'}}/>
    </Stack.Navigator>
  </NavigationContainer>
)
  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     <Header
  //       onChangeAuthor={handleChangeAuthor}
  //       onChangeTitle={handleChangeTitle}
  //       onSearchBooks={handleSearchBooks}
  //       validSearch={title.trim().length || author.trim().length}
  //     />
  //     {renderContent()}
  //     {/* {isLoading ? (
  //       <View>
  //         <Text>loading</Text>
  //       </View>
  //     ) : (
  //       <BookList books={books} />
  //     )} */}
  //   </SafeAreaView>
  // );
};




const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
