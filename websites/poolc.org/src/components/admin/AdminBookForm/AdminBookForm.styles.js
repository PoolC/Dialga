import styled from '@emotion/styled';
import ActionButton from '../../common/Buttons/ActionButton';
import Input from '../../common/Input/Input';

export const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 1rem;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > label {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
  }
`;

export const StyledInput = styled(Input)`
  height: 2rem;
  width: 15rem;
  outline: 0;
`;

export const StyledActionButton = styled(ActionButton)`
  height: 2rem;
  width: 15rem;
  margin: 2rem 0;
`;
