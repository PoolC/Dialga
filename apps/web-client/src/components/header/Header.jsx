import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import { MenuOutlined } from '@ant-design/icons';
import poolcIcon from '~/assets/images/poolc-icon.png';
import { BarsIcon, HeaderBlock, HeaderIconBox, HeaderIcons, LogoImage } from './Header.styles';
import Menus from './Menus/Menus';
import { MENU } from '~/constants/menus';
import Notification from './Notification/Notification.tsx';
import Spinner from '../common/Spinner/Spinner';

const useStyles = createStyles(({ css }) => ({
  avatarButton: css`
    width: 40px;
    height: 40px;
    padding: 0;
  `,
  logo: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin-right: 10px;
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
    setMenuVisible(false);
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
          <div className={styles.logo}>
            <LogoImage src={poolcIcon} alt="logo" onClick={onCloseMenu} />
          </div>
        </Link>
        <HeaderIconBox>
          {isLogin && (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {/** Noti */}
              <Suspense fallback={<Spinner />}>
                <Notification />
              </Suspense>

              {/** Profile */}
              <Dropdown menu={{ items: dropDownItems }}>
                <Button shape="circle" className={styles.avatarButton}>
                  <Avatar src={profileImageURL} size={36} />
                </Button>
              </Dropdown>
            </div>
          )}
          <BarsIcon onClick={onToggleMenu}>
            <MenuOutlined />
          </BarsIcon>
        </HeaderIconBox>
      </HeaderIcons>
      <Menus menuVisible={menuVisible} onToggleMenu={onToggleMenu} isLogin={isLogin} role={role} isAdmin={isAdmin} dropDownItems={dropDownItems} profileImageURL={profileImageURL} />
    </HeaderBlock>
  );
};

export default Header;
