import { createStyles } from 'antd-style';
import BookList from '~/components/books/BookList';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    max-width: 1283px;
    /* padding: 40px 150px; */
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
}));

const BookListPage = () => {
  const { styles } = useStyles();
  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <BookList />
      </WhiteBlock>
    </Block>
  );
};

export default BookListPage;
