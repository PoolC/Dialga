import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import LinkButton from '../../common/Buttons/LinkButton';

export const MenuBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    background-color: #fff;
    flex-direction: column;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
    top: -1000px;
    padding: 10px 5% 16px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    transition: all 0.5s ease;
    border-bottom: 1px solid #edf3f1;
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
    @media (min-width: 769px) {
      display: none;
    }
    @media (max-width: 768px) {
      display: flex;
    }
  }
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SelectedLinkButton = styled(LinkButton)`
  color: ${colors.brown[1]};
`;
