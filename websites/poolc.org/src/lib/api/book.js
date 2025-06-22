import client from './client';

export const getBooks = () => client.get('/book');

export const getBook = (bookID) => client.get(`/book/${bookID}`);

export const createBook = ({ title, author, imageURL, info }) =>
  client.post(`/book`, {
    title,
    author,
    imageURL,
    info,
  });

export const updateBook = ({ bookID, title, author, imageURL, info }) =>
  client.put(`/book/${bookID}`, {
    title,
    author,
    imageURL,
    info,
  });

export const deleteBook = (bookID) => client.delete(`/book/${bookID}`);

export const borrowBook = (bookID) => client.put(`/book/borrow/${bookID}`);

export const returnBook = (bookID) => client.put(`/book/return/${bookID}`);
