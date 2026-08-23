import styled from '@emotion/styled';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';
import { PageContent } from '~/components/common/PageLayout/PageLayout';

export const MemberContent = styled(PageContent)`
  max-width: 1210px;
`;

export const MemberListBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

export const MemberListToolbar = styled.div`
  width: 430px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MemberCardGrid = styled(CardGrid)`
  max-width: 1210px;
  justify-content: flex-start;
`;
