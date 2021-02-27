import AdminBook from '../../../components/admin/AdminBook/AdminBook';
import React, { useEffect, useState } from 'react';
import * as bookAPI from '../../../lib/api/book';

const AdminBookContainer = () => {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await bookAPI.getBooks();
      console.log(response);
      setBooks(response.data.data);
    })();
  }, []);

  if (books === null) {
    return null;
  }

  const onDeleteBook = (bookID) => {
    console.log(bookID);
    bookAPI.deleteBook(bookID).then((res) => {
      if (res.status === 200) {
        console.log('ok');
        setBooks(books.filter((book) => book.id !== bookID));
      }
    });
  };

  return <AdminBook books={books} onDeleteBook={onDeleteBook} />;
};

export default AdminBookContainer;
