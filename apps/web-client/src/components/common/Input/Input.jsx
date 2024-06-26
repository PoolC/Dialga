import styled from '@emotion/styled';
import { Input as AntdInput } from 'antd';
import colors from '../../../lib/styles/colors';

const StyledLabel = styled.label`
  margin: 2rem 0 1rem 0;
  font-weight: 400;
`;

const StyledInput = styled(AntdInput)`
  width: 15rem;
  border: 1px solid ${colors.brown[0]};
  height: 2rem;
  border-radius: 2px;
  max-width: 320px;
  outline: ${colors.gray[1]};
`;

const Input = ({ valueText, labelText, typeText, nameText, error, onChangeFunc, placeholderText, disabledCondition }) => (
  <>
    <StyledLabel htmlFor={nameText}>{labelText}</StyledLabel>
    <StyledInput
      autoComplete="off"
      value={valueText}
      type={typeText}
      name={nameText}
      id={nameText}
      disabled={disabledCondition}
      error={error ? 1 : 0}
      onChange={onChangeFunc}
      placeholder={placeholderText}
    />
  </>
);

export default Input;
