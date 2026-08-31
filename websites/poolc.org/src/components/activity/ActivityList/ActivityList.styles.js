import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import colors from '../../../lib/styles/colors';
import { PageContent, TwoColumnPageShell } from '../../common/PageLayout/PageLayout';
import { MenuBlock, MenuItem, MenuList } from '../../../styles/common/Menu.styles';
import { media } from '../../../styles/responsive';

export const SeminarPageShell = styled(TwoColumnPageShell)`
  padding-top: 0;
`;

export const ActivityContent = styled(PageContent)`
  max-width: 1210px;

  &[data-has-create-action='true'] {
    ${media.mobile} {
      padding-bottom: calc(76px + env(safe-area-inset-bottom));
    }
  }
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  ${media.belowWide} {
    width: 100%;
    justify-content: space-between;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SemesterMenuBlock = styled(MenuBlock)`
  ${media.belowWide} {
    display: none;
  }
`;

export const SemesterMenuList = styled(MenuList)``;

export const SemesterMenuItem = styled(MenuItem)`
  & > button {
    width: 100%;
    justify-content: flex-start;
    margin: 0;
    padding: 10px 12px;
    white-space: nowrap;
  }

  ${media.belowWide} {
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

  &:empty {
    display: none;
  }

  & > button {
    margin: 0;
  }

  ${media.mobile} {
    display: none;
  }
`;

export const ActivityFloatingCreateButton = styled(Link)`
  display: none;

  ${media.mobile} {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 64px;
    padding: 0 20px;
    padding-bottom: env(safe-area-inset-bottom);
    background: ${colors.mint[2]};
    color: ${colors.gray[0]};
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    box-sizing: border-box;

    &:hover {
      color: ${colors.gray[0]};
      text-decoration: none;
    }
  }
`;

export const ActivityGrid = styled(CardGrid)`
  max-width: 1210px;
  align-items: stretch;
  justify-content: center;
  gap: 14px;

  > * {
    justify-self: stretch;
  }
`;
