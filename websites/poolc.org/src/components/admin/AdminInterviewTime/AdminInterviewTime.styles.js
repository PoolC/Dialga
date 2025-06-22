import styled from '@emotion/styled';
import ActionButton from '../../common/Buttons/ActionButton';
import colors from '../../../lib/styles/colors';

export const StyledDateBlock = styled.div`
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2rem;
  background-color: ${colors.mint[0]};
  border-radius: 3px;
  border: 1px ${colors.mint[2]} solid;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 10px;
`;

export const StyledTimeList = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 80%;
  margin-bottom: 1.5rem;
  @media (max-width: 576px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const TimeBlockId = styled.div`
  background-color: ${colors.gray[0]};
  border: 1px ${colors.gray[2]} solid;
  border-radius: 3px;
  padding: 3px 5px;
  font-size: 0.9rem;
  display: flex;
  margin-bottom: 5px;
  font-weight: 300;
  .admin-interview-slot-id {
    margin-left: 5px;
    font-weight: 500;
  }
`;

export const StyledTimeBlock = styled.div`
  cursor: default;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mint[0]};
  border-radius: 3px;
  border: 1px ${colors.mint[1]} solid;
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.4rem;
  margin: 10px;
  padding: 0.4rem 0.5rem;
  box-shadow: 0px 0px 10px ${colors.gray[1]};
  transition: 0.3s;
  min-height: 90px;
  width: 150px;
  &:hover {
    opacity: 0.8;
    transition: 0.3s;
    transform: scale(1.02);
  }
`;

export const TimeBlockTime = styled.div`
  font-weight: 500;
  background-color: ${colors.gray[0]};
  border: 1px ${colors.gray[2]} solid;
  padding: 0 0.4rem;
  border-radius: 10px;
`;

export const TimeBlockCapacity = styled.div`
  margin-bottom: 0.5rem;
`;

export const DisabledActionButton = styled(ActionButton)`
  cursor: default;
  background-color: ${colors.gray[2]};
  &:hover {
    opacity: 1;
  }
`;

export const IntervieweeList = styled.div`
  margin: 5px 0;
  background-color: ${colors.gray[0]};
  border-radius: 2px;
  padding: 5px 7px;
  width: 120px;
  & > div > .admin-interview-label {
    font-weight: 500;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const StyledInterviewForm = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0 1rem 0;
  padding: 0.6rem 1.2rem 1.2rem 1.2rem;
  border: 1px solid ${colors.mint[1]};
  border-radius: 5px;
  box-shadow: 0px 0px 10px ${colors.gray[1]};
  width: 100%;
`;

export const StyledDateForm = styled.div`
  margin: 0.5rem 0;
`;

export const StyledDateTimeForm = styled.li`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 1rem 0.5rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${colors.gray[1]};
`;

export const StyledTimeForm = styled.div`
  margin: 0.5rem 0;
`;

export const StyledTimeFormList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const StyledCapacityForm = styled.div`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 300;
  & > span {
    font-size: 0.9rem;
    font-weight: 300;
    margin-left: 0.4rem;
  }
`;

export const StyledLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 300;
  margin: 0.4rem;
`;

export const StyledDateInput = styled.input`
  text-align: center;
  height: 1.8rem;
  width: 10rem;
  outline: 0;
  border: 1px solid ${colors.brown[0]};
  border-radius: 2px;
  max-width: 320px;
  outline: ${colors.gray[1]};
`;

export const StyledTimeInput = styled.input`
  text-align: center;
  height: 1.8rem;
  width: 8rem;
  outline: 0;
  border: 1px solid ${colors.brown[0]};
  border-radius: 2px;
  max-width: 320px;
  outline: ${colors.gray[1]};
`;

export const StyledCapacityInput = styled.input`
  text-align: center;
  height: 1.8rem;
  width: 4rem;
  outline: 0;
  border: 1px solid ${colors.brown[0]};
  border-radius: 2px;
  max-width: 320px;
  outline: ${colors.gray[1]};
`;

export const TimeCapacityButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  & > button {
    margin-right: 0;
  }
`;

export const StyledActionButton = styled(ActionButton)`
  width: 300px;
  margin-top: 2rem;
`;

export const StyledDiv = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;
