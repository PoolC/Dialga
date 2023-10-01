import styled from '@emotion/styled';
import { MENU } from '../../../constants/menus';
import colors from '../../../lib/styles/colors';
import { withRouter } from 'react-router-dom';

const BannerBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  max-width: 1366px;
  margin: 0px 0 10px 0;
`;

export const Banner = styled.div`
  cursor: pointer;
  display: flex;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  box-shadow: ${colors.gray[1]};
  height: 60px;
  background-color: ${colors.mint[2]};
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    opacity: 0.75;
    //background-color: ${colors.mint[1]};
  }
`;

const ApplyBanner = ({ history }) => {
  const redirectToApplyPage = () => {
    history.push(`/${MENU.APPLY}`);
  };
  return (
    <BannerBlock>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <Banner onClick={redirectToApplyPage}>
        PoolC 신입 모집 지원하러 가기 ✨
      </Banner>
    </BannerBlock>
  );
};

export default withRouter(ApplyBanner);
