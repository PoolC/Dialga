import { Avatar, Button, Drawer, Dropdown, MenuProps } from 'antd';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { useLocation } from 'react-router-dom';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';
import ActionButton from '../../common/Buttons/ActionButton';
import LinkButton from '../../common/Buttons/LinkButton';
import { LeftHeaderMenu, MenuBlock, MobileAccountButton, MobileAccountMeta, MobileAccountMore, MobileDrawerCloseButton, MobileDrawerContent, MobileDrawerHeader, MobileNavigationLink, MobileNavigationList, RightHeaderMenu } from './Menus.styles';
import { MENU } from '~/constants/menus';
import colors from '~/lib/styles/colors';
import Notification from '../Notification/Notification';
import { media } from '~/styles/responsive';

const useStyles = createStyles(({ css }) => ({
  menuInner: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
  mobileDrawer: css`
    display: none;

    ${media.mobile} {
      display: block;

      .ant-drawer-content {
        background: #ffffff;
      }

      .ant-drawer-body {
        padding: 20px 20px 0;
      }
    }
  `,
}));

const Menus = ({
  menuVisible,
  isLogin,
  name,
  role,
  onToggleMenu,
  dropDownItems,
  profileImageURL,
}: {
  menuVisible: boolean;
  isLogin: boolean;
  name: string;
  role: string | null;
  onToggleMenu: () => void;
  dropDownItems: MenuProps['items'];
  profileImageURL: string;
}) => {
  const { styles } = useStyles();
  const location = useLocation();

  const links: {
    to: string;
    visible: boolean;
    content: string;
  }[] = [
    {
      to: '/intro',
      visible: true,
      content: 'PoolC',
    },
    {
      to: '/members',
      visible: isLogin && isAuthorizedRole(role),
      content: 'Members',
    },
    {
      to: `/${MENU.BOARD}`,
      visible: true,
      content: 'Boards',
    },
    {
      to: `/${MENU.PROJECTS}`,
      visible: true,
      content: 'Projects',
    },
    {
      to: `/${MENU.ACTIVITIES}`,
      visible: true,
      content: 'Seminars',
    },
    {
      to: `/${MENU.POKEMON}/${MENU.POKEMON_ACHIEVEMENTS}`,
      visible: isLogin,
      content: 'Quest',
    },
    {
      to: `/${MENU.BOOKS}`,
      visible: true,
      content: 'Books',
    },
    {
      to: `/${MENU.ROOM_RESERVATION}`,
      visible: isLogin,
      content: 'Room',
    },
    {
      to: `/${MENU.PKS}`,
      visible: isLogin,
      content: 'PKS',
    },
    {
      to: `/${MENU.APPLY}`,
      visible: !isLogin || (isLogin && !isAuthorizedRole(role)),
      content: 'Apply',
    },
  ];
  const isActiveLink = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);
  const visibleLinks = links.filter((link) => link.visible);
  return (
    <>
      <MenuBlock>
      <LeftHeaderMenu>
        {visibleLinks.map((link) => (
          <LinkButton
            to={link.to}
            key={link.content}
            style={{
              color: isActiveLink(link.to) ? colors.mint[2] : undefined,
            }}
          >
            {link.content}
          </LinkButton>
        ))}
        {!isLogin && (
          <LinkButton className="right-menu" to="/register">
            Sign Up
          </LinkButton>
        )}
        {!isLogin && (
          <ActionButton className="right-menu sign-in" to="/login">
            Sign In
          </ActionButton>
        )}
      </LeftHeaderMenu>
      <RightHeaderMenu>
        {isLogin && (
          <div className={styles.menuInner}>
            {/** Noti */}
            <Notification />
            <Dropdown menu={{ items: dropDownItems }}>
              <Button shape="circle" style={{ padding: 0, width: '40px', height: '40px' }}>
                <Avatar src={profileImageURL} size={36} />
              </Button>
            </Dropdown>
          </div>
        )}
        {!isLogin && (
          <LinkButton to="/register">
            Sign Up
          </LinkButton>
        )}
        {!isLogin && (
          <ActionButton to="/login">
            Sign In
          </ActionButton>
        )}
      </RightHeaderMenu>
      </MenuBlock>
      <Drawer
        className={styles.mobileDrawer}
        closable={false}
        open={menuVisible}
        placement="right"
        width="86vw"
        onClose={onToggleMenu}
      >
        <MobileDrawerContent>
          <MobileDrawerHeader>
            <span>메뉴</span>
            <MobileDrawerCloseButton type="button" aria-label="메뉴 닫기" onClick={onToggleMenu}>
              <CloseOutlined />
            </MobileDrawerCloseButton>
          </MobileDrawerHeader>
          <MobileNavigationList aria-label="주요 메뉴">
            {visibleLinks.map((link) => (
              <MobileNavigationLink
                to={link.to}
                key={link.content}
                data-active={isActiveLink(link.to)}
                onClick={onToggleMenu}
              >
                {link.content}
              </MobileNavigationLink>
            ))}
          </MobileNavigationList>
          {isLogin && (
            <Dropdown menu={{ items: dropDownItems }} placement="topRight" trigger={['click']}>
              <MobileAccountButton type="button" aria-label="계정 메뉴 열기">
                <Avatar src={profileImageURL} size={40} />
                <MobileAccountMeta>
                  <strong>{name}</strong>
                </MobileAccountMeta>
                <MobileAccountMore><MoreOutlined /></MobileAccountMore>
              </MobileAccountButton>
            </Dropdown>
          )}
        </MobileDrawerContent>
      </Drawer>
    </>
  );
};

export default Menus;
