import { isAuthorizedRole } from '../../../lib/utils/checkRole';
import ActionButton from '../../common/Buttons/ActionButton';
import LinkButton from '../../common/Buttons/LinkButton';
import { LeftHeaderMenu, MenuBlock, RightHeaderMenu } from './Menus.styles';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import { MENU } from '~/constants/menus';
import { useLocation } from 'react-router-dom';

const Menus = ({
  menuVisible,
  isLogin,
  role,
  onToggleMenu,
  dropDownItems,
  profileImageURL,
}: {
  menuVisible: boolean;
  isLogin: boolean;
  role: any;
  onToggleMenu: () => void;
  dropDownItems: MenuProps['items'];
  profileImageURL: string;
}) => {
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
      to: `/${MENU.BOOKS}`,
      visible: true,
      content: 'Books',
    },
    {
      to: `/${MENU.APPLY}`,
      visible: !isLogin || (isLogin && !isAuthorizedRole(role)),
      content: 'Apply',
    },
  ];

  const location = useLocation();

  return (
    <MenuBlock className={menuVisible ? 'menus open' : 'menus'}>
      <LeftHeaderMenu>
        {links.map(
          (link, i) =>
            link.visible && (
              <LinkButton
                to={link.to}
                key={i}
                onClick={onToggleMenu}
                style={{
                  color: location.pathname.startsWith(link.to) && '#47be9b',
                  fontWeight: location.pathname.startsWith(link.to) && 800,
                }}
              >
                {link.content}
              </LinkButton>
            ),
        )}
        {!isLogin && (
          <LinkButton
            className="right-menu"
            onClick={onToggleMenu}
            to="/register"
          >
            Sign Up
          </LinkButton>
        )}
        {!isLogin && (
          <ActionButton
            className="right-menu sign-in"
            onClick={onToggleMenu}
            to="/login"
          >
            Sign In
          </ActionButton>
        )}
      </LeftHeaderMenu>
      <RightHeaderMenu>
        {isLogin && (
          <Dropdown menu={{ items: dropDownItems }}>
            <Button
              shape={'circle'}
              style={{ padding: 0, width: '40px', height: '40px' }}
            >
              <Avatar src={profileImageURL} size={36} />
            </Button>
          </Dropdown>
        )}
        {!isLogin && (
          <LinkButton onClick={onToggleMenu} to="/register">
            Sign Up
          </LinkButton>
        )}
        {!isLogin && (
          <ActionButton onClick={onToggleMenu} to="/login">
            Sign In
          </ActionButton>
        )}
      </RightHeaderMenu>
    </MenuBlock>
  );
};

export default Menus;
