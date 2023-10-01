import AdminBook from '../../../components/admin/AdminBook/AdminBook';
import { useEffect, useState } from 'react';
import * as bookAPI from '../../../lib/api/book';
import { SUCCESS } from '../../../constants/statusCode';

const AdminBookContainer = () => {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await bookAPI.getBooks();
      setBooks(response.data.data);
    })();
  }, []);

  if (books === null) {
    return null;
  }

  const onDeleteBook = (bookID) => {
    bookAPI.deleteBook(bookID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setBooks(books.filter((book) => book.id !== bookID));
      }
    });
  };

  return <AdminBook books={books} onDeleteBook={onDeleteBook} />;
};

export default AdminBookContainer;
