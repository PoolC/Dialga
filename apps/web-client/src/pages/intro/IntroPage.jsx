import { Route, Switch, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import IntroMenu from '../../components/intro/IntroMenu/IntroMenu';
import { MENU } from '../../constants/menus';
import FAQContainer from '../../containers/intro/FAQContainer/FAQContainer';
import IntroContainer from '../../containers/intro/IntroContainer';
import SNSContainer from '../../containers/intro/SNSContainer/SNSContainer';

const IntroPageBlock = styled.div`
  position: relative;
  top: 0px;
  width: 90%;
  left: 5%;
  right: 5%;
  display: flex;

  @media (max-width: 768px) {
    margin-bottom: 600px;
    flex-direction: column;
  }
`;

const IntroPage = ({ location }) => {
  const menus = [
    { name: 'PoolC 소개', url: '' },
    { name: '자주 묻는 질문', url: '/faq' },
    { name: 'SNS', url: '/sns' },
  ];
  return (
    <IntroPageBlock>
      <IntroMenu menus={menus} />
      <Switch>
        <Route component={FAQContainer} path={`/${MENU.INTRO}/faq`} exact />
        <Route component={SNSContainer} path={`/${MENU.INTRO}/sns`} exact />
        <Route component={IntroContainer} path={`/${MENU.INTRO}`} exact />
      </Switch>
    </IntroPageBlock>
  );
};

export default withRouter(IntroPage);
