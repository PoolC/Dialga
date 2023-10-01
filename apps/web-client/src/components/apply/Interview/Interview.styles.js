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
  &:hover {
    //opacity: 0.8;
    transition: 0.3s;
    transform: scale(1.02);
    box-shadow: 0px 0px 10px ${colors.gray[2]};
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

// eslint-disable-next-line
export const DisabledActionButton = styled(ActionButton)`
  cursor: default;
  background-color: ${colors.gray[2]};
  &:hover {
    opacity: 1;
  }
`;

export const InterviewWarningBlock = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
  font-weight: 300;
  font-size: 0.9rem;

  & > p {
    line-height: 1.5rem;
    word-break: keep-all;
  }

  & > p,
  & > button {
    margin: 10px;
    text-align: center;
  }
`;
