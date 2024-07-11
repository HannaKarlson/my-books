/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useRef, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import configureStore from './src/store/configureStore';
import {fetchBooks, fetchMoreBooks} from './src/services';
import Header from './src/components/Header';
import BookList from './src/components/BookList';
import Book from './src/components/Book';
import colors from './src/theme/colors';
import HomeScreen from './src/components/HomeScreen';
import BookDetailsScreen from './src/components/BookDetailsScreen';
import FavoritesScreen from './src/components/FavoritesScreen';
import {colormode,updateColormode} from './src/store/colormode';
//
const store = configureStore();
const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch()
  const currentColormode = useSelector(colormode)
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState(null);
  const numFoundRef = useRef();
  const searchUrlRef = useRef();
  const currentSearchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  //const [deviceColormode, setDeviceColormode] = useState('light')
  const deviceColormode = useColorScheme()
 // setDeviceColormode(useColorScheme())
  console.log({currentColormode})
  console.log(deviceColormode)

  useEffect(() => {

    if(deviceColormode &&deviceColormode !== currentColormode){
dispatch(updateColormode(deviceColormode))}
  },[deviceColormode, currentColormode])
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
      numFoundRef.current = numFound;
      searchUrlRef.current = searchUrl;
      currentSearchRef.current = {numFound: numFound, searchUrl: searchUrl};
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    //error handling
  };
  console.log('numFoundRef.current', numFoundRef.current);
  console.log('searchUrl', searchUrlRef.current);
  console.log('currentSearchRef', currentSearchRef.current);
  const loadMoreElements = async () => {
    console.log('in function');
    const {numFound, searchUrl} = currentSearchRef?.current;
    if (numFound > books.length && searchUrl) {
      console.log('in if');
      const moreData = await fetchMoreBooks({offset: books.length, searchUrl});
      console.log({moreData});
      setBooks([...books, ...moreData]);
    }
  };
  const renderContent = () => {
    if (books === null && !isLoading) {
      return (
        <View>
          <Text>Welcome</Text>
        </View>
      );
    }
    if (isLoading) {
      return (
        <View>
          <Text>loading</Text>
        </View>
      );
    }
    return <BookList books={books} loadMoreElements={loadMoreElements} />;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'white'},
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookDetailsScreen"
          component={BookDetailsScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{title: 'Favorites'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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

// const mapStateToProps = state => ({
//   colormode:state.colormode
// })

// const mapDispatchToProps = dispatch => ({
//   updateColormode:() => dispatch(updateColormode())
// })

// export default connect(mapStateToProps,mapDispatchToProps)(App)
const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default ConnectedApp;

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
