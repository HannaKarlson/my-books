import axios from 'axios';
import {BASE_URL} from './constants';

export const fetchBooks = async ({author, title}) => {
  let composedUrl = '';
  const trimmedTitle = title.trim().replace(/ /g, '+');
  const trimmedAuthor = author.trim();
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
    throw 'invalid search';
  }
  // end with /books
  try {
    const response = await axios.get(composedUrl);
    console.log('response', response.data.numFound);
    const numFound = response.data.numFound;
    response.data.docs?.length &&
      console.log('response in fetch', response.data.docs[0]);
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
    // error 500
    // add error handling
    console.log(e);
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
    console.log('in load more', mappedResult);
  } catch (e) {
    console.log(e);
  }
};
