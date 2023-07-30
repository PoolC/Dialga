import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs, { Dayjs } from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/ko';

import { WeeklyScheuleTimeWrapper, WeeklyScheduleGrid, WeeklyScheduleGridCell, WeeklyScheduleGridInteractiveCell, WeeklyScheduleTableWrapper, WeeklyScheduleHeader, WeekltyScheuldeGridWrapper, WeeklyScheduleGridInteractionButton, WeeklyScheuleInstance } from "./WeeklyScheduleTable.style";
import { CalendarContext } from "../Calendar/Calendar";
import { ReservationModal } from "../ReservationModal/ReservationModal";

dayjs.locale('ko')
dayjs.extend(weekday);

export const WeeklyScheduleTable = () => {
  const { selectedDate } = useContext(CalendarContext);
  const startDateOfWeek = selectedDate.startOf('week');

  const initialFoucseRef = useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    initialFoucseRef?.current?.focus();
  }, [initialFoucseRef])

  const weekDays = [...(new Array(7)).keys()].map(index => startDateOfWeek.add(index, 'day'));

  const [cells, setCells] = useState(new Array(7).fill(false).map(() => new Array(24).fill(false)));
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeCell, setActiveCell] = useState([-1, -1, -1]);

  const [isModalPopUp, setIsModalPopUp] = useState(false);
  const [ [top, left] , setModalOffset] = useState([0, 0]);

  const handleMouseDown = (day: number, time: number) => {
    setIsSelecting(true);
    setActiveCell([day, time, 0]);
    setIsModalPopUp(false);
  };

  const handleMouseEnter = (day: number, time: number) => {
    if (!isSelecting) return;

    const [nowDay, startTime, length] = activeCell;
    if (day != nowDay) return;

    const lastTime = startTime + length;
    const timeDiff = time - lastTime;

    if (timeDiff !== 1 && timeDiff !== -1) return;

    if (length === 0 && timeDiff !== 1) return;

    setCells(prevCells => {
      const newCells = [...prevCells];
      newCells[day][time] = true;
      return newCells;
    });
    setActiveCell([day, startTime, length + timeDiff]);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    const { clientHeight, clientWidth } = e.currentTarget;

    const isUpper = (top+300) < innerHeight;
    
    setIsSelecting(false);
    setIsModalPopUp(true);
    setModalOffset([top, left+clientWidth]);
  };

  return (
    <WeeklyScheduleTableWrapper>
      <WeeklyScheduleHeader>
        <WeeklyScheduleGridCell />
        {weekDays.map((weekDay, index) => (
          <WeeklyScheduleGridCell key={`WeekTimeTable-header-${weekDay}`} >
            <div>{window.innerWidth < 720 ? weekDay.format('MM DD') : weekDay.format('M월 D일')}</div>
            <div>{weekDay.weekday(index+1).locale('KO').format('ddd')}</div>
          </WeeklyScheduleGridCell>
        ))}
      </WeeklyScheduleHeader>
      <WeekltyScheuldeGridWrapper>
        <WeeklyScheduleGrid>
          <WeeklyScheduleGridCell />
          { [...(new Array(24)).keys()].map((time) => (
            <WeeklyScheduleGridCell key={`WeeklyScheduleTable-${time}`}>
              <WeeklyScheuleTimeWrapper>
                {`${time.toString().padStart(2, '0')}:00`}
              </WeeklyScheuleTimeWrapper>
            </WeeklyScheduleGridCell>
          ) ) }
          {
            cells.map((column, day) => {
              const [nowDay, startTime, length] = activeCell;

              const startTimeOffset = `calc(${(startTime+1)*100}% + ${startTime+2}px);`;
              const heightOffset = `calc(${(length+1) * 100}% - 1px)`;

              return (<>
                <WeeklyScheduleGridInteractiveCell>
                  <WeeklyScheduleGridInteractionButton
                    disabled={startDateOfWeek.add(day, 'day').add(0, 'hour').isBefore(dayjs())}                  
                  />
                    {day === nowDay
                      ? <WeeklyScheuleInstance
                          startTimeOffset={startTimeOffset}
                          heightOffset={heightOffset}
                        /> 
                      : <></>
                    } 
                </WeeklyScheduleGridInteractiveCell>
                
                {column.map((row, time) => {
                  const nowDate = dayjs(dayjs().format('YYYY-MM-DD HH'));
                  const isDisabled = startDateOfWeek.add(day, 'day').add(time, 'hour').isBefore(nowDate);
                  const isDateTimeSame = startDateOfWeek.add(day, 'day').add(time, 'hour').isSame(nowDate);
  
                  return (
                    <WeeklyScheduleGridInteractiveCell key={`WeeklyScheduleTable-body-${day}-${time}`}>
                      <WeeklyScheduleGridInteractionButton
                        disabled={isDisabled}
                        ref={ isDateTimeSame ? initialFoucseRef : null}
                        onMouseDown={() => handleMouseDown(day, time)}
                        onMouseEnter={() => handleMouseEnter(day, time)}
                        onMouseUp={handleMouseUp}
                        isSelected={row as boolean}
                      />
                    </ WeeklyScheduleGridInteractiveCell>
                  )
                })}
              </>)
            })
          }
        </WeeklyScheduleGrid>
      </WeekltyScheuldeGridWrapper>
      {isModalPopUp && 
        <ReservationModal
          offsetX={left}
          offsetY={top}
          visible={isModalPopUp}
          onCancel={() => {
            setIsModalPopUp(false);
            setActiveCell([-1, -1, -1]);
            
          }}
        /> 
      }
  </WeeklyScheduleTableWrapper>
  );
}