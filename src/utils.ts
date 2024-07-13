import {AnimationObject} from 'lottie-react-native';
import {
  FORBIDDEN_CHARS_ERROR,
  NETWORK_ERROR,
  INVALID_SEARCH,
  WELCOME,
  NO_MATCH,
  EMPTY_LIST,
} from './constants';
import books from '../assets/books.json';
import empty from '../assets/empty.json';
import error from '../assets/error.json';
import networkError from '../assets/networkError.json';
import notFound from '../assets/notFound.json';
import typo from '../assets/typo.json';

type InfoDetails = {
  text: string;
  animation: AnimationObject;
};

export const getInfoDetails = (info: string): InfoDetails => {
  if (info === WELCOME) {
    return {
      text: 'Add title and/or author to search the Open Library for books. Tap the heart icon in the book details page to add it to favorites.',
      animation: books,
    };
  }
  if (info === NO_MATCH) {
    return {
      text: 'Try changing the searched author and/or title.',
      animation: notFound,
    };
  }
  if (info === EMPTY_LIST) {
    return {
      text: 'To add a book to favorites tap the heart icon in the book details page.',
      animation: empty,
    };
  }
  if (info === FORBIDDEN_CHARS_ERROR) {
    return {
      text: 'The use of *, +, & and # is not allowed',
      animation: typo,
    };
  }
  if (info === NETWORK_ERROR) {
    return {
      text: 'It seems that you have weak of no access to the internet. Check your connection and retry.',
      animation: networkError,
    };
  }
  if (info === INVALID_SEARCH) {
    return {
      text: 'To search for books you must type title and/or author in the respective text input fields.',
      animation: notFound,
    };
  }
  return {
    text: 'Something went wrong.',
    animation: error,
  };
};
