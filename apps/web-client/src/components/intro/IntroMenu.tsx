import { useLocation } from 'react-router-dom';
import { Menu } from '~/pages/intro/IntroPage';
import { MENU } from '../../constants/menus';
import { SelectedLinkButton } from '../../styles/common/Button.styles';
import { MenuBlock, MenuItem, MenuList } from '../../styles/common/Menu.styles';
import LinkButton from '../common/Buttons/LinkButton';

const IntroMenu = ({ menus }: { menus: Menu[] }) => {
  const location = useLocation();
  const currentLocation = location.pathname.replace('/intro', '');

  return (
    <MenuBlock>
      <MenuList>
        {menus.map((menu) =>
          currentLocation === menu.url ? (
            <MenuItem key={menu.url}>
              <SelectedLinkButton to={`/${MENU.INTRO}${menu.url}`}>{menu.name}</SelectedLinkButton>
            </MenuItem>
          ) : (
            <MenuItem key={menu.url}>
              <LinkButton to={`/${MENU.INTRO}${menu.url}`}>{menu.name}</LinkButton>
            </MenuItem>
          ),
        )}
      </MenuList>
    </MenuBlock>
  );
};

export default IntroMenu;
