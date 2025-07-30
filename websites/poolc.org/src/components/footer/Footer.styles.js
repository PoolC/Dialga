import styled from '@emotion/styled';
import colors from '../../lib/styles/colors';

export const FooterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 5%;
  color: ${colors.brown[1]};
  background-color: ${colors.gray[1]};
  margin-top: 48px;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const FooterItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterContentText = styled.p`
  font-size: 0.8rem;
  margin: 0 0.3rem;
  word-break: keep-all;
  line-height: 1.2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterIcon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.1rem;
  font-size: 0.8rem;
`;

export const FooterDivider = styled.div`
  height: 100px;
  width: 1px;
  margin: 0 10px;
  background-color: ${colors.mint[1]};
  @media (max-width: 576px) {
    width: 50%;
    margin: 30px 0;
    height: 1px;
  }
`;
