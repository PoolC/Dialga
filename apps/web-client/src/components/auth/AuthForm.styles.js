import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from '../../lib/styles/colors';

export const FormListHeader = styled.header`
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const FormList = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 320px;
  & > label {
    margin: 5px 0 8px 0;
    font-size: 0.8rem;
    width: 100%;
  }
  & > input:disabled {
    background-color: ${colors.gray[1]};
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  margin: 5px 0 8px 0;
  font-size: 0.8rem;
  width: 100%;
`;

export const Warning = styled.span`
  opacity: ${(props) => (props.error ? '100%' : '0%')};
  color: ${colors.red[1]};
  transition: 0.3s ease-in;
`;

export const StyledInput = styled.input`
  border: 1px solid ${colors.brown[0]};
  height: 2rem;
  border-radius: 2px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 320px;
  outline: ${colors.gray[1]};
  box-shadow: ${(props) => props.error && `0 0 5px ${colors.red[0]}`};
  transition: 0.3s ease-in;
`;

export const SubmitButton = styled.button`
  cursor: pointer;
  margin: 40px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  height: 2rem;
  background-color: ${colors.mint[2]};
  color: white;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.3s;
  &:hover {
    opacity: 0.75;
    transition: 0.3s;
  }
`;

export const StyledTextarea = styled.textarea`
  outline: 0;
  width: 100%;
`;

export const ProfileImageSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

export const ProfileImageSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 5px 25px 5px;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin: 10px 5px 0 5px;
`;

export const StyledSelect = styled.select`
  outline: 0;
  height: 2rem;
  width: 100%;
  box-sizing: content-box;
`;

export const WithdrawalButton = styled(SubmitButton)`
  background-color: ${colors.red[1]};
  margin-top: 1.5rem;
  &:hover {
    background-color: ${colors.red[0]};
  }
  &:disabled {
    background-color: ${colors.gray[2]};
  }
`;

export const StyledLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 300;
`;
