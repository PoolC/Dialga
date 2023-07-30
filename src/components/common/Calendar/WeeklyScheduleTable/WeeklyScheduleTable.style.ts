import styled from "styled-components";
import colors from "../../../../lib/styles/colors";

export const WeeklyScheduleTableWrapper = styled.div`
  width: 100%;
  height: inherit;
`

export const WeeklyScheduleHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.65fr repeat(7, 1fr);

  background-color: ${colors.mint[3]};
  border-bottom: 1.5px solid ${colors.mint[3]};
  grid-gap: 1px;

  > * {
    background-color: white;
  }
`;

export const WeekltyScheuldeGridWrapper = styled.div`
  width: 100%;
  height: 60vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const WeeklyScheduleGrid = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 0.65fr repeat(7, 1fr);
  grid-template-rows: repeat(25, 1fr);
  
  background-color: ${colors.mint[3]};
  grid-gap: 1px;

  > * {
    background-color: white;
  }
`;


export const WeeklyScheduleGridCell = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  text-align: center;
`

export const WeeklyScheduleGridInteractiveCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  text-align: center;
`

export const WeeklyScheduleGridInteractionButton = styled.button<{
  isSelected?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.disabled ? 'lightgray' : 'none'};
  cursor: ${(props) => props.disabled ? 'auto' : 'pointer'};
`;


export const WeeklyScheuleTimeWrapper = styled.div`
  position: absolute;
  width: 85%;
  left: 0;
  text-align: right;
  font-size: 0.8em;
  padding-right: 5px;

  background-color: #ffffff;
  top: -20%;
`

export const WeeklyScheuleInstance = styled.div<{
  startTimeOffset: string;
  heightOffset: string;
}>`
  position: absolute;
  width: calc(100% - 2px);
  top: ${({startTimeOffset: start}) => start};
  bottom: 0;
  padding: 0;
  height: ${({heightOffset: height}) => height};
  z-index: 100;
  background-color: ${colors.mint[3]};
  pointer-events: none;
`;