import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const Description = styled.div`
  display: flex;
  width: 90%;
  margin: 0px 0 40px 0;
  font-size: 0.8rem;
  color: ${colors.brown[0]};
  word-break: keep-all;
  line-height: 1.2rem;
  @media (max-width: 576px) {
    text-align: center;
  }
`;
