import { useParams } from 'react-router';
import BookDetail from '~/components/books/BookDetail';

export default function BookDetailPage() {
  const params = useParams<{ bookId: string }>();
  const bookId = Number(params.bookId);
  return <BookDetail bookId={bookId} />;
}
