import {
  Avatar,
  Breadcrumb,
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  Popconfirm,
  Result,
  Skeleton,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { Link, useHistory, useParams } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { FcLike } from 'react-icons/fc';
import { BsFillStarFill } from 'react-icons/bs';
import { createStyles } from 'antd-style';
import { getBoardTitleByBoardType } from '~/lib/utils/boardUtil';
import { stringify } from 'qs';
import classNames from 'classnames';
import {
  CommentControllerService,
  PostControllerService,
  queryKey,
  ScrapControllerService,
  useAppMutation,
  useAppQuery,
} from '~/lib/api-v2';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { queryClient } from '~/lib/utils/queryClient';
import { useMessage } from '~/hooks/useMessage';
import getFileUrl from '~/lib/utils/getFileUrl';
import { getEmptyArray } from '~/lib/utils/getEmptyArray';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { noop } from '~/lib/utils/noop';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  `,
  fullWidth: css`
    width: 100%;
  `,
  writerAvatar: css`
    width: 50px;
    height: 50px;
  `,
  commentTextArea: css`
    min-width: 120px;
    resize: none;
  `,
  buttonGroup: css`
    justify-content: center;
    align-items: center;
    width: 100%;
  `,
  commentButtonWrap: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
  `,
  whiteBlock: css`
    &.scope {
      padding: 30px 0;
    }
  `,
  actionButtonGroup: css`
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  `,
  emotionButton: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  fileListBox: css`
    margin-top: 40px;
  `,
  fileListTitle: css`
    font-weight: 500;
  `,
  fileList: css`
    margin-top: 8px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 4px;
  `,
  fileItem: css`
    font-size: 14px;
  `,
  skeletonWrap: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    gap: 20px;
    box-sizing: border-box;
  `,
}));

/**
 * TODO
 * - 권한 체크
 * - 댓글 작업
 * */
export default function BoardDetailPage() {
  const { styles } = useStyles();
  const message = useMessage();
  const history = useHistory();

  const params = useParams<{ id: string }>();
  const postId = Number(params.id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useAppQuery({
    queryKey: queryKey.post.post(postId),
    queryFn: () => PostControllerService.viewPostUsingGet({ postId }),
  });

  const { mutate: likePost } = useAppMutation({
    mutationFn: PostControllerService.likePostUsingPost,
  });

  const { mutate: addScrap } = useAppMutation({
    mutationFn: ScrapControllerService.addScrapUsingPost,
  });

  const { mutate: deletePost } = useAppMutation({
    mutationFn: PostControllerService.deletePostUsingDelete,
  });

  const member = useSelector((state: any) => state.auth);
  const isWriter = post?.writerLoginId === member?.user.memberId;

  // methods
  const onLikeClick = () => {
    if (isWriter) {
      message.warn('자기 자신의 글은 좋아요할 수 없습니다.');
      return;
    }

    likePost(
      { postId },
      {
        onSuccess() {
          queryClient
            .invalidateQueries(queryKey.post.post(postId))
            .catch(console.log);
        },
      },
    );
  };

  const onScrapClick = () => {
    if (isWriter) {
      message.warn('자기 자신의 글은 스크랩할 수 없습니다.');
      return;
    }

    addScrap(
      {
        postId,
      },
      {
        onSuccess() {
          queryClient
            .invalidateQueries(queryKey.post.post(postId))
            .catch(console.log);
        },
      },
    );
  };

  const onDeleteConfirm = () => {
    deletePost(
      {
        postId,
      },
      {
        onSuccess() {
          message.success('삭제되었습니다.');
          history.push(
            `/${MENU.BOARD}?${stringify({
              boardType: post?.boardType,
            })}`,
          );
        },
      },
    );
  };

  // render
  const renderContent = () => {
    if (isPostLoading) {
      return (
        <div className={styles.skeletonWrap}>
          {getEmptyArray(3).map((i) => (
            <Skeleton key={i} active />
          ))}
        </div>
      );
    }

    if (isPostError) {
      return <Result status="500" subTitle="에러가 발생했습니다." />;
    }

    return (
      <Space
        direction={'vertical'}
        size={0}
        className={styles.wrapper}
        split={<Divider />}
      >
        <Breadcrumb
          items={[
            { title: <Link to={`/${MENU.BOARD}`}>게시판</Link> },
            {
              title: (
                <Link
                  to={`/${MENU.BOARD}?${stringify({
                    boardType: post.boardType,
                  })}`}
                >
                  {getBoardTitleByBoardType(post.boardType ?? 'FREE')}
                </Link>
              ),
            },
          ]}
        />
        <Space
          direction={'vertical'}
          size={'middle'}
          className={styles.fullWidth}
        >
          <Space align={'center'}>
            <Avatar className={styles.writerAvatar} />
            <Space direction={'vertical'} size={0}>
              <Typography.Text>{post.writerName}</Typography.Text>
              <Typography.Text type={'secondary'}>
                {dayjs(post.createdAt).format('YYYY. MM. DD')}
              </Typography.Text>
            </Space>
          </Space>
          <Space direction={'vertical'} size={0}>
            {post.boardType === 'JOB' ? (
              <Descriptions title={post.title}>
                <Descriptions.Item label={'고용형태'}>
                  {post.position}
                </Descriptions.Item>
                <Descriptions.Item label={'지역'}>
                  {post.region}
                </Descriptions.Item>
                <Descriptions.Item label={'분야'}>
                  {post.field}
                </Descriptions.Item>
                <Descriptions.Item label={'마감일자'}>
                  {post.deadline}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Typography.Title level={2}>{post.title}</Typography.Title>
            )}
            <div dangerouslySetInnerHTML={{ __html: post.body ?? '' }}></div>
            <div className={styles.fileListBox}>
              <Typography.Text className={styles.fileListTitle}>
                첨부파일
              </Typography.Text>
              <div className={styles.fileList}>
                {post.fileList && post.fileList.length > 0 ? (
                  post.fileList.map((file, i) => (
                    <a
                      href={getFileUrl(file)}
                      key={i}
                      download={file}
                      className={styles.fileItem}
                    >
                      {file}
                    </a>
                  ))
                ) : (
                  <Typography.Text>첨부파일이 없습니다.</Typography.Text>
                )}
              </div>
            </div>
          </Space>
          <Space className={styles.buttonGroup}>
            <Tooltip title={'좋아요'}>
              <Button
                icon={<FcLike />}
                className={styles.emotionButton}
                onClick={onLikeClick}
              >
                {post.likeCount ?? 0}
              </Button>
            </Tooltip>
            <Tooltip title={'스크랩'}>
              <Button
                icon={<BsFillStarFill color={'orange'} />}
                className={styles.emotionButton}
                onClick={onScrapClick}
              >
                {post.scrapCount ?? 0}
              </Button>
            </Tooltip>
          </Space>
          {isWriter && (
            <Space className={styles.actionButtonGroup}>
              <Link
                to={`/${MENU.BOARD}/write?${stringify({
                  boardType: post.boardType,
                  postId: post.postId,
                })}`}
              >
                <Button type={'primary'}>수정</Button>
              </Link>
              <Popconfirm
                title="게시글 삭제하기"
                description="게시글을 정말 삭제하시겠어요?"
                okText="네"
                cancelText="아니요"
                onConfirm={onDeleteConfirm}
              >
                <Button type={'primary'} danger>
                  삭제
                </Button>
              </Popconfirm>
            </Space>
          )}
        </Space>
        <CommentBox postId={postId} />
      </Space>
    );
  };

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        {renderContent()}
      </WhiteBlock>
    </Block>
  );
}

const commentSchema = z.object({
  body: z.string().min(1),
});

function CommentBox({ postId }: { postId: number }) {
  const { styles } = useStyles();
  const message = useMessage();

  const form = useForm<z.infer<typeof commentSchema>>({
    initialValues: {
      body: '',
    },
    validate: zodResolver(commentSchema),
  });

  const { mutate: createComment } = useAppMutation({
    mutationFn: CommentControllerService.createCommentUsingPost,
  });

  const onSubmit = (val: typeof form.values) => {
    createComment({
      request: {
        anonymous: false,
        postId,
        body: val.body,
      },
    });
  };

  return (
    <Space direction={'vertical'} size={'large'} className={styles.fullWidth}>
      <Space align={'start'}>
        <Avatar />
        <Space direction={'vertical'} size={0}>
          <Typography.Text>풀씨짱123</Typography.Text>
          <Typography.Text>유익한 글이군요</Typography.Text>
          <Typography.Text type={'secondary'}>2023. 07. 28</Typography.Text>
        </Space>
      </Space>
      <Form onSubmitCapture={form.onSubmit(onSubmit, noop)}>
        <Space direction={'vertical'} className={styles.fullWidth}>
          <Input.TextArea
            className={styles.commentTextArea}
            placeholder="댓글을 남겨주세요 :)"
            {...form.getInputProps('body')}
          />
          <div className={styles.commentButtonWrap}>
            <Button
              type={'primary'}
              disabled={!form.isValid()}
              htmlType={'submit'}
            >
              댓글 달기
            </Button>
          </div>
        </Space>
      </Form>
    </Space>
  );
}
