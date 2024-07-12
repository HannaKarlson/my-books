import axios from 'axios';
import {BASE_URL} from './constants';
import {
  BAD_REQUEST_ERROR,
  PERMISSION_DENIED_ERROR,
  NOT_FOUND_ERROR,
  NETWORK_ERROR,
  INTERNAL_SERVER_ERROR,
  DEFAULT_ERROR,
  INVALID_SEARCH,
} from './constants';

const switchErrorStatus = status => {
  switch (status) {
    case 400:
      return BAD_REQUEST_ERROR;
    case 403:
      return PERMISSION_DENIED_ERROR;
    case 404:
      return NOT_FOUND_ERROR;
    case 500:
      return INTERNAL_SERVER_ERROR;
    default:
      return DEFAULT_ERROR;
  }
};

export const fetchBooks = async ({author, title}) => {
  let composedUrl = '';
  const trimmedTitle = title.trim().replace(/ /g, '+');
  const trimmedAuthor = author.trim().replace(/ /g, '+');
  // if title and author
  if (trimmedAuthor && trimmedTitle) {
    console.log('in if fetch', author, title);

    composedUrl = `${BASE_URL}title=${trimmedTitle}&author=${trimmedAuthor}&limit=10`;
  }
  //if title
  else if (trimmedTitle) {
    console.log('we have just title');
    composedUrl = `${BASE_URL}title=${trimmedTitle}&limit=10`;
  }
  //if author
  else if (trimmedAuthor) {
    console.log('we have just author');
    composedUrl = `${BASE_URL}author=${trimmedAuthor}&limit=10`;
  }
  // if neither throw error
  else {
    throw INVALID_SEARCH;
  }

  try {
    const response = await axios.get(composedUrl);
    const numFound = response.data.numFound;
    const mappedResult = response.data.docs.map(item => ({
      authorNames: item.author_name,
      title: item.title,
      imageUrl: item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        : null,
      key: item.key,
    }));

    return {data: mappedResult, numFound: numFound, searchUrl: composedUrl};
  } catch (e) {
    if (!e.response) {
      throw NETWORK_ERROR;
    } else {
      throw switchErrorStatus(e.response.status);
    }
  }
};

export const fetchMoreBooks = async ({offset, searchUrl}) => {
  try {
    const response = await axios.get(`${searchUrl}&offset=${offset}`);
    const mappedResult = response.data.docs.map(item => ({
      authorNames: item.author_name,
      title: item.title,
      imageUrl: item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        : null,
      key: item.key,
    }));
    return mappedResult;
  } catch (e) {
    console.log(e);
  }
};

export const fetchBookDetails = async worksKey => {
  try {
    const response = await axios.get(`https://openlibrary.org/${worksKey}`);
    return response.data;
  } catch (e) {}
};
