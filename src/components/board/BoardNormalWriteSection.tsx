import React, { FormEventHandler, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Space,
  Typography,
  Upload,
} from 'antd';
import {
  CustomApi,
  PostControllerService,
  queryKey,
  useAppMutation,
  useAppQuery,
} from '~/lib/api-v2';
import { UploadChangeParam } from 'antd/es/upload';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { Link, useHistory } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { stringify } from 'qs';
import { FiUpload } from 'react-icons/fi';
import { createStyles } from 'antd-style';
import { BoardType, getBoardTitleByBoardType } from '~/lib/utils/boardUtil';
import { match } from 'ts-pattern';
import { useMessage } from '~/hooks/useMessage';

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

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  fileList: z.array(z.string()),
});

/**
 * TODO
 * - 편집시 데이터 바인딩
 * - 권한 확인
 * */
export default function BoardNormalWriteSection({
  boardType,
  postId,
}: {
  boardType: Exclude<BoardType, 'JOB'>;
  postId: number;
}) {
  const { styles } = useStyles();
  const history = useHistory();

  const editorRef = useRef<Editor | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    initialValues: {
      title: '',
      body: '',
      fileList: [],
    },
    validate: zodResolver(schema),
  });

  const message = useMessage();

  const { mutate: submitPost } = useAppMutation({
    mutationFn: PostControllerService.registerPostUsingPost,
  });

  const { mutate: mutateUploadFile } = useAppMutation({
    mutationFn: CustomApi.uploadFile,
  });

  const { data: savedPost } = useAppQuery({
    queryKey: queryKey.post.post(postId),
    queryFn: () => PostControllerService.viewPostUsingGet({ postId }),
    enabled: postId > 0,
  });

  // methods
  // NOTE 에디터에서 값을 직접 가져올 수 없어서 이벤트 버블링 이용
  const onEditorInput: FormEventHandler = () => {
    form.setValues({
      body: editorRef.current?.getInstance().getHtml(),
    });
  };

  const onFormSubmit = (val: typeof form.values) => {
    submitPost(
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
        },
        onError() {
          message.error('에러가 발생했습니다.');
        },
      },
    );
  };

  const renderDescription = () =>
    match(boardType)
      .with('FREE', () => '자유롭게 글을 작성해보아요')
      .with('NOTICE', () => '공지사항을 올릴 수 있어요')
      .with('PROJECT', () => '프로젝트 팀원을 구해요')
      .with('CS', () => 'CS 전공지식을 공유해요')
      .exhaustive();

  const onUploadChange = (info: UploadChangeParam) => {
    mutateUploadFile(info.file as unknown as File, {
      onSuccess(fileUrl) {
        form.setFieldValue('fileList', [...form.values.fileList, fileUrl]);
      },
      onError() {
        message.error('에러가 발생했습니다.');
      },
    });
  };

  const getUploadFileList = () => {
    return form.values.fileList.map((file, i) => ({
      uid: `UPLOAD_FILE@.${i}`,
      url: file,
      name: file,
    }));
  };

  // effects
  useEffect(() => {
    if (savedPost) {
      form.setValues({
        title: savedPost.title ?? '',
        body: savedPost.body ?? '',
        fileList: savedPost.fileList ?? [],
      });
      editorRef.current?.getInstance().setHtml(savedPost.body ?? '');
    }
  }, [savedPost]);

  // render
  return (
    <Block>
      <WhiteBlock>
        <Space
          direction={'vertical'}
          size={0}
          className={styles.wrapper}
          split={<Divider className={styles.divider} />}
        >
          <Breadcrumb
            items={[
              { title: <Link to={`/${MENU.BOARD}`}>게시판</Link> },
              {
                title: (
                  <Link to={`/${MENU.BOARD}?${stringify({ boardType })}`}>
                    {getBoardTitleByBoardType(boardType)}
                  </Link>
                ),
              },
            ]}
          />
          <Form onSubmitCapture={form.onSubmit(onFormSubmit, () => {})}>
            <Space
              direction={'vertical'}
              className={styles.fullWidth}
              size={'middle'}
            >
              <Space
                direction={'vertical'}
                className={styles.titleWrap}
                size={0}
              >
                <Typography.Title level={3}>
                  {getBoardTitleByBoardType(boardType)}
                </Typography.Title>
                <Typography>{renderDescription()}</Typography>
              </Space>
              <div className={styles.fullWidth}>
                <Form.Item label={'제목'}>
                  <Input
                    placeholder={'제목을 입력해주세요.'}
                    {...form.getInputProps('title')}
                  />
                </Form.Item>
                <div onInput={onEditorInput} className={styles.editorWrap}>
                  <Editor initialEditType="wysiwyg" ref={editorRef} />
                </div>
                <Space
                  direction={'horizontal'}
                  align={'start'}
                  className={styles.buttonWrap}
                >
                  <Upload
                    multiple
                    beforeUpload={() => false}
                    onChange={onUploadChange}
                    fileList={getUploadFileList()}
                  >
                    <Button icon={<FiUpload />}>파일 업로드</Button>
                  </Upload>
                  <Space>
                    <Button
                      type={'primary'}
                      htmlType={'submit'}
                      className={styles.fullWidth}
                      disabled={!form.isValid()}
                    >
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
