import styled from '@emotion/styled';
import colors from '../../lib/styles/colors';
import { media } from '../../styles/responsive';

export const HeaderBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 8px 5%;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;

  position: fixed;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  z-index: 100;

  ${media.compact} {
    position: sticky;
    flex-direction: column;
    align-items: flex-start;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    transition: 0.5s ease;
    box-shadow: 0 0 20px ${colors.gray[1]};
    padding: 0 5%;
    & > .open {
      top: 60px;
      box-shadow: 0 18px 28px rgba(32, 49, 43, 0.08);
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      transition: all 0.5s ease;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }
`;

export const HeaderIcons = styled.div`
  color: ${colors.brown[0]};

  ${media.compact} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
  }
`;

export const LogoImage = styled.img`
  height: auto;
  width: auto;
  max-width: 22px;
  cursor: pointer;
`;

export const BarsIcon = styled.button`
  display: none;
  cursor: pointer;
  border: 0;
  background: transparent;
  padding: 10px;
  border-radius: 8px;
  ${media.compact} {
    display: block;
  }
  &:hover {
    background-color: ${colors.mint[0]};
    color: ${colors.brown[1]};
  }
`;

export const HeaderIconBox = styled.div`
  display: none;

  ${media.compact} {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
