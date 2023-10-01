import styled from '@emotion/styled';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';

const Title = styled.h2`
  margin-bottom: 4rem;
`;

const SNSName = styled.h4`
  margin-bottom: 1rem;
`;

const SNSContent = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 2rem;
`;

const SNS = () => {
  return (
    <WhiteNarrowBlock>
      <Title>SNS</Title>
      <SNSName>카카오톡 채널</SNSName>
      <SNSContent>풀씨 PoolC</SNSContent>
      <SNSName>인스타그램</SNSName>
      <SNSContent>@poolc.official</SNSContent>
      <SNSName>페이스북</SNSName>
      <SNSContent>https://m.facebook.com/poolc.org/</SNSContent>
      <SNSName>이메일</SNSName>
      <SNSContent>poolc.official@gmail.com</SNSContent>
    </WhiteNarrowBlock>
  );
};

export default SNS;
