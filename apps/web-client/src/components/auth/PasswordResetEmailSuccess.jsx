import styled from '@emotion/styled';
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

const PasswordResetEmailSuccess = () => {
  return (
    <Block>
      <WhiteBlock>
        <Contents>
          <StyledIcon className="far fa-check-circle"></StyledIcon>
          <h2>비밀번호 재설정 이메일 전송 완료</h2>
          <p>비밀번호 재설정 이메일이 전송되었습니다.</p>
          <p>이메일로 전송된 링크를 통해 비밀번호를 재설정해주세요.</p>
          <p>이메일을 받지 못하셨다면 운영진에게 문의해주세요.</p>
          <ActionButton to="/" style={{ margin: '2rem' }}>
            메인으로
          </ActionButton>
        </Contents>
      </WhiteBlock>
    </Block>
  );
};

export default PasswordResetEmailSuccess;
