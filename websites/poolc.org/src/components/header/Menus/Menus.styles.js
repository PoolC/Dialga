import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import LinkButton from '../../common/Buttons/LinkButton';
import { media } from '../../../styles/responsive';

export const MenuBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;

  ${media.compact} {
    display: none;
  }
`;

export const LeftHeaderMenu = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: flex-start;
  & > .sign-in,
  & > .sign-out {
    margin-top: 0.45rem;
  }
  & > .right-menu {
    display: none;

    ${media.compact} {
      display: flex;
    }
  }
  ${media.compact} {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;

    & > a,
    & > button {
      box-sizing: border-box;
      width: 100%;
      margin: 2px 0;
      justify-content: center;
    }
  }
`;

export const RightHeaderMenu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  ${media.compact} {
    display: none;
  }
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #edf3f1;
  color: ${colors.brown[1]};
  font-size: 1.25rem;
  font-weight: 800;
`;

export const MobileDrawerCloseButton = styled.button`
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: ${colors.brown[1]};
  font-size: 18px;
`;

export const MobileNavigationList = styled.nav`
  display: grid;
  gap: 4px;
  padding: 20px 0 0;
`;

export const MobileNavigationLink = styled(LinkButton)`
  position: relative;
  width: 100%;
  min-height: 48px;
  justify-content: flex-start;
  margin: 0;
  padding: 0 14px;
  border-radius: 6px;
  color: ${colors.brown[1]};
  font-size: 1rem;

  &[data-active='true'] {
    background: #f1fbf8;
    color: ${colors.mint[2]};
  }

  &[data-active='true']::before {
    position: absolute;
    left: 0;
    width: 3px;
    height: 24px;
    border-radius: 0 3px 3px 0;
    background: ${colors.mint[2]};
    content: '';
  }

  &:hover {
    transform: none;
  }
`;

export const SelectedLinkButton = styled(LinkButton)`
  color: ${colors.brown[1]};
`;
