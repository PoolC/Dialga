import styled from '@emotion/styled';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import colors from '../../../lib/styles/colors';
import { PageContent, TwoColumnPageShell } from '../../common/PageLayout/PageLayout';
import { MenuBlock, MenuItem, MenuList } from '../../../styles/common/Menu.styles';

export const SeminarPageShell = styled(TwoColumnPageShell)`
  padding-top: 0;
`;

export const ActivityContent = styled(PageContent)`
  max-width: 904px;
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

export const SemesterMenuBlock = styled(MenuBlock)``;

export const SemesterMenuList = styled(MenuList)``;

export const SemesterMenuItem = styled(MenuItem)`
  & > button {
    width: 100%;
    justify-content: flex-start;
    margin: 0;
    padding: 10px 12px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    & > button {
      width: auto;
      justify-content: center;
    }
  }
`;

export const SemesterMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 8px;
  background: ${(props) => (props['data-selected'] ? colors.mint[0] : 'transparent')};
  color: ${(props) => (props['data-selected'] ? colors.brown[1] : colors.brown[0])};
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${colors.brown[1]};
    transform: scale(1.02);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${colors.mint[1]};
    outline: 0;
  }
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
  justify-content: center;
  gap: 14px;
`;
