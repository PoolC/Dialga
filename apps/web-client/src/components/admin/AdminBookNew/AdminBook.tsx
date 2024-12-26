import { Button, Flex, Modal, Result, Skeleton, Table, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { useHistory } from 'react-router';
import { BookControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import AdminBookFormNew, { FormType } from '../AdminBookFormNew/AdminBookForm';
import AdminBookForm from '../AdminBookForm/AdminBookForm';

// Antd의 Table사용하면 됨.

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
const makecolumns = (onEdit, onDelete) =>
  [
    {
      title: '표지',
      key: 'image',
      render: (_, record) => <img height="100px" src={record.image} alt={record.title} />,
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
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button type="default" style={{ borderColor: 'gray', color: 'gray' }} onClick={() => onEdit(record)}>
            편집
          </Button>
          <Button type="default" danger onClick={() => onDelete(record.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ].map((colInfo) => ({ ...colInfo, onCell: () => ({ style: { verticalAlign: 'middle' } }) }));
export default function AdminBook() {
  const { styles } = useStyles();
  const [modal, setModal] = useState<{ isOpen: boolean; data?: FormType }>({ isOpen: false });
  const bookListQuery = useAppQuery({
    queryKey: queryKey.book.all(), // 전체 불러오기
    queryFn: () => BookControllerService.getAllBooksUsingGet({}),
  });
  const history = useHistory();

  const { mutate: bookDeleteMutatoin } = useAppMutation({ mutationFn: BookControllerService.deleteBookUsingDelete });

  const onEdit = (data) => {
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
  // test
  console.log('modalta: ', modal.data);

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <Typography.Title level={3}>도서 관리</Typography.Title>
        <Flex vertical className={styles.body}>
          <Flex justify="end" align="center">
            <Button type="primary" onClick={() => setModal({ isOpen: !modal.isOpen })}>
              도서 생성
            </Button>
          </Flex>
          <div>
            {match(bookListQuery)
              .with({ status: 'pending' }, () => <Skeleton />)
              .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
              .with({ status: 'success' }, ({ data: { content, totalPages } } /* { posts: postList, maxPage } */) => {
                const tableResource = content?.map((value) => ({ ...value, key: value.id, id: value.id, image: value.imageURL, title: value.title, author: value.author, status: value.status }));
                return <Table dataSource={tableResource} scroll={{ x: 'max-content' }} columns={columns} pagination={{ total: totalPages }} />;
              })
              .exhaustive()}
          </div>
        </Flex>
      </WhiteBlock>
      {modal.isOpen && (
        <Modal centered open={modal.isOpen} onCancel={onModalCancel} footer={null} width={1000}>
          <AdminBookFormNew initValues={modal?.data} />
        </Modal>
      )}
    </Block>
  );
}
