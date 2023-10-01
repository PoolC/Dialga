import { useState } from 'react';
import logoImage from '../../resources/poolc.icon.transparent.png';
import { Link } from 'react-router-dom';
import {
  BarsIcon,
  HeaderBlock,
  HeaderIconBox,
  HeaderIcons,
  LogoImage,
} from './Header.styles';
import Menus from './Menus/Menus';
import { Avatar, Button, Dropdown } from 'antd';
import { MENU } from '~/constants/menus';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  avatarButton: css`
    width: 40px;
    height: 40px;
    padding: 0;
  `,
}));

const Header = ({ member, onLogout }) => {
  const { styles } = useStyles();

  const {
    status: { isLogin },
    user: { isAdmin, role, profileImageURL },
  } = member;

  const [menuVisible, setMenuVisible] = useState(false);

  const onToggleMenu = () => {
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const onCloseMenu = () => {
    setMenuVisible(() => false);
  };

  const handleLogout = () => {
    onToggleMenu();
    onLogout();
  };

  const dropDownItems = (() => {
    const arr = [
      {
        label: <Link to={`/${MENU.MY_PAGE}`}>My Page</Link>,
        key: 'my-page',
      },
      {
        label: 'Sign Out',
        key: 'sign-out',
        onClick: handleLogout,
      },
    ];

    if (isAdmin) {
      arr.splice(2, 0, {
        label: <Link to={`/${MENU.ADMIN}`}>Admin</Link>,
        key: 'admin',
      });
    }

    return arr;
  })();

  return (
    <HeaderBlock>
      <HeaderIcons>
        <Link to="/">
          <LogoImage src={logoImage} alt="logo" onClick={onCloseMenu} />
        </Link>
        <HeaderIconBox>
          {isLogin && (
            <Dropdown menu={{ items: dropDownItems }}>
              <Button shape={'circle'} className={styles.avatarButton}>
                <Avatar src={profileImageURL} size={36} />
              </Button>
            </Dropdown>
          )}
          <BarsIcon onClick={onToggleMenu} className="fas fa-bars"></BarsIcon>
        </HeaderIconBox>
      </HeaderIcons>
      <Menus
        menuVisible={menuVisible}
        onToggleMenu={onToggleMenu}
        isLogin={isLogin}
        role={role}
        isAdmin={isAdmin}
        dropDownItems={dropDownItems}
        profileImageURL={profileImageURL}
      />
    </HeaderBlock>
  );
};

export default Header;
