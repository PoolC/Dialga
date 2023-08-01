import React, { useState } from 'react';
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
import { Avatar, Dropdown } from 'antd';
import { MENU } from '~/constants/menus';

const Header = ({ member, onLogout }) => {
  const {
    status: { isLogin },
    user: { isAdmin, role },
  } = member;

  const [menuVisible, setMenuVisible] = useState(false);

  const onToggleMenu = () => {
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const onCloseMenu = () => {
    setMenuVisible((menuVisible) => false);
  };

  const handleLogout = () => {
    onToggleMenu();
    onLogout();
  };

  const dropDownItems = (() => {
    const arr = [
      {
        label: <Link to={`/${MENU.MYINFO}`}>My info</Link>,
        key: 'my-info',
      },
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
              <Avatar
                src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
                size={36}
              />
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
      />
    </HeaderBlock>
  );
};

export default Header;
