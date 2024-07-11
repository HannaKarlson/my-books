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

import {fetchBooks, fetchMoreBooks} from '../services';
import Header from './Header';
import BookList from './BookList';
import Book from './Book';
import Fab from './Fab';
import colors from '../theme/colors';
//

const HomeScreen = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState(null);
  const numFoundRef = useRef();
  const searchUrlRef = useRef();
  const currentSearchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreIsLoading, setLoadMoreIsLoading] = useState(false);
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
      setLoadMoreIsLoading(true);
      try {
        const moreData = await fetchMoreBooks({
          offset: books.length,
          searchUrl,
        });
        console.log({moreData});
        setBooks([...books, ...moreData]);
        setLoadMoreIsLoading(false);
      } catch {
        setLoadMoreIsLoading(false);
      }
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header
        onChangeAuthor={handleChangeAuthor}
        onChangeTitle={handleChangeTitle}
        onSearchBooks={handleSearchBooks}
        validSearch={title.trim().length || author.trim().length}
      />
      {renderContent()}
      <Fab/>
    </SafeAreaView>
  );
};

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//           <Header/>
//               <Button title='Press me' onPress={() => fetchBooks()}/>
//         {/* <Header />

//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View> */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

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

export default HomeScreen;
