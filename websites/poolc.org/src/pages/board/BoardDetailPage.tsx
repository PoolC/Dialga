import { Avatar, Breadcrumb, Button, Form, Input, Popconfirm, Result, Skeleton, Space, Tooltip, Typography } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { stringify } from 'qs';
import { useSelector } from 'react-redux';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Viewer } from '@dialga/react-editor';
import { FolderOpenTwoTone } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import { MENU } from '~/constants/menus';
import { BoardType, getBoardTitle } from '~/lib/utils/boardUtil';
import { CommentControllerService, PostControllerService, PostResponse, ScrapControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { dayjs } from '~/lib/utils/dayjs';
import { useMessage } from '~/hooks/useMessage';
import getFileUrl from '~/lib/utils/getFileUrl';
import { getEmptyArray } from '~/lib/utils/getEmptyArray';
import { noop } from '~/lib/utils/noop';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import { useAppSelector } from '~/hooks/useAppSelector';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    max-width: 1200px;
    padding: 0 12px;
    box-sizing: border-box;
  `,
  fullWidth: css`
    width: 100%;
  `,
  writerAvatar: css`
    width: 38px;
    height: 38px;
  `,
  commentTextArea: css`
    min-width: 120px;
    resize: none;
  `,
  buttonGroup: css`
    justify-content: flex-end;
    align-items: center;
  `,
  commentButtonWrap: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
  `,
  whiteBlock: css`
    && {
      padding: 30px 0;
    }
  `,
  actionButtonGroup: css`
    justify-content: flex-end;
    align-items: center;
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
    margin-top: 28px;
    padding-top: 18px;
    border-top: 1px solid rgba(76, 55, 34, 0.08);
  `,
  fileListTitle: css`
    color: #4c3722;
    font-size: 0.9rem;
    font-weight: 700;
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
    color: rgba(76, 55, 34, 0.55);
    margin: 16px 0 0;
  `,
  comment: css`
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
    width: 100%;
    padding: 16px 0;
  `,
  detailLayout: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 22px;
  `,
  breadcrumb: css`
    color: rgba(76, 55, 34, 0.48);

    a {
      color: rgba(76, 55, 34, 0.62);
    }
  `,
  headerSection: css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-bottom: 22px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
  `,
  metaRow: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  writerName: css`
    color: #4c3722;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.35;
  `,
  postDate: css`
    color: rgba(76, 55, 34, 0.46);
    font-size: 0.88rem;
    line-height: 1.35;
  `,
  titleBlock: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  titleRow: css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
    }
  `,
  postTitle: css`
    margin: 0 !important;
    color: #1f1a16 !important;
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    line-height: 1.32 !important;
    word-break: keep-all;
  `,
  bodySection: css`
    padding-bottom: 22px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
  `,
  content: css`
    color: #302820;
    line-height: 1.65;
  `,
  postFooter: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 24px;

    @media (max-width: 768px) {
      align-items: stretch;
      flex-direction: column;
    }
  `,
  commentSection: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  commentHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  `,
  commentTitle: css`
    margin: 0;
    color: #4c3722;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.35;
  `,
  commentList: css`
    display: flex;
    flex-direction: column;
  `,
  commentWriter: css`
    color: #4c3722;
    font-size: 0.9rem;
    font-weight: 600;
  `,
  commentDate: css`
    color: rgba(76, 55, 34, 0.46);
    font-size: 0.84rem;
  `,
  commentBody: css`
    white-space: pre-line;
    margin-bottom: 0px !important;
    color: #302820;
    line-height: 1.55;
  `,
  commentForm: css`
    margin-top: 4px;

    textarea {
      border-color: rgba(76, 55, 34, 0.18);
      border-radius: 6px;
    }

    textarea:focus,
    textarea:focus-within {
      border-color: #47be9b;
      box-shadow: 0 0 0 3px rgba(71, 190, 155, 0.14);
    }
  `,
}));

export default function BoardDetailPage() {
  const { styles, cx } = useStyles();
  const message = useMessage();
  const history = useHistory();
  const queryClient = useQueryClient();

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
    onMutate() {
      const prevData = queryClient.getQueryData(queryKey.post.post(postId)) as PostResponse;
      const tmp: PostResponse = {
        ...prevData,
        isScraped: true,
        scrapCount: (prevData.scrapCount ?? 0) + 1,
      };
      queryClient.setQueryData(queryKey.post.post(postId), tmp);

      return { prevData };
    },
    onError(_error, _variables, context) {
      queryClient.setQueryData(queryKey.post.post(postId), context?.prevData);
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queryKey.post.post(postId),
      });
    },
  });

  const { mutate: deleteScrap } = useAppMutation({
    mutationFn: ScrapControllerService.deleteScrapUsingDelete,
    onMutate() {
      const prevData = queryClient.getQueryData(queryKey.post.post(postId)) as PostResponse;
      const tmp: PostResponse = {
        ...prevData,
        isScraped: false,
        scrapCount: (prevData.scrapCount ?? 0) - 1,
      };
      queryClient.setQueryData(queryKey.post.post(postId), tmp);
      return { prevData };
    },
    onError(_error, _variables, context) {
      queryClient.setQueryData(queryKey.post.post(postId), context?.prevData);
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queryKey.post.post(postId),
      });
    },
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
      deleteScrap({
        postId,
      });
    } else {
      addScrap({
        postId,
      });
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
          // TODO: assert 이용해서 수정
          const boardType = post!.boardType!;
          history.push(`/${MENU.BOARD}?${stringify({ boardType })}`);
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
      <div className={`${styles.wrapper} ${styles.detailLayout}`}>
        <section className={styles.headerSection}>
          <Breadcrumb
            className={styles.breadcrumb}
            items={[
              { title: <Link to={`/${MENU.BOARD}`}>게시판</Link> },
              {
                title: (
                  <Link
                    to={`/${MENU.BOARD}?${stringify({
                      boardType: post.boardType,
                    })}`}
                  >
                    {getBoardTitle((post.boardType ?? 'FREE') as BoardType)}
                  </Link>
                ),
              },
            ]}
          />
          <div className={styles.metaRow}>
            <Avatar className={styles.writerAvatar} src={getProfileImageUrl(post.postProfileImageUrl)} />
            <span className={styles.writerName}>{post.writerName}</span>
            <span className={styles.postDate}>{dayjs(post.createdAt).format('YYYY. MM. DD')}</span>
          </div>
          <div className={styles.titleRow}>
            <div className={styles.titleBlock}>
              <Typography.Title level={2} className={styles.postTitle}>
                {post.title}
              </Typography.Title>
            </div>
            <Space className={styles.buttonGroup}>
              <Tooltip title="스크랩">
                <Button icon={<FolderOpenTwoTone twoToneColor={post.isScraped ? 'orange' : 'gray'} />} className={cx(styles.emotionButton, { [styles.accent]: post.isScraped })} onClick={onScrapClick}>
                  스크랩 {post.scrapCount ?? 0}
                </Button>
              </Tooltip>
            </Space>
          </div>
        </section>

        <section className={styles.bodySection}>
          <div className={styles.content}>
            <Viewer initialValue={post.body} key={post.body} />
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
          <div className={styles.postFooter}>
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
          </div>
        </section>

        <CommentBox postId={postId} commentList={post.commentList} onRefetch={() => refetchPost()} />
      </div>
    );
  };

  return (
    <PageShell>
      <PagePanel className={styles.whiteBlock}>{renderContent()}</PagePanel>
    </PageShell>
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
    <section className={styles.commentSection}>
      <div className={styles.commentHeader}>
        <h3 className={styles.commentTitle}>댓글 {commentList?.length ?? 0}개</h3>
      </div>
      <div className={styles.commentList}>
        {commentList?.map((comment) => (
          <div key={comment.commentId} className={styles.comment}>
            <Space direction="vertical" size={8} className={styles.fullWidth}>
              <Space align="center">
                <span className={styles.commentWriter}>{comment.writerName}</span>
                <span className={styles.commentDate}>{dayjs(comment.createdAt).format('YYYY. MM. DD')}</span>
              </Space>
              <Typography.Paragraph className={styles.commentBody}>{comment.body}</Typography.Paragraph>
            </Space>
          </div>
        ))}
      </div>
      {isLogin ? (
        <Form className={styles.commentForm} onSubmitCapture={form.onSubmit(onSubmit, noop)}>
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
    </section>
  );
}
