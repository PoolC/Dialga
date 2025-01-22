import { Avatar, Button, Empty, Input, Pagination, Result, Select, Skeleton, Space, Table, Typography, Form } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useHistory } from 'react-router-dom';
// import { createStyles } from 'antd-style';
import { match } from 'ts-pattern';
import { stringify } from 'qs';
import { CommentOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createStyles } from 'antd-style';
import { MENU } from '~/constants/menus';
import { BookControllerService, PostControllerService, BookResponse, queryKey, useAppQuery } from '~/lib/api-v2';
import { BoardType, getBoardTitleForRequest } from '~/lib/utils/boardUtil';
import { dayjs } from '~/lib/utils/dayjs';
import getFileUrl from '~/lib/utils/getFileUrl';
import { useAppSelector } from '~/hooks/useAppSelector';
import { getInnerTextFromMarkdown } from '~/lib/utils/getInnerTextFromMarkdown';
import BookCard from './BookCard';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0px 10%;
    box-sizing: border-box;
  `,
  flexList: css`
    width: 100%;
    max-width: 930px;
    /* width: 930px; */
    /* grid-auto-rows: 100px; */
    /* max-width: 940px; */
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(218px, 1fr)); */
    grid-template-columns: repeat(auto-fill, minmax(218px, 1fr));
    grid-gap: 138px;
    justify-items: center;

    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: row; */
    /* padding: 10%; */
    /* gap: 130px; */
    /* gap: 150px; */
    /* justify-content: flex-start; */
    /* align-items: center; */
  `,
  option: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  `,
  sortSelect: css`
    appearance: none;
    border: none !important;
    outline: none;
    width: 100px;
    text-align: center;
    & option {
      background: rgba(250, 250, 250, 1);
      border: none;
      outline: none;
    }
    .ant-select-selector {
      border: none !important;
    }
    .ant-select-selector:hover {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-select-selector:focus {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-select-dropdown {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(250, 250, 250, 1);
    }
    .ant-select-item-option {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 13px;
    }
    .ant-select-item-option-selected .ant-select-item-option-content {
      color: rgba(72, 189, 155, 1);
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: rgba(250, 250, 250, 1);
    }
  `,
  search: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* gap: 12px; */
    width: 330px;
  `,
  searchSelect: css`
    width: 70px;
    /* .ant-select-arrow {
      transform: translateX(-27px);
    } */
    .ant-select-selector {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
    }
    .ant-select-selection-item {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 14px;
    }
    .ant-select-dropdown {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
    }
    .ant-select-item-option {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 13px;
      text-align: center;
    }
    .ant-select-item-option-selected .ant-select-item-option-content {
      color: rgba(72, 189, 155, 1);
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: rgba(250, 250, 250, 1);
    }
  `,
  searchInput: css`
    max-width: 197px;
  `,
  searchBtn: css`
    width: 55px;
  `,
}));
const initSearchForm = { type: 'title', query: '' };
function BookListSearch({ setSearch }) {
  const { styles } = useStyles();
  const [formInfo, setFormInfo] = useState(initSearchForm);
  return (
    <Form
      initialValues={initSearchForm}
      className={styles.search}
      onFinish={(values) => {
        setSearch(values);
      }}
      onFinishFailed={(error) => {
        console.error('Error: ', error);
      }}
    >
      <Form.Item name="type">
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          className={styles.searchSelect}
          defaultValue={initSearchForm.type}
          options={[
            { value: 'title', label: '제목' },
            { value: 'author', label: '저자' },
            { value: 'tag', label: '태그' },
          ]}
          onChange={(data) => setFormInfo({ ...formInfo, type: data })}
        />
      </Form.Item>
      <Form.Item name="query">
        <Input className={styles.searchInput} value={formInfo.query} onChange={(e) => setFormInfo({ ...formInfo, query: e.target.value })} />
      </Form.Item>
      <Form.Item label={null}>
        <Button className={styles.searchBtn} type="primary" htmlType="submit">
          검색
        </Button>
      </Form.Item>
      {/* // </form> */}
    </Form>
  );
}

export default function BookList({ page }: { page: number }) {
  // data
  const { styles } = useStyles();
  // const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);
  type sortingType = 'TITLE' | 'CREATED_AT' | 'RENT_TIME';
  const [sorting, setSorting] = useState<sortingType>('CREATED_AT');
  const [search, setSearch] = useState({ type: '', query: '' });

  const bookListQuery = useAppQuery({
    queryKey: queryKey.book.all(sorting, page),
    queryFn: () => BookControllerService.getAllBooksUsingGet({ page: 0, sort: sorting }),

    //   BookControllerService.findBooksUsingGet({query:검색어, page:페이지인덱스})
  });

  const history = useHistory();

  // methods
  const onPageChange = (page: number) =>
    history.push(
      `/${MENU.BOOK}?${stringify({
        page,
      })}`,
    );

  //   const renderWriteButton = () => {
  //     const button = (
  //       <Link to={`/${MENU.BOARD}/write?${stringify({ boardType })}`}>
  //         <Button type="primary" icon={<EditOutlined />}>
  //           글쓰기
  //         </Button>
  //       </Link>
  //     );

  //     if (boardType !== 'NOTICE') {
  //       return button;
  //     }

  //     return isAdmin ? button : null;
  //   };

  return (
    <div className={styles.wrapper}>
      <h2>보유 도서</h2>
      <div className={styles.option}>
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          className={styles.sortSelect}
          value={sorting}
          onChange={(param) => {
            setSorting(param as sortingType);
          }}
          options={[
            { value: 'CREATED_AT', label: '등록순' },
            { value: 'TITLE', label: '가나다순' },
            { value: 'RENT_TIME', label: '최근반납순' },
          ]}
        />
        <BookListSearch setSearch={setSearch} />
        {/* <form
          className={styles.search}
          onSubmit={(e) => {
            // e.preventDefault();
            console.log('SUBMIT: ', e);
          }}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            className={styles.searchSelect}
            defaultValue="title"
            options={[
              { value: 'title', label: '제목' },
              { value: 'author', label: '저자' },
              { value: 'tag', label: '태그' },
            ]}
            onChange={(data) => setSearch({ ...search, type: data })}
          />
          <Input className={styles.searchInput} value={search.query} onChange={(e) => setSearch({ ...search, query: e.target.value })} />
          <Button className={styles.searchBtn} type="primary" htmlType="submit">
            검색
          </Button>
        </form> */}
      </div>
      {/* <div 
      className={styles.topArea}>{renderWriteButton()}</div> */}
      {match(bookListQuery)
        .with({ status: 'pending' }, () => <Skeleton style={{ width: '100%' }} />)
        .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
        .with({ status: 'success' }, ({ data: { content, totalPages } } /* { posts: postList, maxPage } */) => {
          //   if (!postList) {
          //     return <Empty />;
          //   }

          // const content = content; // filter(Boolean);

          if (!content || content.length! === 0) {
            return <Empty />;
          }

          return (
            <>
              <div className={styles.flexList}>
                {content.map((bookData: { id: number; title: string; imageURL: string; status: string }) => (
                  <BookCard key={bookData.id} data={bookData} />
                ))}
              </div>

              {/* <Table dataSource={filteredList.content} columns={columns} showHeader={false} pagination={false} rowKey="postId" /> */}
              {/* <div className={styles.paginationWrap}> */}
              <Pagination current={page} total={totalPages} showSizeChanger={false} onChange={onPageChange} />
              {/* </div> */}
            </>
          );
        })
        .exhaustive()}
    </div>
  );
}
