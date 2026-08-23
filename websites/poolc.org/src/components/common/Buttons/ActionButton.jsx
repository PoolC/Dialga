import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

const StyledActionButton = styled.button`
  background-color: ${colors.mint[2]};
  color: ${colors.gray[0]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  margin: 0 10px;
  border-radius: 8px;
  transition: 0.3s;
  font-weight: 700;
  font-size: 0.875rem;
  min-height: 36px;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
    transition: 0.3s;
  }
`;

const StyledLink = styled(Link)`
  color: ${colors.gray[0]};
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const ActionButton = (props) =>
  props.to ? (
    <StyledActionButton {...props}>
      <StyledLink to={props.to}>{props.children}</StyledLink>
    </StyledActionButton>
  ) : (
    <StyledActionButton {...props} />
  );

export default ActionButton;
