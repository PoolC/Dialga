import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/auth';
import { Link, useNavigate } from '@tanstack/react-router';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Button, Avatar } from 'antd';
import { HeaderBlock, HeaderIcons, LogoImage, HeaderIconBox, BarsIcon } from './Header.styles';
import Menus from './Menus/Menus';
import poolcIcon from '~/assets/images/poolc-icon.png';

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
  badge: css`
    background-color: #47be9b;
    padding: 4px 8px;
    border-radius: 5px;
    color: white;
    font-size: 12px;
    font-weight: 700;
  `,
}));

export default function Header() {
  const dispatch = useDispatch();
  const member = useSelector((state) => (state as any).auth);
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate({ to: '/' });
  };

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
        label: <Link to={'/my-page'}>My Page</Link>,
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
        label: <Link to={'/admin'}>Admin</Link>,
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
            <div className={styles.badge}>BETA</div>
          </div>
        </Link>
        <HeaderIconBox>
          {isLogin && (
            <Dropdown menu={{ items: dropDownItems }}>
              <Button shape={'circle'} className={styles.avatarButton}>
                <Avatar src={profileImageURL} size={36} />
              </Button>
            </Dropdown>
          )}
          <BarsIcon onClick={onToggleMenu}>
            <MenuOutlined />
          </BarsIcon>
        </HeaderIconBox>
      </HeaderIcons>
      <Menus menuVisible={menuVisible} onToggleMenu={onToggleMenu} isLogin={isLogin} role={role} dropDownItems={dropDownItems} profileImageURL={profileImageURL} />
    </HeaderBlock>
  );
}
