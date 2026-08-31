import { createStyles } from 'antd-style';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { stringify } from 'qs';
import { PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import ActionButton from '~/components/common/Buttons/ActionButton';
import { MobileSectionFilter } from '~/components/common/MobileSectionFilter/MobileSectionFilter';
import { ListSearchToolbar } from '~/components/common/ListSearchToolbar/ListSearchToolbar';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import BoardList from '~/components/board/BoardList';
import { useSearchParams } from '~/hooks/useSearchParams';
import { MENU } from '~/constants/menus';
import { BoardType, getBoardTitle } from '~/lib/utils/boardUtil';
import { useAppSelector } from '~/hooks/useAppSelector';
import { isAuthorizedRole } from '~/lib/utils/checkRole';
import { media } from '~/styles/responsive';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
  `,
  headerActions: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  sectionTabs: css`
    ${media.mobile} {
      display: none;
    }
  `,
  mobileWriteButton: css`
    display: none;

    ${media.mobile} {
      position: fixed;
      right: 20px;
      bottom: calc(20px + env(safe-area-inset-bottom));
      z-index: 20;
      display: block;

      button {
        min-height: 48px;
        padding: 0 18px;
        border-radius: 24px;
        box-shadow: 0 8px 20px rgb(47 151 121 / 28%);
      }
    }
  `,
  mobileSearchToolbar: css`
    display: none;

    ${media.mobile} {
      display: flex;
      margin-bottom: 16px;
    }
  `,
}));

export default function BoardListPage() {
  const { styles } = useStyles();
  const searchParams = useSearchParams();
  const isLogin = useAppSelector((state) => state.auth.status.isLogin);
  const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);
  const role = useAppSelector((state) => state.auth.user.role);
  const canAccessMemberBoards = isLogin && isAuthorizedRole(role);

  const requestedBoardType = searchParams.get('boardType') ?? 'NOTICE';
  const page = Number(searchParams.get('page') ?? 1);
  const submittedKeyword = searchParams.get('keyword') ?? '';
  const [keyword, setKeyword] = useState(submittedKeyword);

  const history = useHistory();

  const items: {
    key: BoardType;
    label: string;
  }[] = [
    {
      key: 'NOTICE',
      label: getBoardTitle('NOTICE'),
    },
    ...(canAccessMemberBoards
      ? [
          {
            key: 'PROJECT' as BoardType,
            label: getBoardTitle('PROJECT'),
          },
          {
            key: 'EXTERNAL' as BoardType,
            label: getBoardTitle('EXTERNAL'),
          },
          {
            key: 'CAREER' as BoardType,
            label: getBoardTitle('CAREER'),
          },
          {
            key: 'FREE' as BoardType,
            label: getBoardTitle('FREE'),
          },
          {
            key: 'ETC' as BoardType,
            label: getBoardTitle('ETC'),
          },
        ]
      : []),
  ];
  const normalizedRequestedBoardType = requestedBoardType === 'STAFF' ? 'ETC' : requestedBoardType;
  const boardType = items.some((item) => item.key === normalizedRequestedBoardType) ? normalizedRequestedBoardType as BoardType : 'NOTICE';
  const canWrite = boardType !== 'NOTICE' || Boolean(isAdmin);

  useEffect(() => setKeyword(submittedKeyword), [submittedKeyword]);

  const onTabChange = (key: string) =>
    history.push(
      `/${MENU.BOARD}?${stringify({
        boardType: key,
        keyword: submittedKeyword || undefined,
        page: 1,
      })}`,
    );

  const onSearch = () =>
    history.push(
      `/${MENU.BOARD}?${stringify({
        boardType,
        keyword: keyword.trim() || undefined,
        page: 1,
      })}`,
    );

  const renderHeaderActions = () => (
    <div className={styles.headerActions}>
      <ListSearchToolbar placeholder="제목 검색" value={keyword} onChange={setKeyword} onSubmit={onSearch} />
      {canWrite && (
        <ActionButton to={`/${MENU.BOARD}/write?${stringify({ boardType })}`}>
          <EditOutlined />
          글쓰기
        </ActionButton>
      )}
    </div>
  );

  return (
    <PageShell>
      <PagePanel>
        <div className={styles.wrapper}>
          <PageHeader title="게시판" actions={renderHeaderActions()} actionsMobileHidden />
          <SectionTabs className={styles.sectionTabs} items={items} activeKey={boardType} onChange={onTabChange} />
          <div className={styles.mobileSearchToolbar}>
            <ListSearchToolbar placeholder="제목 검색" value={keyword} onChange={setKeyword} onSubmit={onSearch}>
              <MobileSectionFilter items={items} activeKey={boardType} onChange={onTabChange} title="게시판 선택" triggerIcon={<DownOutlined />} showDrawerHeader={false} />
            </ListSearchToolbar>
          </div>
          <BoardList boardType={boardType} keyword={submittedKeyword} page={page} />
          {canWrite && (
            <div className={styles.mobileWriteButton}>
              <ActionButton to={`/${MENU.BOARD}/write?${stringify({ boardType })}`}>
                <EditOutlined />
                글쓰기
              </ActionButton>
            </div>
          )}
        </div>
      </PagePanel>
    </PageShell>
  );
}
