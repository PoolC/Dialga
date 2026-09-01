import { Modal, Popconfirm, Result, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { BookControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { BOOK_CATEGORY_TABS, BookCategoryTab, getBookCategoryLabel } from '~/constants/bookCategories';
import { useMessage } from '~/hooks/useMessage';
import getFileUrl from '~/lib/utils/getFileUrl';
import { WhiteNarrowBlock } from '~/styles/common/Block.styles';
import ActionButton from '../../common/Buttons/ActionButton';
import { ListSearchToolbar } from '../../common/ListSearchToolbar/ListSearchToolbar';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import AdminBookForm, { FormType } from '../AdminBookFormNew/AdminBookForm';

type ModalInfo = { isOpen: boolean; data?: FormType };

type BookRow = FormType & {
  status?: string;
  borrower?: { name?: string } | null;
};

const useStyles = createStyles(({ css }) => ({
  header: css`
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 18px;

    @media (max-width: 767px) {
      align-items: stretch;
      flex-direction: column;
    }
  `,
  title: css`
    margin: 0;
    color: #4c3722;
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1.25;
  `,
  toolbar: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  actionRow: css`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;

    > div {
      flex: 1;
    }

    > button {
      margin: 0;
    }

    @media (max-width: 767px) {
      flex-direction: column;

      > div {
        width: 100%;
      }
    }
  `,
  pagination: css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 16px;

    > button {
      margin: 0;
    }
  `,
  tableContainer: css`
    width: 100%;
    overflow-x: auto;
    border: 1px solid rgba(76, 55, 34, 0.12);
    border-radius: 8px;
  `,
  table: css`
    width: 100%;
    min-width: 980px;
    border-collapse: collapse;
    color: #4c3722;
    font-size: 0.84rem;

    th,
    td {
      padding: 12px 14px;
      border-bottom: 1px solid rgba(76, 55, 34, 0.08);
      text-align: center;
      vertical-align: middle;
    }

    th:nth-of-type(1) { width: 31%; }
    th:nth-of-type(2) { width: 16%; }
    th:nth-of-type(3) { width: 13%; }
    th:nth-of-type(4) { width: 15%; }
    th:nth-of-type(5) { width: 13%; }
    th:nth-of-type(6) { width: 12%; }

    tbody tr:last-of-type td {
      border-bottom: 0;
    }
  `,
  tableHead: css`
    background: #e5f0ed;

    th {
      color: #4c3722;
      font-size: 0.8rem;
      font-weight: 800;
    }
  `,
  row: css`
    &:hover {
      background: rgba(229, 240, 237, 0.45);
    }
  `,
  bookIdentity: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    min-width: 0;
    text-align: left;

    strong {
      display: block;
      overflow: hidden;
      font-size: 0.92rem;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  cover: css`
    width: 42px;
    height: 56px;
    flex: 0 0 42px;
    border-radius: 4px;
    background: #f2f2f2;
    object-fit: cover;
  `,
  status: css`
    display: inline-flex;
    padding: 5px 8px;
    border-radius: 999px;
    background: #e5f7f0;
    color: #32b895;
    font-size: 0.75rem;
    font-weight: 800;
  `,
  unavailableStatus: css`
    background: #f2f3f4;
    color: #7b7f83;
  `,
  actions: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    > a,
    > button {
      margin: 0;
    }
  `,
  deleteButton: css`
    min-width: 56px;
    padding: 7px 10px;
    border: 1px solid #f2b5b5;
    border-radius: 5px;
    background: #fff;
    color: #d95757;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 800;
  `,
  empty: css`
    margin: 0;
    padding: 42px 20px;
    color: #827971;
    font-size: 0.9rem;
    text-align: center;
  `,
}));

const getStatusLabel = (status?: string) => (status === 'AVAILABLE' ? '대출 가능' : '대출 중');

export default function AdminBook() {
  const { styles, cx } = useStyles();
  const message = useMessage();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<ModalInfo>({ isOpen: false });
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState<BookCategoryTab>('ALL');
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedQuery = searchQuery.trim();

  const bookListQuery = useAppQuery({
    queryKey: normalizedQuery ? queryKey.book.search('TITLE', normalizedQuery, 'TITLE', page, category) : queryKey.book.all('TITLE', page, category),
    queryFn: () =>
      normalizedQuery
        ? BookControllerService.searchBooksUsingGet({ keyword: normalizedQuery, search: 'TITLE', sort: 'TITLE', page, category: category === 'ALL' ? undefined : category })
        : BookControllerService.getAllBooksUsingGet({ sort: 'TITLE', page, category: category === 'ALL' ? undefined : category }),
  });

  const { mutate: deleteBook } = useAppMutation({
    mutationFn: BookControllerService.deleteBookUsingDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.book.all('TITLE') });
      message.success('도서가 삭제되었습니다.');
    },
  });

  const onModalCancel = () => {
    setModal((currentModal) => ({ ...currentModal, isOpen: false }));
  };

  const books = useMemo<BookRow[]>(() => {
    if (bookListQuery.status !== 'success') return [];

    return (bookListQuery.data.content ?? []).map((book) => ({
      id: book.id ?? 0,
      image: book.imageURL || '',
      title: book.title || '',
      author: book.author || '',
      discount: book.discount || 0,
      publisher: book.publisher || '',
      isbn: book.isbn || '',
      description: book.description || '',
      donor: book.donor || '',
      link: book.link || '',
      pubdate: book.publishedDate || '',
      category: book.category ?? 'PROGRAMMING',
      status: book.status,
      borrower: book.borrower,
    }));
  }, [bookListQuery.data, bookListQuery.status]);

  if (bookListQuery.status === 'pending') return <Skeleton />;
  if (bookListQuery.status === 'error') return <Result status="500" subTitle="에러가 발생했습니다." />;

  const { totalElements = 0, totalPages = 0 } = bookListQuery.data;

  return (
    <WhiteNarrowBlock>
      <div className={styles.header}>
        <h2 className={styles.title}>도서 관리</h2>
        <div className={styles.toolbar}>
          <ListSearchToolbar
            value={keyword}
            placeholder="도서 검색"
            onChange={setKeyword}
            onSubmit={() => {
              setSearchQuery(keyword);
              setPage(0);
            }}
          >
            <ActionButton onClick={() => setModal({ isOpen: true })}>도서 생성</ActionButton>
          </ListSearchToolbar>
        </div>
      </div>
      <div className={styles.actionRow}>
        <SectionTabs
          items={BOOK_CATEGORY_TABS}
          activeKey={category}
          onChange={(key) => {
            setCategory(key as BookCategoryTab);
            setPage(0);
          }}
        />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>도서</th>
              <th>저자</th>
              <th>분류</th>
              <th>대출 상태</th>
              <th>대출자</th>
              <th>조치</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className={styles.row} key={book.id}>
                <td>
                  <div className={styles.bookIdentity}>
                    {book.image ? <img className={styles.cover} src={getFileUrl(book.image)} alt="" /> : <div className={styles.cover} aria-hidden="true" />}
                    <strong>{book.title}</strong>
                  </div>
                </td>
                <td>{book.author || '-'}</td>
                <td>{getBookCategoryLabel(book.category)}</td>
                <td>
                  <span className={cx(styles.status, book.status !== 'AVAILABLE' && styles.unavailableStatus)}>{getStatusLabel(book.status)}</span>
                </td>
                <td>{book.borrower?.name || '-'}</td>
                <td>
                  <div className={styles.actions}>
                    <ActionButton onClick={() => setModal({ isOpen: true, data: book })}>편집</ActionButton>
                    <Popconfirm
                      title="도서 삭제"
                      description={`'${book.title}' 도서를 정말 삭제하시겠습니까?`}
                      okText="삭제"
                      cancelText="취소"
                      okButtonProps={{ danger: true }}
                      onConfirm={() => deleteBook({ id: book.id })}
                    >
                      <button className={styles.deleteButton}>삭제</button>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {books.length === 0 && <p className={styles.empty}>조건에 맞는 도서가 없습니다.</p>}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <ActionButton disabled={page === 0} onClick={() => setPage((currentPage) => currentPage - 1)}>이전</ActionButton>
          <span>{page + 1} / {totalPages} ({totalElements}권)</span>
          <ActionButton disabled={page >= totalPages - 1} onClick={() => setPage((currentPage) => currentPage + 1)}>다음</ActionButton>
        </div>
      )}
      {modal.isOpen && (
        <Modal centered open={modal.isOpen} onCancel={onModalCancel} footer={null} width={1000}>
          <AdminBookForm initValues={modal.data} onModalCancel={onModalCancel} />
        </Modal>
      )}
    </WhiteNarrowBlock>
  );
}
