import styled from '@emotion/styled';
import { Route, Switch } from 'react-router-dom';
import IntroFAQ from '~/components/intro/IntroFAQ';
import IntroSNS from '~/components/intro/IntroSNS';
import IntroMenu from '../../components/intro/IntroMenu';
import IntroPoolcEntry from '../../components/intro/IntroPoolcEntry';
import { MENU } from '../../constants/menus';

const IntroPageBlock = styled.div`
  position: relative;
  top: 0px;
  width: 90%;
  left: 5%;
  right: 5%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

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
    <IntroPageBlock>
      <IntroMenu menus={menus} />
      <Switch>
        <Route component={IntroFAQ} path={`/${MENU.INTRO}/faq`} exact />
        <Route component={IntroSNS} path={`/${MENU.INTRO}/sns`} exact />
        <Route component={IntroPoolcEntry} path={`/${MENU.INTRO}`} exact />
      </Switch>
    </IntroPageBlock>
  );
};

export default IntroPage;
