import {
  FORBIDDEN_CHARS_ERROR,
  NETWORK_ERROR,
  INVALID_SEARCH,
} from './constants';

export const getErrorExplained = error => {
  if (error === FORBIDDEN_CHARS_ERROR) {
    return 'The use of *, +, & and # is not allowed';
  }
  if (error === NETWORK_ERROR) {
    return 'It seems that you have weak of no access to the internet. Check your connection and retry.';
  }
  if (error === INVALID_SEARCH) {
    return 'To search for books you must type title and/or author in the respective text input fields.';
  }
};
