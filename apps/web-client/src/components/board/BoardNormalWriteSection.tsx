import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Breadcrumb, Button, Divider, Form, Input, Space, Typography, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { Link, useHistory } from 'react-router-dom';
import { stringify } from 'qs';
import { createStyles } from 'antd-style';
import { match } from 'ts-pattern';
import { UploadOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError, CustomApi, PostControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { MENU } from '~/constants/menus';
import { BoardType, getBoardTitleByBoardType } from '~/lib/utils/boardUtil';
import { useMessage } from '~/hooks/useMessage';
import { useAppSelector } from '~/hooks/useAppSelector';
import getFileUrl from '~/lib/utils/getFileUrl';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  `,
  fullWidth: css`
    width: 100%;
  `,
  titleWrap: css`
    border-left: 4px solid #47be9b;
    padding-left: 16px;
  `,
  buttonWrap: css`
    width: 100%;
    justify-content: space-between;
  `,
  editorWrap: css`
    margin-bottom: 24px;
  `,
  divider: css`
    margin: 12px 0;
  `,
}));

const stringSchema = z.string().refine((str) => str.trim().length > 0);

const schema = z.object({
  title: stringSchema,
  body: stringSchema,
  fileList: z.array(z.string()),
});

export default function BoardNormalWriteSection({ boardType, postId }: { boardType: Exclude<BoardType, 'JOB'>; postId: number }) {
  const { styles } = useStyles();
  const history = useHistory();
  const message = useMessage();
  const loginId = useAppSelector((state) => state.auth.user.memberId);
  const queryClient = useQueryClient();

  const editorRef = useRef<Editor | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    initialValues: {
      title: '',
      body: '',
      fileList: [],
    },
    validate: zodResolver(schema),
  });

  const isEdit = postId > 0;

  const { mutate: submitNewPost } = useAppMutation({
    mutationFn: PostControllerService.registerPostUsingPost,
  });

  const { mutate: updatePost } = useAppMutation({
    mutationFn: PostControllerService.updatePostUsingPut,
  });

  const { mutate: uploadFile } = useAppMutation({
    mutationFn: CustomApi.uploadFile,
    onError(_e) {
      const e = _e as ApiError;
      if (e.status === 400) {
        message.error('이미 존재하는 파일명입니다. 파일명을 수정해주세요.');
      } else {
        message.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const { data: savedPost } = useAppQuery({
    queryKey: queryKey.post.post(postId),
    queryFn: () => PostControllerService.viewPostUsingGet({ postId }),
    enabled: isEdit,
  });

  // methods
  const onEditorChange = () => {
    form.setValues({
      body: editorRef.current?.getInstance().getMarkdown(),
    });
  };

  const onFormSubmit = (val: typeof form.values) => {
    if (isEdit) {
      updatePost(
        {
          postId,
          request: {
            body: val.body,
            title: val.title,
            fileList: val.fileList,
            /* always false */
            anonymous: false,
          },
        },
        {
          onSuccess() {
            message.success('글이 수정되었습니다.');
            history.push(`/${MENU.BOARD}/${postId}`);
            queryClient.invalidateQueries({
              queryKey: queryKey.post.post(postId),
            });
          },
        },
      );
    } else {
      submitNewPost(
        {
          request: {
            body: val.body,
            title: val.title,
            boardType,
            fileList: val.fileList,
            postType: 'GENERAL_POST',
            /* always false */
            anonymous: false,
            isQuestion: false,
          },
        },
        {
          onSuccess() {
            message.success('글이 작성되었습니다.');
            history.push(`/${MENU.BOARD}?${stringify({ boardType })}`);
            queryClient.invalidateQueries({
              queryKey: queryKey.post.all(boardType, 0),
            });
          },
        },
      );
    }
  };

  const renderDescription = () =>
    match(boardType)
      .with('FREE', () => '자유롭게 글을 작성해보아요')
      .with('NOTICE', () => '공지사항을 올릴 수 있어요')
      .with('PROJECT', () => '프로젝트 팀원을 구해요')
      .with('CS', () => 'CS 전공지식을 공유해요')
      .exhaustive();

  const onUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === 'removed') {
      const getPureName = (name: string) => name.split('/').pop()!;

      form.setFieldValue(
        'fileList',
        form.values.fileList.filter((file) => getPureName(file) !== encodeURIComponent(getPureName(info.file.name))),
      );
      return;
    }

    uploadFile(info.file as unknown as File, {
      onSuccess(fileUrl) {
        form.setFieldValue('fileList', [...form.values.fileList, fileUrl]);
      },
    });
  };

  const getUploadFileList = () =>
    form.values.fileList.map((file, i) => ({
      uid: `UPLOAD_FILE@.${i}`,
      url: getFileUrl(file),
      name: decodeURI(file),
    }));

  // effects
  useEffect(() => {
    if (savedPost) {
      form.setValues({
        title: savedPost.title ?? '',
        body: savedPost.body ?? '',
        fileList: savedPost.fileList ?? [],
      });
      editorRef.current?.getInstance().setMarkdown(savedPost.body ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedPost]);

  useEffect(() => {
    if (savedPost) {
      if (savedPost.writerLoginId !== loginId) {
        alert('잘못된 접근입니다.');
        location.href = '/';
      }
    }
  }, [savedPost, loginId]);

  // render
  return (
    <Block>
      <WhiteBlock>
        <Space direction="vertical" size={0} className={styles.wrapper} split={<Divider className={styles.divider} />}>
          <Breadcrumb
            items={[
              { title: <Link to={`/${MENU.BOARD}`}>게시판</Link> },
              {
                title: <Link to={`/${MENU.BOARD}?${stringify({ boardType })}`}>{getBoardTitleByBoardType(boardType)}</Link>,
              },
            ]}
          />
          <Form onSubmitCapture={form.onSubmit(onFormSubmit, () => {})}>
            <Space direction="vertical" className={styles.fullWidth} size="middle">
              <Space direction="vertical" className={styles.titleWrap} size={0}>
                <Typography.Title level={3}>{getBoardTitleByBoardType(boardType)}</Typography.Title>
                <Typography>{renderDescription()}</Typography>
              </Space>
              <div className={styles.fullWidth}>
                <Form.Item label="제목">
                  <Input placeholder="제목을 입력해주세요." {...form.getInputProps('title')} />
                </Form.Item>
                <div className={styles.editorWrap}>
                  <Editor initialEditType="wysiwyg" ref={editorRef} onChange={onEditorChange} />
                </div>
                <Space direction="horizontal" align="start" className={styles.buttonWrap}>
                  <Upload beforeUpload={() => false} onChange={onUploadChange} fileList={getUploadFileList()}>
                    <Button icon={<UploadOutlined />}>파일 업로드</Button>
                  </Upload>
                  <Space>
                    <Button type="primary" htmlType="submit" className={styles.fullWidth} disabled={!form.isValid()}>
                      등록
                    </Button>
                  </Space>
                </Space>
              </div>
            </Space>
          </Form>
        </Space>
      </WhiteBlock>
    </Block>
  );
}
