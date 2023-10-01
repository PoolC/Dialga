import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 1rem;
`;

export const StyledInput = styled.input`
  height: 2rem;
  width: 15rem;
  outline: 0;
  border: 1px solid ${colors.brown[0]};
  height: 2rem;
  border-radius: 2px;
  max-width: 320px;
  outline: ${colors.gray[1]};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > label {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
  }
  & > input {
    height: 2rem;
    width: 15rem;
    outline: 0;
  }
`;

export const StyledActionButton = styled(ActionButton)`
  height: 2rem;
  width: 15rem;
  margin: 2rem 0;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

export const ImageContainerHeader = styled.header`
  font-weight: 600;
  margin: 0 0 2rem 0;
`;

export const StyledImage = styled.img`
  max-width: 90%;
`;

export const Description = styled.p`
  color: ${colors.brown[0]};
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;
