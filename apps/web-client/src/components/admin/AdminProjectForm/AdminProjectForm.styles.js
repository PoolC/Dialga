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

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  & > label {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
  }
`;

export const StyledActionButton = styled(ActionButton)`
  height: 2rem;
  width: 15rem;
  margin: 2rem 0;
`;

export const StyledSearchActionButton = styled(ActionButton)`
  height: 2rem;
`;

export const MemberSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    width: 10rem;
  }
`;

export const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px 0;
  & > h4 {
    display: flex;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

export const MemberBlock = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 5px 2px 5px 10px;
  border: 1px solid ${colors.mint[1]};
  border-radius: 3px;
  width: 240px;
  justify-content: space-between;
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 0.8rem;
    margin: 0.25rem;
  }
  & > .name {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;
