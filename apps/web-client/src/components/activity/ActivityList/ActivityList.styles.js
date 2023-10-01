import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { Block } from '../../../styles/common/Block.styles';

export const ActivityBlock = styled(Block)`
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

export const List = styled.ul`
  width: 95%;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
`;

export const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  font-size: 0.8rem;
  font-weight: 300;
  text-align: center;
`;

export const ActivityListTitle = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

export const ActivityListHeader = styled.header`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 0 10px 0;
`;

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
