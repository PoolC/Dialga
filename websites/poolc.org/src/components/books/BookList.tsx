import { Button, Empty, Form, Input, Result, Select, Skeleton } from 'antd';
import { match } from 'ts-pattern';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { createStyles } from 'antd-style';
import { BookControllerService, BookResponse, queryKey, useAppInfiniteQuery } from '~/lib/api-v2';

import BookCard from './BookCard';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0px 10%;
    box-sizing: border-box;
  `,
  flexList: css`
    width: 100%;
    max-width: 930px;
    /* max-width: 1050px; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(218px, 1fr));
    grid-gap: 138px;
    justify-items: center;
  `,
  option: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  `,
  sortSelect: css`
    appearance: none;
    border: none !important;
    outline: none;
    width: 100px;
    text-align: center;
    & option {
      background: rgba(250, 250, 250, 1);
      border: none;
      outline: none;
    }
    .ant-select-selector {
      border: none !important;
    }
    .ant-select-selector:hover {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-select-selector:focus {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-select-dropdown {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(250, 250, 250, 1);
    }
    .ant-select-item-option {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 13px;
    }
    .ant-select-item-option-selected .ant-select-item-option-content {
      color: rgba(72, 189, 155, 1);
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: rgba(250, 250, 250, 1);
    }
  `,
  search: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* gap: 12px; */
    width: 330px;
  `,
  searchSelect: css`
    width: 70px;
    /* .ant-select-arrow {
      transform: translateX(-27px);
    } */
    .ant-select-selector {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
    }
    .ant-select-selection-item {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 14px;
    }
    .ant-select-dropdown {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
    }
    .ant-select-item-option {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 13px;
      text-align: center;
    }
    .ant-select-item-option-selected .ant-select-item-option-content {
      color: rgba(72, 189, 155, 1);
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: rgba(250, 250, 250, 1);
    }
  `,
  searchInput: css`
    max-width: 197px;
  `,
  searchBtn: css`
    width: 55px;
  `,
}));

const initSearchForm = { type: 'TITLE', keyword: '' };
type sortingType = 'TITLE' | 'CREATED_AT' | 'RENT_TIME';
type searchType = 'TITLE' | 'AUTHOR' | 'TAG';

export function BookListSearch({ setSearchInfo }: { setSearchInfo: Dispatch<SetStateAction<{ type: searchType; keyword: string }>> }) {
  const { styles } = useStyles();
  const [formInfo, setFormInfo] = useState(initSearchForm);

  return (
    <Form
      initialValues={initSearchForm}
      className={styles.search}
      onFinish={(values) => {
        setSearchInfo(values);
      }}
      onFinishFailed={(error) => {
        console.error('Error: ', error);
      }}
    >
      <Form.Item name="type">
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          className={styles.searchSelect}
          // defaultValue={initSearchForm.type}
          options={[
            { value: 'TITLE', label: '제목' },
            { value: 'AUTHOR', label: '저자' },
            { value: 'TAG', label: '태그' },
          ]}
          onChange={(data) => setFormInfo({ ...formInfo, type: data })}
        />
      </Form.Item>
      <Form.Item name="keyword">
        <Input className={styles.searchInput} value={formInfo.keyword} onChange={(e) => setFormInfo({ ...formInfo, keyword: e.target.value })} />
      </Form.Item>
      <Form.Item label={null}>
        <Button className={styles.searchBtn} type="primary" htmlType="submit">
          검색
        </Button>
      </Form.Item>
    </Form>
  );
}

const useInView = (sorting: sortingType, keyword: string, search: searchType) => {
  const bottomRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { data, fetchNextPage, isLoading, isError, isSuccess, isFetchingNextPage } = useAppInfiniteQuery({
    queryKey: keyword ? queryKey.book.search(sorting, keyword, search) : queryKey.book.all(sorting),
    queryFn: ({ pageParam }) =>
      keyword
        ? BookControllerService.searchBooksUsingGet({
            keyword,
            sort: sorting,
            search,
            page: pageParam,
          })
        : BookControllerService.getAllBooksUsingGet({ page: pageParam, sort: sorting }),
    initialPageParam: 0,
    getNextPageParam: (lastData) => (lastData.number || 0) + 1,
  });

  const totalPages = data?.pages[0].totalPages || 0;
  const curPage = data?.pages.length || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);

        if (entry.isIntersecting) {
          if (totalPages > curPage) {
            fetchNextPage();
          }
        }
      },
      {
        /* threshold같은거 */
      },
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    const LastElementReturnFunc = () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
    return LastElementReturnFunc;
  }, [bottomRef, curPage, totalPages, fetchNextPage]);

  const products = useMemo(() => {
    const allContents = data ? data.pages.reduce((acc, cur) => [...acc, ...(cur.content || [])], [] as BookResponse[]) : [];
    return allContents;
  }, [data]);

  return { products, bottomRef, inView, fetchNextPage, isError, isLoading, isSuccess, isFetchingNextPage };
};

export default function BookList() {
  const { styles } = useStyles();

  const [sorting, setSorting] = useState<sortingType>('CREATED_AT');

  const [searchInfo, setSearchInfo] = useState<{ type: searchType; keyword: string }>({ type: 'TITLE', keyword: '' });
  const bookListInfiniteQuery = useInView(sorting, searchInfo.keyword, searchInfo.type);

  return (
    <div className={styles.wrapper}>
      <h2>보유 도서</h2>
      <div className={styles.option}>
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          className={styles.sortSelect}
          value={sorting}
          onChange={(param) => {
            setSorting(param as sortingType);
          }}
          options={[
            { value: 'CREATED_AT', label: '등록순' },
            { value: 'TITLE', label: '가나다순' },
            { value: 'RENT_TIME', label: '최근반납순' },
          ]}
        />
        <BookListSearch setSearchInfo={setSearchInfo} />
      </div>
      {match(bookListInfiniteQuery)
        .with({ isLoading: true }, () => <Skeleton style={{ width: '100%' }} />)
        .with({ isError: true }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
        .with({ isSuccess: true }, ({ products }) => (
          <div className={styles.flexList}>
            {products.map((bookData) => (
              <BookCard key={bookData.id} data={bookData} />
            ))}
          </div>
        ))
        .otherwise(() => (
          <Empty description="데이터가 없습니다" />
        ))}
      {bookListInfiniteQuery.isFetchingNextPage ? <Skeleton /> : <div ref={bookListInfiniteQuery.bottomRef} />}
    </div>
  );
}
