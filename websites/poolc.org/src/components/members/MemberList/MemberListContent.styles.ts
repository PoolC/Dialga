import styled from '@emotion/styled';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';

export const MemberListBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

export const MemberListToolbar = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 0;
`;

export const MemberCardGrid = styled(CardGrid)`
  max-width: 1000px;
  justify-content: flex-start;

  @media (max-width: 1080px) {
    max-width: 750px;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }
`;

export const MemberListEmpty = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 48px 0;
`;
