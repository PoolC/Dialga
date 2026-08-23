import styled from '@emotion/styled';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { PageContent, PageShell } from '../../common/PageLayout/PageLayout';

export const SeminarPageShell = styled(PageShell)`
  padding-top: 0;
`;

export const ActivityContent = styled(PageContent)`
  max-width: 1210px;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 576px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const SemesterSelectArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderActionArea = styled.div`
  display: flex;
  justify-content: center;

  & > button {
    margin: 0;
  }

  @media (max-width: 576px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ActivityGrid = styled(CardGrid)`
  max-width: 1210px;
  align-items: stretch;
  justify-content: center;
  gap: 14px;
`;
