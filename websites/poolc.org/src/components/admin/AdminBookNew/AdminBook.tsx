import { Button, Flex, Modal, Result, Skeleton, Table, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React, { ReactNode, useState, Dispatch } from 'react';
import { match } from 'ts-pattern';
import { useHistory } from 'react-router';
import { BookControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import AdminBookFormNew, { FormType } from '../AdminBookFormNew/AdminBookForm';
import getFileUrl from '~/lib/utils/getFileUrl';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    padding: 30px 0;
  `,
  title: css`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    margin: 1rem;
  `,
  body: css`
    width: 90%;
    gap: 1rem;
  `,
}));
const makecolumns = (onEdit: (data: FormType) => void, onDelete: (id: number) => void) =>
  [
    {
      title: '표지',
      key: 'image',
      render: (_: unknown, record: FormType) => <img height="100px" src={getFileUrl(record.image)} alt={record.title} />,
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      onCell: () => ({ style: { 'vertical-align': 'middle' } }),
    },
    {
      title: '저자',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status', // 값으로는 이용가능 or 대출중
    },
    {
      title: '동작',
      key: 'action',
      render: (_: unknown, record: FormType) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button type="default" style={{ borderColor: 'gray', color: 'gray' }} onClick={() => onEdit(record)}>
            편집
          </Button>
          <Button type="default" danger onClick={() => onDelete(record.id!)}>
            삭제
          </Button>
        </div>
      ),
    },
  ].map((colInfo) => ({ ...colInfo, onCell: () => ({ style: { verticalAlign: 'middle' } }) }));

type ModalInfo = { isOpen: boolean; data?: FormType };

const AdminBookLayout =
  // React.memo(
  ({ setModal, children }: { setModal: Dispatch<React.SetStateAction<ModalInfo>>; children: ReactNode }) => {
    const { styles } = useStyles();
    // const [modal, setModal] = useState<{ isOpen: boolean; data?: FormType }>({ isOpen: false });

    return (
      <Block>
        <WhiteBlock className={styles.whiteBlock}>
          <Typography.Title level={3}>도서 관리</Typography.Title>
          <Flex vertical className={styles.body}>
            <Flex justify="end" align="center">
              <Button type="primary" onClick={() => setModal((prev) => ({ isOpen: !prev.isOpen }))}>
                도서 생성
              </Button>
            </Flex>
            <div>{children}</div>
          </Flex>
        </WhiteBlock>
      </Block>
    );
  };
// )

export default function AdminBook() {
  // const [modal, setModal] = useState<{ isOpen: boolean; data?: FormType }>({ isOpen: false });
  const [modal, setModal] = useState<ModalInfo>({ isOpen: false });

  const [page, setPage] = useState<number>(0);

  const bookListQuery = useAppQuery({
    queryKey: queryKey.book.all('TITLE', page), // 전체 불러오기
    queryFn: () => BookControllerService.getAllBooksUsingGet({ sort: 'TITLE', page }), // 일단 이름 순으로
  });

  const history = useHistory();

  const { mutate: bookDeleteMutatoin } = useAppMutation({ mutationFn: BookControllerService.deleteBookUsingDelete });

  const onEdit = (data: FormType) => {
    setModal({ isOpen: true, data });
  };
  const onDelete = (id: number) => {
    bookDeleteMutatoin({ id });
    history.go(0);
  };

  const onModalCancel = () => {
    setModal({ ...modal, isOpen: false });
    // history.go(0);
  };

  const columns = makecolumns(onEdit, onDelete);

  return (
    <>
      <AdminBookLayout setModal={setModal}>
        {match(bookListQuery)
          .with({ status: 'pending' }, () => <Skeleton />)
          .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
          .with({ status: 'success' }, ({ data: { content, totalElements } }) => {
            // { posts: postList, maxPage }

            const tableResource = content?.map((value) => ({
              key: value.id,
              id: value.id!,
              image: value.imageURL || '',
              title: value.title || '',
              author: value.author || '',
              status: value.status || '',
              link: value.link || '',
              discount: value.discount || 0,
              publisher: value.publisher || '',
              isbn: value.isbn || '',
              description: value.description || '',
              donor: value.donor || '',
              pubdate: value.publishedDate || '',
            }));

            return (
              <Table
                dataSource={tableResource}
                scroll={{ x: 'max-content' }}
                columns={columns}
                pagination={{
                  onChange: (page) => {
                    setPage(page - 1);
                  },
                  total: totalElements,
                  // pageSize: totalElements,
                }}
              />
            );
          })
          .exhaustive()}
      </AdminBookLayout>
      {modal.isOpen && (
        <Modal centered open={modal.isOpen} onCancel={onModalCancel} footer={null} width={1000}>
          <AdminBookFormNew initValues={modal?.data} onModalCancel={onModalCancel} />
        </Modal>
      )}
    </>
  );
}
