import { Avatar, Button, Empty, Pagination, Result, Skeleton, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useHistory } from 'react-router-dom';
// import { createStyles } from 'antd-style';
import { match } from 'ts-pattern';
import { stringify } from 'qs';
import { CommentOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { MENU } from '~/constants/menus';
import { BookControllerService, PostControllerService, BookResponse, queryKey, useAppQuery } from '~/lib/api-v2';
import { BoardType, getBoardTitleForRequest } from '~/lib/utils/boardUtil';
import { dayjs } from '~/lib/utils/dayjs';
import getFileUrl from '~/lib/utils/getFileUrl';
import { useAppSelector } from '~/hooks/useAppSelector';
import { getInnerTextFromMarkdown } from '~/lib/utils/getInnerTextFromMarkdown';
import BookCard from './BookCard';

// const useStyles = createStyles(({ css }) => ({
//   fullWidth: css`
//     width: 100%;
//   `,
//   metaInfoArea: css`
//     width: 100%;
//     justify-content: space-between;
//   `,
//   search: css`
//     max-width: 300px;
//   `,
//   link: css`
//     display: block;
//     width: 100%;
//   `,
//   topArea: css`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//   `,
//   wrapper: css`
//     display: flex;
//     align-items: stretch;
//     flex-direction: column;
//     gap: 8px;
//   `,
//   paginationWrap: css`
//     display: flex;
//     justify-content: center;
//     margin-top: 10px;
//   `,
//   commentWrap: css`
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   `,
//   avatar: css`
//     width: 40px;
//     height: 40px;
//   `,
//   badge: css`
//     width: 35px;
//     height: 35px;
//     border: 1px solid #47be9b;
//   `,
//   clamp: css`
//     display: -webkit-box;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: 1;
//     overflow: hidden;
//   `,
// }));

export default function BookList({ page }: { page: number }) {
  // data
  //   const { styles } = useStyles();
  // const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);
  type sortingType = 'TITLE' | 'CREATED_AT' | 'RENT_TIME';
  const [sorting, setSorting] = useState<sortingType>('TITLE');

  const bookListQuery = useAppQuery({
    queryKey: queryKey.book.all(page),
    queryFn: () => BookControllerService.getAllBooksUsingGet({ page: 0, sort: sorting }),

    //   BookControllerService.findBooksUsingGet({query:검색어, page:페이지인덱스})
  });

  const history = useHistory();

  // methods
  const onPageChange = (page: number) =>
    history.push(
      `/${MENU.BOOK}?${stringify({
        page,
      })}`,
    );

  // template

  const columns: ColumnsType<BookResponse> = [
    {
      render: (_, book) => (
        <Link
          to={`${MENU.BOOK}/${book.id}`}
          // className={styles.link}
        >
          <Space
            direction="vertical"
            // className={styles.fullWidth}
            size="middle"
          >
            <Space
              // className={styles.metaInfoArea}
              size="middle"
            >
              <Space>
                post.writeName
                {/* <Typography.Text>{post.writerName}</Typography.Text> */}
                {/* {post.badge && <Avatar src={getFileUrl(post.badge?.imageUrl)} className={styles.badge} />} */}
              </Space>
              <Space size="middle">
                날짜짜
                {/* <Typography.Text type="secondary">{dayjs(post.createdAt).format('YYYY. MM. DD')}</Typography.Text> */}
                <div
                // className={styles.commentWrap}
                >
                  코멘트트
                  {/* <CommentOutlined /> */}
                  {/* {post.commentCount ?? 0} */}
                </div>
              </Space>
            </Space>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5}>{book.title}</Typography.Title>
              {book?.imageURL && (
                //   <Typography.Text className={styles.clamp}>{getInnerTextFromMarkdown(post.body)}</Typography.Text>
                <img src={`${book.imageURL}`} alt={`책 ${book.title}의 이미지`} />
              )}
            </Space>
          </Space>
        </Link>
      ),
    },
  ];

  //   const renderWriteButton = () => {
  //     const button = (
  //       <Link to={`/${MENU.BOARD}/write?${stringify({ boardType })}`}>
  //         <Button type="primary" icon={<EditOutlined />}>
  //           글쓰기
  //         </Button>
  //       </Link>
  //     );

  //     if (boardType !== 'NOTICE') {
  //       return button;
  //     }

  //     return isAdmin ? button : null;
  //   };

  return (
    <div
    // className={styles.wrapper}
    >
      <h2>보유도서</h2>
      <select value={sorting} onChange={(e) => setSorting(e.target.value as sortingType)}>
        <option value="TITLE">가나다순</option>
        <option value="CREATED_AT">입고 시간 순</option>
        <option value="RENT_TIME">남은 대여기간 순</option>
      </select>
      {/* <div 
      className={styles.topArea}>{renderWriteButton()}</div> */}
      {match(bookListQuery)
        .with({ status: 'pending' }, () => <Skeleton />)
        .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
        .with({ status: 'success' }, ({ data: { content, totalPages } } /* { posts: postList, maxPage } */) => {
          //   if (!postList) {
          //     return <Empty />;
          //   }

          const filteredList = content; // filter(Boolean);

          if (filteredList.length === 0) {
            return <Empty />;
          }

          return (
            <>
              <div>
                대충 플렉스한 컨테이너
                {filteredList.map((bookData: { id: number; title: string; imageURL: string; status: string }) => (
                  <BookCard key={bookData.id} data={bookData} />
                ))}
              </div>
              {/* <Table dataSource={filteredList.content} columns={columns} showHeader={false} pagination={false} rowKey="postId" /> */}
              {/* <div className={styles.paginationWrap}> */}
              <Pagination current={page} total={totalPages} showSizeChanger={false} onChange={onPageChange} />
              {/* </div> */}
            </>
          );
        })
        .exhaustive()}
    </div>
  );
}
