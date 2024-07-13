import React, {useState, useRef, useCallback} from 'react';
import {SafeAreaView, StatusBar, Keyboard} from 'react-native';
import {fetchBooks, fetchMoreBooks} from '../services';
import Header from './Header';
import BookList from './BookList';
import Fab from './Fab';
import LoadingSkeleton from './LoadingSkeleton';
import InfoView from './InfoView';
import colors from '../theme/colors';
import {useAppSelector as useSelector} from '../store/hooks';
import {selectColormode} from '../store/colormode';
import {FORBIDDEN_CHARS, FORBIDDEN_CHARS_ERROR, WELCOME} from '../constants';
import {Book} from '../types';

const HomeScreen = () => {
  const colormode = useSelector(selectColormode);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState('');
  const currentSearchRef = useRef({numFound: 0, searchUrl: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreIsLoading, setLoadMoreIsLoading] = useState(false);
  const isDarkMode = colormode === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark50 : colors.white,
  };

  const handleChangeAuthor = useCallback((text: string) => setAuthor(text), []);
  const handleChangeTitle = useCallback((text: string) => setTitle(text), []);
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
      currentSearchRef.current = {numFound: numFound, searchUrl: searchUrl};
    } catch (e) {
      if (typeof e === 'string') {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreElements = async () => {
    const {numFound, searchUrl} = currentSearchRef?.current;
    if (books?.length && numFound > books?.length && searchUrl) {
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
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (books !== null) {
      return (
        <BookList
          books={books}
          loadMoreElements={loadMoreElements}
          loadMoreIsLoading={loadMoreIsLoading}
        />
      );
    }
    return <InfoView info={WELCOME} />;
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
        validSearch={Boolean(
          !FORBIDDEN_CHARS.test(title) &&
            !FORBIDDEN_CHARS.test(author) &&
            (title.trim().length || author.trim().length),
        )}
      />
      {renderContent()}
      <Fab />
    </SafeAreaView>
  );
};

export default HomeScreen;
