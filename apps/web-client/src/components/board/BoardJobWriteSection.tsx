import { FormEventHandler, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import {
  Breadcrumb,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Space,
  Typography,
  Upload,
} from 'antd';
import {
  ApiError,
  CustomApi,
  PostControllerService,
  PostCreateRequest,
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
import dayjs from 'dayjs';
import { convertPositionToText } from '~/lib/utils/positionUtil';
import { useMessage } from '~/hooks/useMessage';
import { noop } from '~/lib/utils/noop';
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
    margin-top: 24px;
  `,
  divider: css`
    margin: 12px 0;
  `,
}));

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  position: z.string().min(1),
  field: z.string().min(1),
  deadline: z.string().min(1),
  region: z.string().min(1),
  fileList: z.array(z.string()),
});

export default function BoardJobWriteSection({ postId }: { postId: number }) {
  // data
  const { styles } = useStyles();
  const message = useMessage();
  const history = useHistory();

  const editorRef = useRef<Editor | null>(null);
  const form = useForm<z.infer<typeof schema>>({
    initialValues: {
      title: '',
      body: '',
      position: '',
      field: '',
      deadline: dayjs().format('YYYY-MM-DD'),
      region: '',
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

  const { mutate: mutateUploadFile } = useAppMutation({
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

  const positions: { value: PostCreateRequest['position'] }[] = [
    { value: 'BOOTCAMP' },
    { value: 'COMPETITION' },
    { value: 'NEW_EMPLOYEE' },
    { value: 'EXPERIENCED_EMPLOYEE' },
    { value: 'INTERN_FOR_EXPERIENCE' },
    { value: 'INTERN_FOR_JOB' },
    { value: 'OTHER' },
  ];

  const fields: { value: string }[] = [
    { value: '웹' },
    { value: '모바일' },
    { value: '인공지능' },
    { value: '데이터사이언스' },
    { value: '블록체인' },
    { value: '시스템' },
    { value: '기타' },
  ];

  // methods
  // NOTE 에디터에서 값을 직접 가져올 수 없어서 이벤트 버블링 이용
  const onEditorInput: FormEventHandler = () => {
    form.setValues({
      body: editorRef.current?.getInstance().getHtml(),
    });
  };

  const onUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === 'removed') {
      form.setFieldValue(
        'fileList',
        form.values.fileList.filter((file) => file !== info.file.name),
      );
      return;
    }

    mutateUploadFile(info.file as unknown as File, {
      onSuccess(fileUrl) {
        form.setFieldValue('fileList', [...form.values.fileList, fileUrl]);
      },
    });
  };

  const getUploadFileList = () => {
    return form.values.fileList.map((file, i) => ({
      uid: `UPLOAD_FILE@.${i}`,
      url: getFileUrl(file),
      name: file,
    }));
  };

  const onFormSubmit = (val: typeof form.values) => {
    if (isEdit) {
      updatePost(
        {
          postId,
          request: {
            body: val.body,
            title: val.title,
            deadline: dayjs(val.deadline).toISOString(),
            field: val.field,
            region: val.region,
            fileList: val.fileList,
            position: val.position as PostCreateRequest['position'],
            /* always false */
            anonymous: false,
          },
        },
        {
          onSuccess() {
            message.success('글이 수정되었습니다.');
            history.push(`/${MENU.BOARD}/${postId}`);
          },
        },
      );
    } else {
      submitNewPost(
        {
          request: {
            body: val.body,
            title: val.title,
            deadline: dayjs(val.deadline).format('YYYY-MM-DD'),
            field: val.field,
            region: val.region,
            fileList: val.fileList ?? [],
            position: val.position as PostCreateRequest['position'],
            /* always false */
            anonymous: false,
            isQuestion: false,
          },
        },
        {
          onSuccess() {
            message.success('글이 작성되었습니다.');
            history.push(`/${MENU.BOARD}?${stringify({ boardType: 'JOB' })}`);
          },
        },
      );
    }
  };

  // effects
  useEffect(() => {
    if (savedPost) {
      form.setValues({
        title: savedPost.title ?? '',
        body: savedPost.body ?? '',
        fileList: savedPost.fileList ?? [],
        deadline: savedPost.deadline,
        field: savedPost.field?.trim(),
        region: savedPost.region,
        position: savedPost.position,
      });
      editorRef.current?.getInstance().setHtml(savedPost.body ?? '');
    }
  }, [savedPost]);

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
                  <Link
                    to={`/${MENU.BOARD}?${stringify({
                      boardType: 'JOB',
                    })}`}
                  >
                    취업게시판
                  </Link>
                ),
              },
            ]}
          />
          <Space
            direction={'vertical'}
            className={styles.fullWidth}
            size={'middle'}
          >
            <Space direction={'vertical'} className={styles.titleWrap} size={0}>
              <Typography.Title level={3}>취업게시판</Typography.Title>
              <Typography>취업 관련 글을 작성해보아요</Typography>
            </Space>
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              onSubmitCapture={form.onSubmit(onFormSubmit, noop)}
            >
              <Form.Item label="제목">
                <Input
                  placeholder={'제목을 입력해주세요.'}
                  {...form.getInputProps('title')}
                />
              </Form.Item>
              <Form.Item label="고용형태">
                <Radio.Group
                  onChange={(e) =>
                    form.setFieldValue('position', e.target.value)
                  }
                  value={form.values.position}
                >
                  {positions.map((position) => (
                    <Radio key={position.value} value={position.value}>
                      {convertPositionToText(position.value)}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item label="지역">
                <Input
                  placeholder="지역을 입력해주세요."
                  {...form.getInputProps('region')}
                />
              </Form.Item>
              <Form.Item label="분야">
                <Radio.Group
                  onChange={(e) => form.setFieldValue('field', e.target.value)}
                  value={form.values.field}
                >
                  {fields.map((field) => (
                    <Radio key={field.value} value={field.value}>
                      {field.value}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item label="마감일자">
                <DatePicker
                  value={dayjs(form.values.deadline) as any}
                  onChange={(_, date) =>
                    date && form.setFieldValue('deadline', date)
                  }
                />
              </Form.Item>
              <div onInput={onEditorInput}>
                <Editor initialEditType="wysiwyg" ref={editorRef} />
              </div>
              <Space
                direction={'horizontal'}
                align={'start'}
                className={styles.buttonWrap}
              >
                <Upload
                  beforeUpload={() => false}
                  onChange={onUploadChange}
                  fileList={getUploadFileList()}
                >
                  <Button icon={<FiUpload />}>파일 업로드</Button>
                </Upload>
                <Button
                  type={'primary'}
                  htmlType={'submit'}
                  className={styles.fullWidth}
                  disabled={!form.isValid()}
                >
                  등록
                </Button>
              </Space>
            </Form>
          </Space>
        </Space>
      </WhiteBlock>
    </Block>
  );
}
