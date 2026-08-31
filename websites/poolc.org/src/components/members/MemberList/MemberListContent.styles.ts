import styled from '@emotion/styled';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import { media } from '~/styles/responsive';

export const MemberContent = styled(PageContent)`
  max-width: 1210px;
`;

export const MemberListBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 0;
`;

export const MemberRoleTabs = styled.div`
  ${media.mobile} {
    display: none;
  }
`;

export const MemberCardGrid = styled(CardGrid)`
  max-width: 1210px;
  justify-content: flex-start;

  > * {
    justify-self: stretch;
  }

  ${media.mobile} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const MemberEmptyState = styled.div`
  display: flex;
  min-height: 260px;
  grid-column: 1 / -1;
  align-items: center;
  justify-content: center;
`;
