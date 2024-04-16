import { CommentOutlined } from '@ant-design/icons';
import { Space, Typography, Avatar, Empty, Pagination } from 'antd';
import { createStyles } from 'antd-style';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { stringify } from 'qs';
import { Link, useHistory } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { useSearchParams } from '~/hooks/useSearchParams';
import { PostResponse, ScrapControllerService, queryKey, useAppSuspenseQuery } from '~/lib/api-v2';
import getFileUrl from '~/lib/utils/getFileUrl';
import { getInnerTextFromMarkdown } from '~/lib/utils/getInnerTextFromMarkdown';

const useStyles = createStyles(({ css }) => ({
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
  fullWidth: css`
    width: 100%;
  `,
}));

export default function MyPageMyScrapsEntry() {
  const { styles } = useStyles();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  const {
    data: { posts, maxPage },
  } = useAppSuspenseQuery({
    queryKey: queryKey.post.myPosts(page - 1),
    queryFn: () => ScrapControllerService.viewMyScrapsUsingGet({ page: page - 1 }),
  });

  const filteredList = (posts ?? []).filter(Boolean);

  const history = useHistory();

  const onPageChange = (page: number) =>
    history.push(
      `/${MENU.MY_PAGE_MY_POSTS}?${stringify({
        page,
      })}`,
    );

  const columns: ColumnsType<PostResponse> = [
    {
      render: (_, post) => (
        <Link to={`/${MENU.BOARD}/${post.postId}`} className={styles.link}>
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

  return (
    <div className={styles.fullWidth}>
      {filteredList.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Table dataSource={filteredList} columns={columns} showHeader={false} pagination={false} rowKey="postId" />
          <div className={styles.paginationWrap}>
            <Pagination current={page} total={maxPage ? maxPage * 10 : 0} showSizeChanger={false} onChange={onPageChange} />
          </div>
        </>
      )}
    </div>
  );
}
