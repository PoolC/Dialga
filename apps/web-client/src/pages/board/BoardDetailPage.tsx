import { Avatar, Breadcrumb, Button, Descriptions, Divider, Form, Input, Popconfirm, Result, Skeleton, Space, Tooltip, Typography } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { stringify } from 'qs';
import { useSelector } from 'react-redux';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Viewer } from '@toast-ui/react-editor';
import { FolderOpenTwoTone } from '@ant-design/icons';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { MENU } from '~/constants/menus';
import { getBoardTitleByBoardType } from '~/lib/utils/boardUtil';
import { CommentControllerService, PostControllerService, PostResponse, ScrapControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { dayjs } from '~/lib/utils/dayjs';
import { useMessage } from '~/hooks/useMessage';
import getFileUrl from '~/lib/utils/getFileUrl';
import { getEmptyArray } from '~/lib/utils/getEmptyArray';
import { noop } from '~/lib/utils/noop';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import { convertPositionToText } from '~/lib/utils/positionUtil';
import { useAppSelector } from '~/hooks/useAppSelector';
import { queryClient } from '~/lib/utils/queryClient';

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
    padding: 30px 0;
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
  accent: css`
    color: orange;
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
  loginDescription: css`
    text-align: center;
    color: #666;
    margin-top: 20px;
  `,
  commentAvatar: css`
    width: 40px;
    height: 40px;
  `,
  comment: css`
    border-bottom: 1px solid #eee;
    width: 100%;
    padding-bottom: 16px;
  `,
  divider: css`
    margin: 0;
  `,
  content: css`
    padding-bottom: 40px;
    line-height: 1.5;
  `,
  badge: css`
    width: 35px;
    height: 35px;
    border: 1px solid #47be9b;
  `,
  commentBody: css`
    white-space: pre-line;
    margin-bottom: 0px !important;
  `,
}));

export default function BoardDetailPage() {
  const { styles, cx } = useStyles();
  const message = useMessage();
  const history = useHistory();

  const params = useParams<{ id: string }>();
  const postId = Number(params.id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = useAppQuery({
    queryKey: queryKey.post.post(postId),
    queryFn: () => PostControllerService.viewPostUsingGet({ postId }),
  });

  // const { mutate: likePost } = useAppMutation({
  //   mutationFn: PostControllerService.likePostUsingPost,
  // });
  //
  const { mutate: addScrap } = useAppMutation({
    mutationFn: ScrapControllerService.addScrapUsingPost,
  });

  const { mutate: deleteScrap } = useAppMutation({
    mutationFn: ScrapControllerService.deleteScrapUsingDelete,
  });

  const { mutate: deletePost } = useAppMutation({
    mutationFn: PostControllerService.deletePostUsingDelete,
  });

  const memberId = useAppSelector((state) => state.auth.user.memberId);
  const isWriter = post?.writerLoginId === memberId;

  // methods
  // const onLikeClick = () => {
  //   if (isWriter) {
  //     message.warn('자기 자신의 글은 좋아요할 수 없습니다.');
  //     return;
  //   }
  //
  //   likePost(
  //     { postId },
  //     {
  //       onSuccess() {
  //         queryClient
  //           .invalidateQueries(queryKey.post.post(postId))
  //           ;
  //       },
  //     },
  //   );
  // };
  //
  const onScrapClick = () => {
    if (isWriter) {
      message.warn('자기 자신의 글은 스크랩할 수 없습니다.');
      return;
    }

    if (post?.isScraped) {
      deleteScrap(
        {
          postId,
        },
        {
          onSuccess() {
            queryClient.invalidateQueries({
              queryKey: queryKey.post.post(postId),
            });
          },
        },
      );
    } else {
      addScrap(
        {
          postId,
        },
        {
          onSuccess() {
            queryClient.invalidateQueries({
              queryKey: queryKey.post.post(postId),
            });
          },
        },
      );
    }
  };

  const onDeleteConfirm = () => {
    deletePost(
      {
        postId,
      },
      {
        onSuccess() {
          message.success('삭제되었습니다.');
          history.go(-1);
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

    if (isPostError || !post) {
      return <Result status="500" subTitle="에러가 발생했습니다." />;
    }

    return (
      <Space direction="vertical" size="middle" className={styles.wrapper} split={<Divider className={styles.divider} />}>
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
        <Space direction="vertical" size="middle" className={styles.fullWidth}>
          <Space align="center">
            <Avatar className={styles.writerAvatar} src={getProfileImageUrl(post.postProfileImageUrl)} />
            <Space direction="vertical" size={3}>
              <Space>
                <Typography.Text>{post.writerName}</Typography.Text>
                {post.badge && <Avatar src={getFileUrl(post.badge.imageUrl)} className={styles.badge} />}
              </Space>
            </Space>
            <Divider type="vertical" className={styles.divider} />
            <Typography.Text type="secondary">{dayjs(post.createdAt).format('YYYY. MM. DD')}</Typography.Text>
          </Space>
          <Space direction="vertical" size={0}>
            {post.boardType === 'JOB' ? (
              <Descriptions title={post.title}>
                <Descriptions.Item label="고용형태">{convertPositionToText(post.position)}</Descriptions.Item>
                <Descriptions.Item label="지역">{post.region}</Descriptions.Item>
                <Descriptions.Item label="분야">{post.field}</Descriptions.Item>
                <Descriptions.Item label="마감일자">{dayjs(post.deadline).format('YYYY. MM. DD')}</Descriptions.Item>
              </Descriptions>
            ) : (
              <Typography.Title level={2}>{post.title}</Typography.Title>
            )}
            <div className={styles.content}>
              <Viewer initialValue={post.body} />
            </div>
            {post.fileList && post.fileList.length > 0 && (
              <div className={styles.fileListBox}>
                <Typography.Text className={styles.fileListTitle}>첨부파일</Typography.Text>
                <div className={styles.fileList}>
                  {post.fileList.map((file, i) => (
                    <a href={getFileUrl(file)} key={i} download={file} className={styles.fileItem}>
                      {decodeURI(file)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Space>
          <Space className={styles.buttonGroup}>
            {/*  <Tooltip title={'좋아요'}> */}
            {/*    <Button */}
            {/*      icon={<FcLike />} */}
            {/*      className={styles.emotionButton} */}
            {/*      onClick={onLikeClick} */}
            {/*    > */}
            {/*      {post.likeCount ?? 0} */}
            {/*    </Button> */}
            {/*  </Tooltip> */}
            <Tooltip title="스크랩">
              <Button icon={<FolderOpenTwoTone twoToneColor={post.isScraped ? 'orange' : 'gray'} />} className={cx(styles.emotionButton, { [styles.accent]: post.isScraped })} onClick={onScrapClick}>
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
                <Button type="primary">수정</Button>
              </Link>
              <Popconfirm title="게시글 삭제하기" description="게시글을 정말 삭제하시겠어요?" okText="네" cancelText="아니요" onConfirm={onDeleteConfirm}>
                <Button type="primary" danger>
                  삭제
                </Button>
              </Popconfirm>
            </Space>
          )}
        </Space>
        <CommentBox postId={postId} commentList={post.commentList} onRefetch={() => refetchPost()} />
      </Space>
    );
  };

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>{renderContent()}</WhiteBlock>
    </Block>
  );
}

const commentSchema = z.object({
  body: z.string().min(1),
});

function CommentBox({ postId, commentList, onRefetch }: { postId: number; commentList: PostResponse['commentList']; onRefetch: () => void }) {
  const { styles } = useStyles();
  const message = useMessage();
  const member = useSelector((state: { auth: { status: { isLogin: boolean } } }) => state.auth);
  const { isLogin } = member.status;

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
    createComment(
      {
        request: {
          anonymous: false,
          isChild: false,
          postId,
          body: val.body,
        },
      },
      {
        onSuccess() {
          message.success('댓글이 등록되었습니다.');
          onRefetch();
          form.reset();
        },
      },
    );
  };

  return (
    <Space direction="vertical" size="middle" className={styles.fullWidth}>
      {commentList?.map((comment) => (
        <Space align="start" key={comment.commentId} className={styles.comment} direction="vertical">
          <Space direction="vertical" size="large">
            <Space>
              <Typography.Text>{comment.writerName}</Typography.Text>
              {comment.badge && <Avatar src={getFileUrl(comment.badge.imageUrl)} className={styles.badge} />}
            </Space>
          </Space>
          <Typography.Paragraph className={styles.commentBody}>{comment.body}</Typography.Paragraph>
          <Typography.Text type="secondary">{dayjs(comment.createdAt).format('YYYY. MM. DD')}</Typography.Text>
        </Space>
      ))}
      {isLogin ? (
        <Form onSubmitCapture={form.onSubmit(onSubmit, noop)}>
          <Space direction="vertical" className={styles.fullWidth}>
            <Input.TextArea className={styles.commentTextArea} placeholder="댓글을 남겨주세요 :)" {...form.getInputProps('body')} />
            <div className={styles.commentButtonWrap}>
              <Button type="primary" disabled={!form.isValid()} htmlType="submit">
                댓글 달기
              </Button>
            </div>
          </Space>
        </Form>
      ) : (
        <Typography.Paragraph className={styles.loginDescription}>로그인하고 댓글을 남겨보세요.</Typography.Paragraph>
      )}
    </Space>
  );
}
