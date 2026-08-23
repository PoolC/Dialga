import { Button, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { Link, useHistory } from 'react-router-dom';
import { stringify } from 'qs';
import { PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import BoardList from '~/components/board/BoardList';
import { useSearchParams } from '~/hooks/useSearchParams';
import { MENU } from '~/constants/menus';
import { BoardType, getBoardTitle } from '~/lib/utils/boardUtil';
import { useAppSelector } from '~/hooks/useAppSelector';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    && {
      padding: 30px 0;
    }
  `,
  wrapper: css`
    width: 100%;
    max-width: 1200px;
    padding: 0 12px;
    box-sizing: border-box;

    .ant-tabs-nav {
      margin-bottom: 16px;
    }

    .ant-tabs-tab {
      padding: 12px 0 14px;
    }
  `,
  writeButton: css`
    margin-bottom: 8px;
  `,
}));

export default function BoardListPage() {
  const { styles } = useStyles();
  const searchParams = useSearchParams();
  const isLogin = useAppSelector((state) => state.auth.status.isLogin);
  const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);

  const requestedBoardType = (searchParams.get('boardType') ?? 'NOTICE') as BoardType;
  const page = Number(searchParams.get('page') ?? 1);

  const history = useHistory();

  const items: {
    key: BoardType;
    label: string;
    children: JSX.Element;
  }[] = [
    {
      key: 'NOTICE',
      label: getBoardTitle('NOTICE'),
      children: <BoardList boardType="NOTICE" page={page} />,
    },
    ...(isLogin
      ? [
          {
            key: 'PROJECT' as BoardType,
            label: getBoardTitle('PROJECT'),
            children: <BoardList boardType="PROJECT" page={page} />,
          },
          {
            key: 'EXTERNAL' as BoardType,
            label: getBoardTitle('EXTERNAL'),
            children: <BoardList boardType="EXTERNAL" page={page} />,
          },
          {
            key: 'CAREER' as BoardType,
            label: getBoardTitle('CAREER'),
            children: <BoardList boardType="CAREER" page={page} />,
          },
          {
            key: 'FREE' as BoardType,
            label: getBoardTitle('FREE'),
            children: <BoardList boardType="FREE" page={page} />,
          },
          ...(isAdmin
            ? [
                {
                  key: 'STAFF' as BoardType,
                  label: getBoardTitle('STAFF'),
                  children: <BoardList boardType="STAFF" page={page} />,
                },
              ]
            : []),
        ]
      : []),
  ];
  const boardType = items.some((item) => item.key === requestedBoardType) ? requestedBoardType : 'NOTICE';

  const onTabChange = (key: string) => history.push(`/${MENU.BOARD}?boardType=${key}&page=1`);

  const renderWriteButton = () => {
    if (boardType === 'NOTICE' && !isAdmin) {
      return null;
    }

    return (
      <Link to={`/${MENU.BOARD}/write?${stringify({ boardType })}`} className={styles.writeButton}>
        <Button type="primary" icon={<EditOutlined />}>
          글쓰기
        </Button>
      </Link>
    );
  };

  return (
    <PageShell>
      <PagePanel className={styles.whiteBlock}>
        <div className={styles.wrapper}>
          <Tabs items={items} activeKey={boardType} onChange={onTabChange} tabBarExtraContent={renderWriteButton()} />
        </div>
      </PagePanel>
    </PageShell>
  );
}
