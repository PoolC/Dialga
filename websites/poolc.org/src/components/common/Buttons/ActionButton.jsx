import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

const actionButtonStyles = `
  background-color: ${colors.mint[2]};
  color: ${colors.gray[0]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  margin: 0;
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

const StyledActionButton = styled.button`
  ${actionButtonStyles}
`;

const StyledActionLink = styled(Link)`
  ${actionButtonStyles}
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const ActionButton = ({ to, children, ...props }) => (
  to ? <StyledActionLink to={to} {...props}>{children}</StyledActionLink> : <StyledActionButton {...props}>{children}</StyledActionButton>
);

export default ActionButton;
