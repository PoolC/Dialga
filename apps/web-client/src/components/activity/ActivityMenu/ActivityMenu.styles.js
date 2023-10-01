import styled from '@emotion/styled';
import LinkButton from '../../common/Buttons/LinkButton';
import colors from '../../../lib/styles/colors';

export const ActivityMenuBlock = styled.div`
  width: 15rem;
  margin: 0 10px 20px 0;
  padding: 0;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const ActivityMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.035);
  border-radius: 50px;
  padding: 30px 30px;
  margin: 0;
  @media (max-width: 576px) {
    align-items: center;
  }
`;

export const ActivityMenuItem = styled.li`
  height: 2.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

export const SelectedLinkButton = styled(LinkButton)`
  color: ${colors.brown[1]};
`;
