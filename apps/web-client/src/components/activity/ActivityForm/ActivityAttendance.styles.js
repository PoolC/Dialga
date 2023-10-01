import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0 40px 0;
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const DateContainer = styled.div`
  margin-bottom: 30px;
`;

export const Date = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin-bottom: 10px;
    font-weight: 700;
  }
  input {
    outline: 0;
  }
  p {
    color: ${colors.brown[0]};
    font-size: 0.9rem;
    margin-bottom: 10px;
    word-break: keep-all;
    text-align: center;
    line-height: 1.2rem;
  }
`;

export const HourContainer = styled.div`
  margin-bottom: 30px;
`;

export const Hour = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin-bottom: 10px;
    font-weight: 700;
  }
  input {
    outline: 0;
  }
  p {
    color: ${colors.brown[0]};
    font-size: 0.9rem;
    margin-bottom: 10px;
    word-break: keep-all;
    text-align: center;
    line-height: 1.2rem;
  }
`;

export const HourInput = styled.input`
  width: 3rem;
  outline: 0;
  border: 1px solid ${colors.brown[0]};
  height: 2rem;
  border-radius: 2px;
  max-width: 320px;
  outline: ${colors.gray[1]};
`;

export const DescriptionContainer = styled.div`
  margin-bottom: 30px;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  label {
    margin-bottom: 10px;
    font-weight: 700;
  }
  textarea {
    outline: 0;
  }
  p {
    color: ${colors.brown[0]};
    font-size: 0.9rem;
    margin-bottom: 10px;
    word-break: keep-all;
    text-align: center;
    line-height: 1.2rem;
  }
`;

export const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    color: ${colors.brown[0]};
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
`;

export const Members = styled.ul`
  margin-bottom: 30px;
`;

export const MemberBlock = styled.li`
  display: flex;
  margin: 5px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledActionButton = styled(ActionButton)`
  width: 160px;
`;
