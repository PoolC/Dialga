import BookList from '~/components/books/BookList';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';

const BookListPage = () => {
  return (
    <Block>
      <WhiteBlock>
        <BookList />
      </WhiteBlock>
    </Block>
  );
};

export default BookListPage;
