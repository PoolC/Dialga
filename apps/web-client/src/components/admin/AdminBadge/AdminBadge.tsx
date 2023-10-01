import { WhiteNarrowBlock } from '~/styles/common/Block.styles';
import { createStyles } from 'antd-style';
import { Tabs } from 'antd';
import { useSearchParams } from '~/hooks/useSearchParams';
import AdminBadgeManagement from '~/components/admin/AdminBadge/AdminBadgeManagement';
import { useHistory } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { stringify } from 'qs';
import AdminMemberBadgeManagement from '~/components/admin/AdminBadge/AdminMemberBadgeManagement';

const useStyles = createStyles(({ css }) => ({
  titleConatiner: css`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    margin: 1rem;
  `,
  fullWidth: css`
    width: 100%;
  `,
}));

type MenuType = 'BADGE' | 'MEMBER_BADGE';

export default function AdminBadge() {
  const { styles } = useStyles();
  const searchParams = useSearchParams();
  const menuType: MenuType = (searchParams.get('menuType') ??
    'BADGE') as MenuType;
  const history = useHistory();

  const items: { key: MenuType; label: string; children: JSX.Element }[] = [
    {
      key: 'BADGE',
      label: '뱃지 생성 및 등록',
      children: <AdminBadgeManagement />,
    },
    {
      key: 'MEMBER_BADGE',
      label: '회원 뱃지 관리',
      children: <AdminMemberBadgeManagement />,
    },
  ];

  const onTabChange = (key: string) =>
    history.push(`/${MENU.ADMIN}/badge?${stringify({ menuType: key })}`);

  return (
    <WhiteNarrowBlock>
      <div className={styles.titleConatiner}>뱃지관리</div>
      <Tabs
        className={styles.fullWidth}
        items={items}
        defaultActiveKey={menuType}
        onChange={onTabChange}
      />
    </WhiteNarrowBlock>
  );
}
