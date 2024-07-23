import { Avatar, Button, Empty, Pagination, Result, Skeleton, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useHistory } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { match } from 'ts-pattern';
import { stringify } from 'qs';
import { CommentOutlined, EditOutlined } from '@ant-design/icons';
import { MENU } from '~/constants/menus';
import { PostControllerService, PostResponse, queryKey, useAppQuery } from '~/lib/api-v2';
import { BoardType, getBoardTitleForRequest } from '~/lib/utils/boardUtil';
import { dayjs } from '~/lib/utils/dayjs';
import getFileUrl from '~/lib/utils/getFileUrl';
import { useAppSelector } from '~/hooks/useAppSelector';
import { getInnerTextFromMarkdown } from '~/lib/utils/getInnerTextFromMarkdown';

const useStyles = createStyles(({ css }) => ({
  fullWidth: css`
    width: 100%;
  `,
  metaInfoArea: css`
    width: 100%;
    justify-content: space-between;
  `,
  search: css`
    max-width: 300px;
  `,
  link: css`
    display: block;
    width: 100%;
  `,
  topArea: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  wrapper: css`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 8px;
  `,
  paginationWrap: css`
    display: flex;
    justify-content: center;
    margin-top: 10px;
  `,
  commentWrap: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  avatar: css`
    width: 40px;
    height: 40px;
  `,
  badge: css`
    width: 35px;
    height: 35px;
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
  const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);

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

  // template
  const columns: ColumnsType<PostResponse> = [
    {
      render: (_, post) => (
        <Link to={`${MENU.BOARD}/${post.postId}`} className={styles.link}>
          <Space direction="vertical" className={styles.fullWidth} size="middle">
            <Space className={styles.metaInfoArea} size="middle">
              <Space>
                <Typography.Text>{post.writerName}</Typography.Text>
                {post.badge && <Avatar src={getFileUrl(post.badge?.imageUrl)} className={styles.badge} />}
              </Space>
              <Space size="middle">
                <Typography.Text type="secondary">{dayjs(post.createdAt).format('YYYY. MM. DD')}</Typography.Text>
                <div className={styles.commentWrap}>
                  <CommentOutlined />
                  {post.commentCount ?? 0}
                </div>
              </Space>
            </Space>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5}>{post.title}</Typography.Title>
              {post?.body && <Typography.Text className={styles.clamp}>{getInnerTextFromMarkdown(post.body)}</Typography.Text>}
            </Space>
          </Space>
        </Link>
      ),
    },
  ];

  const renderWriteButton = () => {
    const button = (
      <Link to={`/${MENU.BOARD}/write?${stringify({ boardType })}`}>
        <Button type="primary" icon={<EditOutlined />}>
          글쓰기
        </Button>
      </Link>
    );

    if (boardType !== 'NOTICE') {
      return button;
    }

    return isAdmin ? button : null;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topArea}>{renderWriteButton()}</div>
      {match(boardListQuery)
        .with({ status: 'pending' }, () => <Skeleton />)
        .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
        .with({ status: 'success' }, ({ data: { posts: postList, maxPage } }) => {
          if (!postList) {
            return <Empty />;
          }

          const filteredList = postList.filter(Boolean);

          if (filteredList.length === 0) {
            return <Empty />;
          }

          return (
            <>
              <Table dataSource={filteredList} columns={columns} showHeader={false} pagination={false} rowKey="postId" />
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
