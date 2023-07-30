import styled from "styled-components";
import colors from "../../../../lib/styles/colors";

export const CalendarBox = styled.div`
  width: 90%;
  height: 100%;
`;

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
`

export const CalendarDateNavigator = styled.div`
  display: flex;
  justify-content: center;
`;

export const CalendarDateTurnButton = styled.button`
  color: ${colors.mint[3]}
`;

export const CalendarDatePicker = styled.input``;

export const CalendarTypeSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CalendarTypeSelector = styled.select``;

export const CalendarTypeSelectOption = styled.option``;

export const ScheduleTableWrapper = styled.div`
  width: 100%;
  height: inherit;
`

export const CalendarSchedulesGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  background-color: ${colors.mint[3]};
  grid-gap: 1px;

  > * {
    background-color: white;
  }
`;



export const CalendarColumnHeader = styled.div``;

export const CalendarColumnHeaderItem = styled.div``;

export const CalendarRowHeaderItem = styled.div``;

export const CalendarCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`