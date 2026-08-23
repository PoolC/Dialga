import { Route, Switch } from 'react-router-dom';
import IntroFAQ from '~/components/intro/IntroFAQ';
import IntroSNS from '~/components/intro/IntroSNS';
import { TwoColumnPageShell } from '~/components/common/PageLayout/PageLayout';
import IntroMenu from '../../components/intro/IntroMenu';
import IntroPoolcEntry from '../../components/intro/IntroPoolcEntry';
import { MENU } from '../../constants/menus';

export type Menu = {
  name: string;
  url: string;
};

const IntroPage = () => {
  const menus: Menu[] = [
    { name: 'PoolC 소개', url: '' },
    { name: '자주 묻는 질문', url: '/faq' },
    { name: 'SNS', url: '/sns' },
  ];

  return (
    <TwoColumnPageShell>
      <IntroMenu menus={menus} />
      <Switch>
        <Route component={IntroFAQ} path={`/${MENU.INTRO}/faq`} exact />
        <Route component={IntroSNS} path={`/${MENU.INTRO}/sns`} exact />
        <Route component={IntroPoolcEntry} path={`/${MENU.INTRO}`} exact />
      </Switch>
    </TwoColumnPageShell>
  );
};

export default IntroPage;
