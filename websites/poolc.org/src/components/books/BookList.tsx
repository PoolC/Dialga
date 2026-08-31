import { DownOutlined } from '@ant-design/icons';
import { Empty, Result, Skeleton } from 'antd';
import { match } from 'ts-pattern';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createStyles } from 'antd-style';
import { BookControllerService, BookResponse, queryKey, useAppInfiniteQuery } from '~/lib/api-v2';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import { MobileSectionFilter } from '~/components/common/MobileSectionFilter/MobileSectionFilter';
import { BOOK_CATEGORY_TABS, BookCategoryTab } from '~/constants/bookCategories';
import { ListSearchToolbar } from '~/components/common/ListSearchToolbar/ListSearchToolbar';
import { useResponsiveBreakpoint } from '~/hooks/useResponsiveBreakpoint';
import { media } from '~/styles/responsive';

import BookCard, { CompactBookCard, MobileBookRow } from './BookCard';

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
  mobileList: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0;
    padding: 0;
  `,
  compactGrid: css`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 20px;
    margin: 0;
    padding: 0;
  `,
  skeleton: css`
    width: 100%;
  `,
  categoryTabs: css`
    width: 100%;

    ${media.mobile} {
      display: none;
    }
  `,
  emptyState: css`
    display: flex;
    grid-column: 1 / -1;
    width: 100%;
    min-height: 260px;
    align-items: center;
    justify-content: center;
  `,
}));

type sortingType = 'TITLE' | 'CREATED_AT' | 'RENT_TIME';
const useInView = (sorting: sortingType, keyword: string, category: BookCategoryTab) => {
  const bottomRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { data, fetchNextPage, isLoading, isError, isSuccess, isFetchingNextPage } = useAppInfiniteQuery({
    queryKey: keyword ? queryKey.book.search(sorting, keyword, 'TITLE_OR_AUTHOR', undefined, category) : queryKey.book.all(sorting, undefined, category),
    queryFn: ({ pageParam }) =>
      keyword
        ? BookControllerService.searchBooksUsingGet({
            keyword,
            sort: sorting,
            search: 'TITLE_OR_AUTHOR',
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
  const breakpoint = useResponsiveBreakpoint();

  const sorting: sortingType = 'CREATED_AT';
  const [category, setCategory] = useState<BookCategoryTab>('ALL');
  const [keyword, setKeyword] = useState('');
  const bookListInfiniteQuery = useInView(sorting, keyword, category);
  const isPhone = breakpoint === 'phone';
  const isCompactTablet = breakpoint === 'compact';

  return (
    <PageContent className={styles.content}>
      <PageHeader
        title="보유 도서"
        actions={
          <ListSearchToolbar placeholder="제목, 저자 검색" value={keyword} onChange={setKeyword}>
            <MobileSectionFilter
              items={BOOK_CATEGORY_TABS}
              activeKey={category}
              onChange={(key) => setCategory(key as BookCategoryTab)}
              title="카테고리 선택"
              triggerIcon={<DownOutlined />}
              showDrawerHeader={false}
            />
          </ListSearchToolbar>
        }
      />
      <div className={styles.categoryTabs}>
        <SectionTabs items={BOOK_CATEGORY_TABS} activeKey={category} onChange={(key) => setCategory(key as BookCategoryTab)} />
      </div>
      <div className={styles.listBody}>
        {match(bookListInfiniteQuery)
          .with({ isLoading: true }, () => <Skeleton className={styles.skeleton} />)
          .with({ isError: true }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
          .with({ isSuccess: true }, ({ products }) => (
            isPhone ? <ul className={styles.mobileList}>
              {products.length > 0 ? products.map((bookData) => <MobileBookRow key={bookData.id} data={bookData} />) : (
                <li className={styles.emptyState}>
                  <Empty description="등록된 도서가 없습니다." />
                </li>
              )}
            </ul> : isCompactTablet ? <ul className={styles.compactGrid}>
              {products.length > 0 ? products.map((bookData) => <CompactBookCard key={bookData.id} data={bookData} />) : (
                <li className={styles.emptyState}>
                  <Empty description="등록된 도서가 없습니다." />
                </li>
              )}
            </ul> : <CardGrid className={styles.flexList}>
              {products.length > 0 ? (
                products.map((bookData) => <BookCard key={bookData.id} data={bookData} />)
              ) : (
                <li className={styles.emptyState}>
                  <Empty description="등록된 도서가 없습니다." />
                </li>
              )}
            </CardGrid>
          ))
          .otherwise(() => (
            <CardGrid className={styles.flexList}>
              <li className={styles.emptyState}>
                <Empty description="등록된 도서가 없습니다." />
              </li>
            </CardGrid>
          ))}
      </div>
      {bookListInfiniteQuery.isFetchingNextPage ? <Skeleton className={styles.skeleton} /> : <div ref={bookListInfiniteQuery.bottomRef} />}
    </PageContent>
  );
}
