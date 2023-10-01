import styled from '@emotion/styled';
import { MENU } from '../../constants/menus';
import colors from '../../lib/styles/colors';
import { Block, WhiteBlock } from '../../styles/common/Block.styles';
import ActionButton from '../common/Buttons/ActionButton';

const StyledIcon = styled.i`
  color: ${colors.mint[1]};
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  height: 100%;
  & > h2 {
    margin-bottom: 2rem;
  }
  & > p {
    margin-bottom: 0.5rem;
    text-align: center;
  }
`;

const RegisterSuccess = ({ isSubscriptionPeriod }) => {
  return (
    <Block>
      <WhiteBlock>
        <Contents>
          <StyledIcon className="far fa-check-circle"></StyledIcon>
          <h2>회원가입 요청 완료</h2>
          <p>회원가입 요청이 전송되었습니다.</p>
          {!isSubscriptionPeriod && (
            <>
              <p>관리자가 승인해야 회원가입이 완료됩니다.</p>
              <p>관리자의 승인을 기다려주세요.</p>
            </>
          )}
          {isSubscriptionPeriod && (
            <ActionButton to={`/${MENU.SIGNIN}`} style={{ margin: '2rem' }}>
              로그인 하러 가기
            </ActionButton>
          )}
          {!isSubscriptionPeriod && (
            <ActionButton to="/" style={{ margin: '2rem' }}>
              메인으로
            </ActionButton>
          )}
        </Contents>
      </WhiteBlock>
    </Block>
  );
};

export default RegisterSuccess;
