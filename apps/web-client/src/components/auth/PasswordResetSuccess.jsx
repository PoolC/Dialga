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

const PasswordResetSuccess = () => {
  return (
    <Block>
      <WhiteBlock>
        <Contents>
          <StyledIcon className="far fa-check-circle"></StyledIcon>
          <h2>비밀번호 재설정 완료</h2>
          <p>비밀번호가 재설정되었습니다.</p>
          <p>새로운 비밀번호로 로그인 해 주세요.</p>
          <ActionButton to={`/${MENU.SIGNIN}`} style={{ margin: '2rem' }}>
            로그인 페이지로
          </ActionButton>
        </Contents>
      </WhiteBlock>
    </Block>
  );
};

export default PasswordResetSuccess;
