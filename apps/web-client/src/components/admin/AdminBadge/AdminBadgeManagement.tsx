import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  BadgeControllerService,
  CustomApi,
  queryKey,
  useAppMutation,
  useAppQuery,
} from '~/lib/api-v2';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { noop } from '~/lib/utils/noop';
import { queryClient } from '~/lib/utils/queryClient';
import { UploadChangeParam } from 'antd/es/upload';
import { createStyles } from 'antd-style';
import { useMessage } from '~/hooks/useMessage';

/* ---------------------------
 * BADGE MANAGEMENT TABLE
 * ---------------------------- */
type DataType = {
  id: number;
  imageUrl: string;
  category: string;
  name: string;
  description: string;
};

const useStyles = createStyles(({ css }) => ({
  fullWidth: css`
    width: 100%;
  `,
}));

export default function AdminBadgeManagement() {
  // data
  const { styles } = useStyles();

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(-1);

  const { data: allBadges } = useAppQuery({
    queryKey: queryKey.badge.all,
    queryFn: BadgeControllerService.getAllBadgeUsingGet,
  });

  const onRefecthAllBadges = () =>
    queryClient.invalidateQueries(queryKey.badge.all);

  const { mutate: deleteBadge } = useAppMutation({
    mutationFn: BadgeControllerService.deleteBadgeUsingDelete,
  });

  const dataSource: DataType[] =
    allBadges?.data?.map((item) => ({
      id: item.id!,
      imageUrl: item.imageUrl ?? '',
      category: item.category ?? '',
      name: item.name ?? '',
      description: item.description ?? '',
    })) ?? [];

  // actions
  const onEditButtonClick = (id: number) => {
    setEditId(id);
    setShowEditModal(true);
  };

  const onDangerButtonClick = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    deleteBadge(
      {
        badgeId: id,
      },
      {
        onSuccess() {
          onRefecthAllBadges().then(noop);
        },
      },
    );
  };

  // render
  const columns: ColumnsType<DataType> = [
    {
      key: 'image',
      title: '이미지',
      render: (_, { imageUrl }) => <Avatar src={imageUrl} />,
    },
    {
      key: 'category',
      title: '카테고리',
      render: (_, { category }) => category,
    },
    {
      key: 'name',
      title: '제목',
      render: (_, { name }) => name,
    },
    {
      key: 'description',
      title: '설명',
      render: (_, { description }) => description,
    },
    {
      key: 'action',
      title: '수정/삭제',
      render: (_, { id, category }) => (
        <Space>
          <Button onClick={() => onEditButtonClick(id)}>수정</Button>
          <Button
            danger
            onClick={() => onDangerButtonClick(id)}
            disabled={['BAEKJOON', 'ATTENDANCE'].includes(category)}
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space direction={'vertical'} className={styles.fullWidth}>
        <Button type={'primary'} onClick={() => setShowGenerateModal(true)}>
          뱃지생성하기
        </Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={'id'}
        />
      </Space>
      {showGenerateModal && (
        <BadgeGenerateModal
          onCancel={() => setShowGenerateModal(false)}
          onOk={onRefecthAllBadges}
        />
      )}
      {showEditModal && (
        <BadgeEditModal
          onCancel={() => setShowEditModal(false)}
          onOk={() => {
            setShowEditModal(false);
            onRefecthAllBadges().catch(console.log);
          }}
          initialValues={dataSource.find((data) => data.id === editId)!}
        />
      )}
    </>
  );
}

/* ---------------------------
 * BADGE GENERATE MODAL
 * ---------------------------- */
const generateSchema = z.object({
  imageUrl: z.string().min(1),
  category: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

function BadgeGenerateModal({
  onOk: _onOk,
  onCancel,
}: {
  onOk: () => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof generateSchema>>({
    validate: zodResolver(generateSchema),
    initialValues: {
      imageUrl: '',
      category: '',
      name: '',
      description: '',
    },
  });

  const { mutate: mutateUploadFile } = useAppMutation({
    mutationFn: CustomApi.uploadFile,
  });

  const { mutate: uploadBadge } = useAppMutation({
    mutationFn: BadgeControllerService.postBadgeUsingPost,
  });

  const message = useMessage();

  const onSubmit = (val: typeof form.values) => {
    uploadBadge(
      {
        postBadgeRequest: {
          imageUrl: val.imageUrl,
          name: val.name,
          description: val.description,
        },
      },
      {
        onSuccess() {
          message.success('뱃지가 생성되었습니다.');
          _onOk();
        },
      },
    );
  };

  const onOk = () => {
    if (!form.isValid()) {
      message.error('폼을 전부 입력해주세요.');
      return;
    }

    onSubmit(form.values);
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    mutateUploadFile(info.file as unknown as File, {
      onSuccess(imageUrl) {
        form.setFieldValue('imageUrl', imageUrl);
      },
    });
  };

  const getUploadFileList = () => {
    return form.values.imageUrl
      ? [
          {
            uid: 'SOME_UID',
            url: form.values.imageUrl,
            name: form.values.imageUrl,
          },
        ]
      : [];
  };

  return (
    <Modal open onCancel={onCancel} onOk={onOk}>
      <Typography.Title level={4}>뱃지 생성</Typography.Title>
      <Form layout={'vertical'} onSubmitCapture={form.onSubmit(onSubmit, noop)}>
        <Form.Item label={'카테고리'}>
          <Input {...form.getInputProps('category')} />
        </Form.Item>
        <Form.Item label={'이름'}>
          <Input {...form.getInputProps('name')} />
        </Form.Item>
        <Form.Item label={'설명'}>
          <Input.TextArea {...form.getInputProps('description')} />
        </Form.Item>
        <Form.Item label={'로고'}>
          <Upload
            beforeUpload={() => false}
            onChange={onUploadChange}
            fileList={getUploadFileList()}
          >
            <Button icon={<UploadOutlined rev={0} />}>로고파일 업로드</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

/* ---------------------------
 * BADGE EDIT MODAL
 * ---------------------------- */
const editSchema = z.object({
  id: z.number(),
  imageUrl: z.string().min(1),
  category: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

function BadgeEditModal({
  onCancel,
  onOk: _onOk,
  initialValues,
}: {
  onCancel: () => void;
  onOk: () => void;
  initialValues: z.infer<typeof editSchema>;
}) {
  const form = useForm<z.infer<typeof editSchema>>({
    validate: zodResolver(editSchema),
    initialValues,
  });

  const { mutate: mutateUploadFile } = useAppMutation({
    mutationFn: CustomApi.uploadFile,
  });

  const { mutate: editBadge } = useAppMutation({
    mutationFn: BadgeControllerService.updateBadgeUsingPut,
  });

  const message = useMessage();

  const onSubmit = (val: typeof form.values) => {
    editBadge(
      {
        badgeId: val.id,
        updateBadgeRequest: {
          imageUrl: val.imageUrl,
          name: val.name,
          description: val.description,
        },
      },
      {
        onSuccess() {
          message.success('뱃지가 수정되었습니다.');
          _onOk();
        },
      },
    );
  };

  const onOk = () => {
    if (!form.isValid()) {
      message.error('폼을 전부 입력해주세요.');
      return;
    }

    onSubmit(form.values);
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    mutateUploadFile(info.file as unknown as File, {
      onSuccess(imageUrl) {
        form.setFieldValue('imageUrl', imageUrl);
      },
    });
  };

  const getUploadFileList = () => {
    return form.values.imageUrl
      ? [
          {
            uid: 'SOME_UID',
            url: form.values.imageUrl,
            name: form.values.imageUrl,
          },
        ]
      : [];
  };

  return (
    <Modal open onCancel={onCancel} onOk={onOk}>
      <Typography.Title level={4}>뱃지 수정</Typography.Title>
      <Form layout={'vertical'} onSubmitCapture={form.onSubmit(onSubmit, noop)}>
        <Form.Item label={'카테고리'}>
          <Input {...form.getInputProps('category')} disabled />
        </Form.Item>
        <Form.Item label={'이름'}>
          <Input {...form.getInputProps('name')} />
        </Form.Item>
        <Form.Item label={'설명'}>
          <Input.TextArea {...form.getInputProps('description')} />
        </Form.Item>
        <Form.Item label={'로고'}>
          <Upload
            beforeUpload={() => false}
            onChange={onUploadChange}
            fileList={getUploadFileList()}
          >
            <Button icon={<UploadOutlined rev={0} />}>로고파일 업로드</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
