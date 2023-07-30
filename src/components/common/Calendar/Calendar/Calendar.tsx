import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarBox, CalendarDateTurnButton, CalendarDateNavigator, CalendarDatePicker, CalendarTypeSelector, CalendarHeader, CalendarTypeSelectorWrapper, CalendarTypeSelectOption, ScheduleTableWrapper } from "./Calendar.style";
import { WeeklyScheduleTable } from "../WeeklyScheduleTable/WeeklyScheduleTable";

export enum CalendarTypeEnum {
  DAILY = 'day',
  WEEKLY = 'week',
  MONTHLY = 'month'
}

export interface CalendarContextProps {
  selectedDate: Dayjs;
}

export const CalendarContext = React.createContext<CalendarContextProps>({
  selectedDate: dayjs(),
});


export const Calendar = () => {
  const [calendarType, setCalendarType ] = useState<CalendarTypeEnum>(CalendarTypeEnum.WEEKLY);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const changeSelectedDate = (nextSelectedDate: dayjs.Dayjs) => {
    const prevSelectedDate = selectedDate;
    setSelectedDate(nextSelectedDate);

    if (!nextSelectedDate.isValid()) {
      return;
    }

    if (prevSelectedDate.startOf('week').format('YYYY-MM-DD') !== nextSelectedDate.startOf('week').format('YYYY-MM-DD')) {
    }
  }

  return (
    <CalendarContext.Provider value={{ selectedDate }}>
      <CalendarBox>
        <CalendarHeader>
          <div></div>
          <CalendarDateNavigator>
            <CalendarDateTurnButton onClick={() => changeSelectedDate(selectedDate.subtract(1, calendarType))}>◀</CalendarDateTurnButton>
            <CalendarDatePicker
              type="date"
              value={selectedDate.format('YYYY-MM-DD')}
              min={dayjs().format('YYYY-MM-DD')}
              max={dayjs().add(1, 'year').format('YYYY-MM-DD')}
              onChange={(e) => changeSelectedDate(dayjs(e.target.value))}
            />
            <CalendarDateTurnButton onClick={() => changeSelectedDate(selectedDate.add(1, calendarType))}>▶</CalendarDateTurnButton>
          </CalendarDateNavigator>
          <CalendarTypeSelectorWrapper>
            <CalendarTypeSelector onChange={(e) => setCalendarType(e.target.value as CalendarTypeEnum)} value={calendarType}>
              <CalendarTypeSelectOption value={CalendarTypeEnum.DAILY}>일</CalendarTypeSelectOption>
              <CalendarTypeSelectOption value={CalendarTypeEnum.WEEKLY}>주</CalendarTypeSelectOption>
            </CalendarTypeSelector>
          </CalendarTypeSelectorWrapper>
        </CalendarHeader>
        <ScheduleTableWrapper>
            {(()=>{
              switch (calendarType) {
                case CalendarTypeEnum.DAILY:
                  return <></>;
                case CalendarTypeEnum.WEEKLY:
                  return <WeeklyScheduleTable />;
                default:
                  return <></>;
              }
            })()}
          </ScheduleTableWrapper>
      </CalendarBox>
    </CalendarContext.Provider>
  )
}