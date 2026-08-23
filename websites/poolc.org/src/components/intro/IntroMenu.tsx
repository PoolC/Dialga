import { useLocation } from 'react-router-dom';
import { Menu } from '~/pages/intro/IntroPage';
import { SectionMenu } from '~/components/common/SectionMenu/SectionMenu';
import { MENU } from '../../constants/menus';

const IntroMenu = ({ menus }: { menus: Menu[] }) => {
  const location = useLocation();
  const currentLocation = location.pathname.replace('/intro', '');

  return (
    <SectionMenu
      items={menus.map((menu) => ({
        label: menu.name,
        to: `/${MENU.INTRO}${menu.url}`,
        active: currentLocation === menu.url,
      }))}
    />
  );
};

export default IntroMenu;
