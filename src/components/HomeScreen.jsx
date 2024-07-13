import React, {useState, useRef, useCallback} from 'react';
import {SafeAreaView, StatusBar, Keyboard} from 'react-native';
import {fetchBooks, fetchMoreBooks} from '../services';
import Header from './Header';
import BookList from './BookList';
import Fab from './Fab';
import LoadingSkeleton from './LoadingSkeleton';
import InfoView from './InfoView';
import colors from '../theme/colors';
import {useSelector} from 'react-redux';
import {selectColormode} from '../store/colormode';
import {FORBIDDEN_CHARS, FORBIDDEN_CHARS_ERROR, WELCOME} from '../constants';

const HomeScreen = () => {
  const colormode = useSelector(selectColormode);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState(null);
  const [error, setError] = useState();
  const numFoundRef = useRef();
  const searchUrlRef = useRef();
  const currentSearchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreIsLoading, setLoadMoreIsLoading] = useState(false);
  const isDarkMode = colormode === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark50 : colors.white,
  };

  const handleChangeAuthor = useCallback(text => setAuthor(text), []);
  const handleChangeTitle = useCallback(text => setTitle(text), []);
  const handleSearchBooks = async () => {
    setError('');
    Keyboard.dismiss();
    if (FORBIDDEN_CHARS.test(author) || FORBIDDEN_CHARS.test(title)) {
      return setError(FORBIDDEN_CHARS_ERROR);
    }

    setIsLoading(true);
    try {
      const {data, numFound, searchUrl} = await fetchBooks({
        author,
        title,
      });
      setBooks(data);
      numFoundRef.current = numFound;
      searchUrlRef.current = searchUrl;
      currentSearchRef.current = {numFound: numFound, searchUrl: searchUrl};
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreElements = async () => {
    const {numFound, searchUrl} = currentSearchRef?.current;
    if (numFound > books.length && searchUrl) {
      setLoadMoreIsLoading(true);
      try {
        const moreData = await fetchMoreBooks({
          offset: books.length,
          searchUrl,
        });
        setBooks([...books, ...moreData]);
        setLoadMoreIsLoading(false);
      } catch {
        setLoadMoreIsLoading(false);
      }
    }
  };
  const renderContent = () => {
    if (error) {
      return <InfoView info={error} />;
    }
    if (books === null && !isLoading) {
      return <InfoView info={WELCOME} />;
    }
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    return (
      <BookList
        books={books}
        loadMoreElements={loadMoreElements}
        loadMoreIsLoading={loadMoreIsLoading}
      />
    );
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
        titleError={FORBIDDEN_CHARS.test(title)}
        authorError={FORBIDDEN_CHARS.test(author)}
        validSearch={
          !FORBIDDEN_CHARS.test(title) &&
          !FORBIDDEN_CHARS.test(author) &&
          (title.trim().length || author.trim().length)
        }
      />
      {renderContent()}
      <Fab />
    </SafeAreaView>
  );
};

export default HomeScreen;
