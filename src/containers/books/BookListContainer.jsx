import React from 'react';
import BookList from '../../components/books/BookList';

const BookListContainer = () => {
  const books = [
    {
      id: 0,
      title: '객체지향의 사실과 오해',
      author: '조영호',
      imageURL:
        'http://image.yes24.com/momo/TopCate511/MidCate005/51040273.jpg',
      status: 'available',
      borrower: [],
      info: '',
      borrowDate: '2021-02-18',
    },
    {
      id: 1,
      title: '클린 코드',
      author: '양정일',
      imageURL: 'http://image.yes24.com/Goods/11681152/L',
      status: 'available',
      borrower: [],
      info: '박형철 기증',
      borrowDate: '2021-02-18',
    },
    {
      id: 2,
      title: '리액트를 다루는 기술',
      author: 'Velopert',
      imageURL: 'http://image.yes24.com/goods/78233628/800x0',
      status: 'unavailable',
      borrower: { id: 0, name: '김민지' },
      info: '박형철 기증',
      borrowDate: '2021-02-18',
    },
  ];
  return <BookList books={books} />;
};

export default BookListContainer;
