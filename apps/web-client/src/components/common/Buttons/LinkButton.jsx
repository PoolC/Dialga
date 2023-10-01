import { Link } from 'react-router-dom';
import colors from '../../../lib/styles/colors';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${(props) => (props.selected ? colors.brown[1] : colors.brown[0])};
  margin: 15px 10px;
  transition: 0.3s;
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
`;

const LinkButton = (props) => {
  return <StyledLink {...props} />;
};

export default LinkButton;
