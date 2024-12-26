// Antd의 Table사용하면 됨.
import { UploadOutlined } from '@ant-design/icons';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Modal, Form, Input, Typography, Upload, Button, Space, UploadFile, InputNumber } from 'antd';
import { useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
import { BookControllerService, CreateBookRequest, CustomApi, UpdateBookRequest, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import getFileUrl from '~/lib/utils/getFileUrl';

// export type FormType = {
interface dynamic {
  [prop: string]: any;
}
export interface FormType extends dynamic {
  id: number;
  title: string;
  link: string;
  image: string;
  author: string;
  discount: number;
  publisher: string;
  isbn: string;
  description: string;
  publishedDate: string;
  donor: string;
}
type PreviewType = {
  uid: string;
  name: string;
  url: string;
  status?: string;
};
const editSchema = z.object({
  title: z.string().min(1),
  link: z.string().min(1), // 네이버 구매 링크
  image: z.string().min(1), // 책 이미지 url
  author: z.string().min(1),
  discount: z.number().min(0),
  publisher: z.string().min(1),
  isbn: z.string().min(1),
  description: z.string(),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  donor: z.string(),
});

export default function AdminBookForm({ initValues }: { initValues?: FormType }) {
  // test
  console.log('INITB: ', initValues);
  const form = useForm<z.infer<typeof editSchema>>({
    validate: zodResolver(editSchema),
    initialValues: initValues,
  });
  const { mutate: createBook } = useAppMutation({ mutationFn: BookControllerService.addBookUsingPost });
  const { mutate: updateBook } = useAppMutation({ mutationFn: BookControllerService.updateBookUsingPut });
  const { mutate: uploadImage, isPending: isUploadPending } = useAppMutation({ mutationFn: CustomApi.uploadFile });

  const handleChangeBookImage = (info: UploadChangeParam<UploadFile>) => {
    const imageFile: File & { status?: string } = info?.file as unknown as File;

    if (imageFile?.status === 'removed') {
      form.setFieldValue('image', '');
      return;
    }

    uploadImage(imageFile, {
      onSuccess(imgUrl) {
        form.setFieldValue('image', imgUrl);
      },
    });
  };
  const uploadedFile: () => UploadFile<PreviewType>[] = () => {
    if (isUploadPending) return [{ uid: 'SOME_UID', status: 'uploading', name: '', url: '' }];
    if (form.errors.image) return [{ uid: 'SOME_UID', status: 'error', name: '', url: '' }];
    if (form.values.image)
      return [
        {
          uid: 'SOME_UID',
          url: getFileUrl(form.values.image),
          name: decodeURI(form.values.image),
          status: 'done',
        },
      ];

    return [];
  };

  const onSubmit = (val: typeof form.values) => {
    if (initValues) {
      updateBook({ id: initValues.id, request: val });
    } else {
      createBook({ request: val });
    }
  };

  const InputInfo = [
    { label: '책 제목', name: 'title' },
    { label: '저자', name: 'author' },
    { label: '표지 이미지', name: 'upload' },
    { label: '출판사', name: 'publisher' },
    { label: '소개', name: 'description' },
    { label: '출판일', name: 'publishedDate' },
    { label: '기증자', name: 'donor' },
    { label: '구매 주소', name: 'link' },
    { label: '할인가', name: 'discount' },
    { label: 'ISBN 도서번호', name: 'isbn' },
  ];

  return (
    <>
      <Typography.Title level={5}>도서 정보</Typography.Title>
      <Form name="request" onSubmitCapture={form.onSubmit(onSubmit)}>
        {InputInfo.map((info) => {
          switch (info.name) {
            case 'upload':
              return (
                <Form.Item key={info.name} name="upload" label="표지 이미지">
                  <Upload name="upload" listType="picture" beforeUpload={() => false} onChange={handleChangeBookImage} fileList={uploadedFile()}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              );
            case 'discount':
              return (
                <Form.Item label={info.label} name={info.name} key={info.name}>
                  <InputNumber {...form.getInputProps(info.name)} status={form?.errors?.[info.name] ? 'error' : ''} defaultValue={initValues?.[info.name]} />
                </Form.Item>
              );
            case 'publishedDate':
              return (
                <Form.Item label={info.label} name={info.name} key={info.name}>
                  <Input {...form.getInputProps(info.name)} status={form?.errors?.[info.name] ? 'error' : ''} placeholder="yyyy-mm-dd" defaultValue={initValues?.[info.name]} />
                </Form.Item>
              );

            default:
              return (
                <Form.Item label={info.label} name={info.name} key={info.name}>
                  <Input {...form.getInputProps(info.name)} status={form?.errors?.[info.name] ? 'error' : ''} defaultValue={initValues?.[info.name]} />
                </Form.Item>
              );
          }
        })}
        ;
        {/* <StyledInput valueText={title} labelText="책 제목" typeText="text" nameText="title" onChangeFunc={onChangeTitle} placeholderText="ex) 클린 코드" />
        <StyledInput valueText={author} labelText="저자" typeText="text" nameText="author" onChangeFunc={onChangeAuthor} placeholderText="ex) 로버트 C. 마틴" />
        <label>표지 이미지 첨부</label>
        <FileUploadButton onSubmit={setImageURL} />
        <FileName style={{ marginBottom: '0rem' }}>{imageURL ? getFileUrl(imageURL) : '선택된 파일이 없습니다'}</FileName>
        <ImageContainer>
          <ImageContainerHeader>현재 이미지</ImageContainerHeader>
          {imageURL ? <StyledImage src={getFileUrl(imageURL)} /> : <p style={{ fontWeight: 300 }}>이미지가 없습니다.</p>}
        </ImageContainer>
        <StyledInput valueText={info} labelText="설명" typeText="text" nameText="info" onChangeFunc={onChangeInfo} placeholderText="ex) ㅇㅇㅇ 기증" />
        {book ? <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton> : <StyledActionButton onClick={handleCreate}>제출</StyledActionButton>} */}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
