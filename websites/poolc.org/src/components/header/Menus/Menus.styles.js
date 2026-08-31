import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import LinkButton from '../../common/Buttons/LinkButton';
import { media } from '../../../styles/responsive';

export const MenuBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;

  ${media.mobile} {
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

    ${media.mobile} {
      display: flex;
    }
  }
  ${media.mobile} {
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
  ${media.mobile} {
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

export const MobileDrawerContent = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
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

export const MobileAccountButton = styled.button`
  display: flex;
  width: 100%;
  min-height: 72px;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding: 12px 0 max(12px, env(safe-area-inset-bottom));
  border: 0;
  border-top: 1px solid #edf3f1;
  border-radius: 0;
  background: transparent;
  color: ${colors.brown[1]};
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: ${colors.brown[1]};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.mint[2]};
    outline-offset: -2px;
  }
`;

export const MobileAccountMeta = styled.span`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;

  strong {
    overflow: hidden;
    font-size: 0.95rem;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const MobileAccountMore = styled.span`
  margin-left: auto;
  color: ${colors.brown[0]};
  font-size: 20px;
`;

export const MobileGuestActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #edf3f1;
`;

export const MobileGuestSignUpLink = styled(LinkButton)`
  width: 100%;
  min-height: 44px;
  justify-content: center;
  margin: 0;
  border: 1px solid #d8d0c3;
  border-radius: 6px;
  color: ${colors.brown[1]};
  font-weight: 700;
`;

export const MobileGuestSignInLink = styled(LinkButton)`
  width: 100%;
  min-height: 44px;
  justify-content: center;
  margin: 0;
  border-radius: 6px;
  background: ${colors.mint[2]};
  color: #ffffff;
  font-weight: 700;

  &:hover {
    color: #ffffff;
  }
`;

export const SelectedLinkButton = styled(LinkButton)`
  color: ${colors.brown[1]};
`;
