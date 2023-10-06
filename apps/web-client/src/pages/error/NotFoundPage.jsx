import { withRouter } from 'react-router';
import styled from '@emotion/styled';
import ActionButton from '../../components/common/Buttons/ActionButton';
import colors from '../../lib/styles/colors';

export const PageBlock = styled.div`
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const PageContainer = styled.div`
  width: 100%;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 0px 20px ${colors.gray[1]};
  border-radius: 50px;
  padding: 40px 40px 60px 40px;
  min-height: 60vh;
`;

const ErrorIcon = styled.i`
  font-size: 3rem;
  color: ${colors.red[0]};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: center;
  word-break: keep-all;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const NotFoundPage = ({ history }) => {
  return (
    <PageBlock>
      <PageContainer>
        <ErrorIcon className="fas fa-exclamation-circle"></ErrorIcon>
        <ErrorMessage>존재하지 않는 페이지입니다.</ErrorMessage>
        <ActionButton
          onClick={() => {
            history.push('/');
          }}
        >
          메인으로
        </ActionButton>
      </PageContainer>
    </PageBlock>
  );
};

export default withRouter(NotFoundPage);
