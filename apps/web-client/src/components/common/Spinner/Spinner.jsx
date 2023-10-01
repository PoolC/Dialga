import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

const SpinnerBlock = styled.div`
  position: relative;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => {
    if (props.small !== true) {
      return '40vh';
    }
  }};
  margin-bottom: ${(props) => {
    if (props.small !== true) {
      return '70vh';
    }
  }};
`;

const StyledSpinner = styled.i`
  color: ${colors.mint[1]};
  font-size: 4rem;
`;

const Spinner = ({ small = false }) => {
  return (
    <SpinnerBlock small={small}>
      <StyledSpinner className="fas fa-spinner fa-10x fa-spin"></StyledSpinner>
    </SpinnerBlock>
  );
};

export default Spinner;
