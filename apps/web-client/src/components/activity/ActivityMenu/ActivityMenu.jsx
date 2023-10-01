import LinkButton from '../../common/Buttons/LinkButton';
import { SelectedLinkButton } from './ActivityMenu.styles';
import { MenuBlock, MenuItem, MenuList } from '~/styles/common/Menu.styles';
import Spinner from '../../common/Spinner/Spinner';

const ActivityMenu = ({ loading, semesters, currentLocation }) => {
  return (
    <MenuBlock>
      <MenuList>
        {loading && <Spinner small={true} />}
        {!loading &&
          semesters.map((semester) =>
            currentLocation === semester ? (
              <MenuItem key={semester}>
                <SelectedLinkButton to={`/activities?semester=${semester}`}>
                  {semester}
                </SelectedLinkButton>
              </MenuItem>
            ) : (
              <MenuItem key={semester}>
                <LinkButton to={`/activities?semester=${semester}`}>
                  {semester}
                </LinkButton>
              </MenuItem>
            ),
          )}
      </MenuList>
    </MenuBlock>
  );
};

export default ActivityMenu;
