import {
  Button,
  Empty,
  Pagination,
  Result,
  Skeleton,
  Space,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useHistory } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { GoPencil } from 'react-icons/go';
import { FcLike } from 'react-icons/fc';
import { FaRegCommentAlt } from 'react-icons/fa';
import { createStyles } from 'antd-style';
import {
  PostControllerService,
  PostResponse,
  queryKey,
  useAppQuery,
} from '~/lib/api-v2';
import { match } from 'ts-pattern';
import { stringify } from 'qs';
import { BoardType } from '~/lib/utils/boardUtil';

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
}));

export default function BoardList({
  boardType,
  page,
}: {
  boardType: BoardType;
  page: number;
}) {
  // data
  const { styles } = useStyles();

  const boardListQuery = useAppQuery({
    queryKey: queryKey.post.all(boardType, page),
    queryFn: () =>
      PostControllerService.viewPostsByBoardUsingGet({
        boardTitle: boardType,
        page,
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
          <Space
            direction={'vertical'}
            className={styles.fullWidth}
            size={'middle'}
          >
            <Space className={styles.metaInfoArea} size={'middle'}>
              <Space>
                <Typography.Text>{post.writerName}</Typography.Text>
                <Typography.Text type={'secondary'}>
                  {post.createdAt}
                </Typography.Text>
              </Space>
              <Space size={'middle'}>
                <Space>
                  <FcLike />
                  {post.likeCount}
                </Space>
                <Space>
                  <FaRegCommentAlt />
                  {post.commentCount ?? 0}
                </Space>
              </Space>
            </Space>
            <Space direction={'vertical'} size={0}>
              <Typography.Title level={5}>{post.title}</Typography.Title>
              <Typography.Text>{post.body}</Typography.Text>
            </Space>
          </Space>
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.topArea}>
        <Link to={`/${MENU.BOARD}/write?${stringify({ boardType })}`}>
          <Button type={'primary'} icon={<GoPencil />}>
            글쓰기
          </Button>
        </Link>
      </div>
      {match(boardListQuery)
        .with({ status: 'loading' }, () => <Skeleton />)
        .with({ status: 'error' }, () => (
          <Result status="500" subTitle="에러가 발생했습니다." />
        ))
        .with({ status: 'success' }, ({ data: postList }) => {
          if (postList.length === 0) {
            return <Empty />;
          }

          return (
            <>
              <Table
                dataSource={postList}
                columns={columns}
                showHeader={false}
                pagination={false}
              />
              <div className={styles.paginationWrap}>
                <Pagination
                  total={100}
                  showSizeChanger={false}
                  onChange={onPageChange}
                />
              </div>
            </>
          );
        })
        .exhaustive()}
    </div>
  );
}
