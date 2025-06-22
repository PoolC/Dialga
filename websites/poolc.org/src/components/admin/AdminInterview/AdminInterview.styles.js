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
    //opacity: 0.8;
    transition: 0.3s;
    transform: scale(1.02);
    box-shadow: 0px 0px 10px ${colors.gray[2]};
  }
`;

export const TimeBlockId = styled.div`
  display: flex;
  margin-bottom: 5px;
  .admin-interview-slot-id {
    margin-left: 5px;
    font-weight: 500;
  }
`;

export const TimeBlockTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: ${colors.gray[0]};
  border: 1px ${colors.gray[2]} solid;
  padding: 0 0.4rem;
  border-radius: 10px;
  width: 120px;
`;

export const TimeBlockCapacity = styled.div`
  margin-bottom: 0;
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
  display: flex;
  flex-direction: column;
  & > div > div > .admin-interview-label {
    font-weight: 500;
  }
`;

export const IntervieweeInfo = styled.div`
  margin-bottom: 10px;
`;
