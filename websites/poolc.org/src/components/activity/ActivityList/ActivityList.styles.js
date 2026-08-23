import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { PageShell } from '../../common/PageLayout/PageLayout';

export const SeminarPageShell = styled(PageShell)`
  padding-top: 24px;
`;

export const SeminarHeader = styled.header`
  display: flex;
  width: 100%;
  max-width: 904px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
  }

  @media (min-width: 1440px) {
    max-width: 1210px;
  }
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

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const HeaderMeta = styled.p`
  margin: 0;
  color: ${colors.brown[0]};
  font-size: 0.85rem;
  font-weight: 500;
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
  max-width: 904px;
  align-items: stretch;
  justify-content: flex-start;
  gap: 14px;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (min-width: 1440px) {
    max-width: 1210px;
  }
`;
