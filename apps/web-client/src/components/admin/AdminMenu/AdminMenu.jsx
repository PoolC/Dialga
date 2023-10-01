import { withRouter } from 'react-router';
import { MENU } from '../../../constants/menus';
import { SelectedLinkButton } from '../../../styles/common/Button.styles';
import {
  MenuBlock,
  MenuItem,
  MenuList,
} from '../../../styles/common/Menu.styles';
import LinkButton from '../../common/Buttons/LinkButton';

const AdminMenu = ({ menus, location }) => {
  const currentLocation = location.pathname.replace('/admin', '');
  return (
    <MenuBlock>
      <MenuList>
        {menus.map((menu) =>
          currentLocation === menu.url ? (
            <MenuItem key={menu.url}>
              <SelectedLinkButton to={`/${MENU.ADMIN}${menu.url}`}>
                {menu.name}
              </SelectedLinkButton>
            </MenuItem>
          ) : (
            <MenuItem key={menu.url}>
              <LinkButton to={`/${MENU.ADMIN}${menu.url}`}>
                {menu.name}
              </LinkButton>
            </MenuItem>
          ),
        )}
      </MenuList>
    </MenuBlock>
  );
};

export default withRouter(AdminMenu);
