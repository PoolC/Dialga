import { Button, Input, Result, Select, Skeleton } from 'antd';
import { match } from 'ts-pattern';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { createStyles } from 'antd-style';
import { BookControllerService, BookResponse, queryKey, useAppInfiniteQuery } from '~/lib/api-v2';
import { EmptyState } from '~/components/common/EmptyState/EmptyState';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import colors from '~/lib/styles/colors';
import { BOOK_CATEGORY_TABS, BookCategoryTab } from '~/constants/bookCategories';

import BookCard from './BookCard';

const useStyles = createStyles(({ css }) => ({
  content: css`
    width: 100%;
    max-width: 1210px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  `,
  listBody: css`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 0;
  `,
  flexList: css`
    max-width: 1210px;
    align-items: stretch;
    justify-content: flex-start !important;
    gap: 42px 80px;
    margin: 0;
    padding: 0;
  `,
  toolbar: css`
    display: flex;
    width: 300px;
    gap: 8px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  searchSelect: css`
    width: 72px;

    .ant-select-selector {
      height: 36px !important;
      border: none !important;
      border-radius: 6px !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
      align-items: center;
    }

    .ant-select-selection-item {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 14px;
      line-height: 36px !important;
    }
  `,
  searchInput: css`
    flex: 1;
    min-width: 0;

    &.ant-input {
      height: 36px;
      border: 1px solid #d8d0c3;
      border-radius: 6px;
      color: ${colors.brown[1]};
      font-size: 14px;
      box-shadow: none;
    }

    &.ant-input::placeholder {
      color: #9b8d7b;
    }

    &.ant-input:focus {
      border-color: ${colors.mint[3]};
      box-shadow: 0 0 0 3px rgb(0 168 137 / 16%);
    }
  `,
  searchButton: css`
    width: 52px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: ${colors.mint[3]};
    font-weight: 600;
    font-size: 13px;
    box-shadow: none;

    &:hover,
    &:focus {
      background: ${colors.mint[3]} !important;
      opacity: 0.88;
    }
  `,
  skeleton: css`
    width: 100%;
  `,
}));

type sortingType = 'TITLE' | 'CREATED_AT' | 'RENT_TIME';
type searchType = 'TITLE' | 'AUTHOR' | 'TAG';
const useInView = (sorting: sortingType, keyword: string, search: searchType, category: BookCategoryTab) => {
  const bottomRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { data, fetchNextPage, isLoading, isError, isSuccess, isFetchingNextPage } = useAppInfiniteQuery({
    queryKey: keyword ? queryKey.book.search(sorting, keyword, search, undefined, category) : queryKey.book.all(sorting, undefined, category),
    queryFn: ({ pageParam }) =>
      keyword
        ? BookControllerService.searchBooksUsingGet({
            keyword,
            sort: sorting,
            search,
            page: pageParam,
            category: category === 'ALL' ? undefined : category,
          })
        : BookControllerService.getAllBooksUsingGet({ page: pageParam, sort: sorting, category: category === 'ALL' ? undefined : category }),
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

  const sorting: sortingType = 'CREATED_AT';
  const [category, setCategory] = useState<BookCategoryTab>('ALL');
  const [searchType, setSearchType] = useState<searchType>('TITLE');
  const [keyword, setKeyword] = useState('');
  const [searchInfo, setSearchInfo] = useState<{ type: searchType; keyword: string }>({ type: 'TITLE', keyword: '' });
  const bookListInfiniteQuery = useInView(sorting, searchInfo.keyword, searchInfo.type, category);

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchInfo({ type: searchType, keyword });
  };

  return (
    <PageContent className={styles.content}>
      <PageHeader
        title="보유 도서"
        actions={
          <form className={styles.toolbar} onSubmit={onSubmitSearch}>
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              className={styles.searchSelect}
              value={searchType}
              onChange={(value) => setSearchType(value)}
              options={[
                { value: 'TITLE', label: '제목' },
                { value: 'AUTHOR', label: '저자' },
                { value: 'TAG', label: '태그' },
              ]}
            />
            <Input className={styles.searchInput} placeholder="도서 검색" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
            <Button className={styles.searchButton} type="primary" htmlType="submit">
              검색
            </Button>
          </form>
        }
      />
      <SectionTabs items={BOOK_CATEGORY_TABS} activeKey={category} onChange={(key) => setCategory(key as BookCategoryTab)} />
      <div className={styles.listBody}>
        {match(bookListInfiniteQuery)
          .with({ isLoading: true }, () => <Skeleton className={styles.skeleton} />)
          .with({ isError: true }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
          .with({ isSuccess: true }, ({ products }) => (
            <CardGrid className={styles.flexList}>
              {products.length > 0 ? (
                products.map((bookData) => <BookCard key={bookData.id} data={bookData} />)
              ) : (
                <EmptyState>등록된 도서가 없습니다.</EmptyState>
              )}
            </CardGrid>
          ))
          .otherwise(() => (
            <CardGrid className={styles.flexList}>
              <EmptyState>등록된 도서가 없습니다.</EmptyState>
            </CardGrid>
          ))}
      </div>
      {bookListInfiniteQuery.isFetchingNextPage ? <Skeleton className={styles.skeleton} /> : <div ref={bookListInfiniteQuery.bottomRef} />}
    </PageContent>
  );
}
