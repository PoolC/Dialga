import React from 'react';
import { RoomSchedules } from '../../components/room/RoomSchedules/RoomSchedules';
import { Calendar } from '../../components/common/Calendar/Calendar/Calendar';

const RoomReservationScheduleListContainer = () => {  
  return <>
    <RoomSchedules>
      <Calendar />
    </RoomSchedules>
  </>
};

export default RoomReservationScheduleListContainer;
