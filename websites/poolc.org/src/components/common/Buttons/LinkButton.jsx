import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${(props) => (props.selected ? colors.brown[1] : colors.brown[0])};
  margin: 4px 4px;
  padding: 8px 10px;
  border-radius: 8px;
  transition: 0.2s;
  text-decoration: none;
  outline: 0;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    color: ${colors.brown[1]};
    transform: scale(1.02);
    transition: 0.3s;
    text-decoration: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${colors.mint[1]};
  }
`;

const LinkButton = (props) => <StyledLink {...props} />;

export default LinkButton;
