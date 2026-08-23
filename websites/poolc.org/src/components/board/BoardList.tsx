import { Avatar, Pagination, Result, Skeleton, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { match } from 'ts-pattern';
import { stringify } from 'qs';
import { CommentOutlined } from '@ant-design/icons';
import { MENU } from '~/constants/menus';
import { PostControllerService, PostResponse, queryKey, useAppQuery } from '~/lib/api-v2';
import { BoardType, getBoardTitleForRequest } from '~/lib/utils/boardUtil';
import { dayjs } from '~/lib/utils/dayjs';
import getFileUrl from '~/lib/utils/getFileUrl';
import { getInnerTextFromMarkdown } from '~/lib/utils/getInnerTextFromMarkdown';
import { EmptyState } from '~/components/common/EmptyState/EmptyState';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
  `,
  list: css`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid rgba(76, 55, 34, 0.08);
  `,
  paginationWrap: css`
    display: flex;
    justify-content: center;
    margin-top: 12px;
  `,
  postItem: css`
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
  `,
  postLink: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 24px;
    width: 100%;
    padding: 16px;
    color: inherit;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      color: inherit;
      text-decoration: none;
      background-color: rgba(229, 240, 237, 0.55);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 16px 10px;
    }
  `,
  postMain: css`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 9px;
  `,
  writerArea: css`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #4c3722;
    font-size: 0.86rem;
    font-weight: 500;
    line-height: 1.35;
  `,
  postTitle: css`
    margin: 0 0 6px;
    color: #1f1a16;
    font-size: 1.04rem;
    font-weight: 700;
    line-height: 1.35;
    word-break: keep-all;
  `,
  postExcerpt: css`
    margin: 0;
    color: #302820;
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.55;
    word-break: keep-all;
  `,
  postMeta: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: rgba(76, 55, 34, 0.48);
    font-size: 0.88rem;
    line-height: 1.4;
    white-space: nowrap;

    @media (max-width: 768px) {
      justify-content: flex-start;
    }
  `,
  commentWrap: css`
    display: flex;
    align-items: center;
    gap: 6px;
    color: #47be9b;
  `,
  badge: css`
    width: 24px;
    height: 24px;
    border: 1px solid #47be9b;
  `,
  clamp: css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  `,
}));

export default function BoardList({ boardType, page }: { boardType: BoardType; page: number }) {
  // data
  const { styles } = useStyles();

  const boardListQuery = useAppQuery({
    queryKey: queryKey.post.all(boardType, page - 1),
    queryFn: () =>
      PostControllerService.viewPostsByBoardUsingGet({
        boardTitle: getBoardTitleForRequest(boardType),
        page: page - 1,
      }),
  });

  const history = useHistory();

  // methods
  const onPageChange = (page: number) =>
    history.push(
      `/${MENU.BOARD}?${stringify({
        boardType,
        page,
      })}`,
    );

  const renderPostItem = (post: PostResponse) => (
    <li className={styles.postItem} key={post.postId}>
      <Link to={`/${MENU.BOARD}/${post.postId}`} className={styles.postLink}>
        <div className={styles.postMain}>
          <div className={styles.writerArea}>
            <span>{post.writerName}</span>
            {post.badge && <Avatar src={getFileUrl(post.badge.imageUrl)} className={styles.badge} />}
          </div>
          <div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            {post.body && <p className={`${styles.postExcerpt} ${styles.clamp}`}>{getInnerTextFromMarkdown(post.body)}</p>}
          </div>
        </div>
        <div className={styles.postMeta}>
          <Typography.Text type="secondary">{dayjs(post.createdAt).format('YYYY. MM. DD')}</Typography.Text>
          <span className={styles.commentWrap}>
            <CommentOutlined />
            {post.commentCount ?? 0}
          </span>
        </div>
      </Link>
    </li>
  );

  return (
    <div className={styles.wrapper}>
      {match(boardListQuery)
        .with({ status: 'pending' }, () => <Skeleton />)
        .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
        .with({ status: 'success' }, ({ data: { posts: postList, maxPage } }) => {
          if (!postList) {
            return (
              <ul className={styles.list}>
                <EmptyState>게시글이 없습니다.</EmptyState>
              </ul>
            );
          }

          const filteredList = postList.filter(Boolean);

          if (filteredList.length === 0) {
            return (
              <ul className={styles.list}>
                <EmptyState>게시글이 없습니다.</EmptyState>
              </ul>
            );
          }

          return (
            <>
              <ul className={styles.list}>{filteredList.map(renderPostItem)}</ul>
              <div className={styles.paginationWrap}>
                <Pagination current={page} total={maxPage ? maxPage * 10 : 0} showSizeChanger={false} onChange={onPageChange} />
              </div>
            </>
          );
        })
        .exhaustive()}
    </div>
  );
}
