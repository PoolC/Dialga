import { createStyles } from 'antd-style';
import { Button, Modal } from 'antd';
import { Calendar, dayjsLocalizer, Event, SlotInfo, ToolbarProps, Views } from 'react-big-calendar';
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { LocalTimeReq, queryKey, RoomControllerService, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { dayjs } from '~/lib/utils/dayjs';
import { useMessage } from '~/hooks/useMessage';
import { PageContent, PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import colors from '~/lib/styles/colors';

const localizer = dayjsLocalizer(dayjs);

const useStyles = createStyles(({ css }) => ({
  toolbar: css`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  `,
  toolbarNav: css`
    display: inline-flex;
    justify-self: start;
    overflow: hidden;
    border: 1px solid #d8d0c3;
    border-radius: 6px;
    background: #ffffff;
  `,
  toolbarView: css`
    display: inline-flex;
    justify-self: end;
    overflow: hidden;
    border: 1px solid #d8d0c3;
    border-radius: 6px;
    background: #ffffff;
  `,
  toolbarButton: css`
    height: 38px;
    min-width: 64px;
    padding: 0 14px;
    border: 0;
    border-left: 1px solid #d8d0c3;
    background: #ffffff;
    color: ${colors.brown[1]};
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    &:first-of-type {
      border-left: 0;
    }

    &:hover,
    &:focus {
      background: ${colors.mint[0]};
      color: ${colors.mint[3]};
    }

    &[data-active='true'] {
      background: ${colors.mint[0]};
      color: ${colors.brown[1]};
    }

    @media (max-width: 768px) {
      flex: 1;
      min-width: 0;
    }
  `,
  toolbarRange: css`
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    text-align: center;
  `,
  toolbarMonth: css`
    color: ${colors.brown[1]};
    font-size: 1.18rem;
    font-weight: 800;
    line-height: 1.2;
  `,
  toolbarDates: css`
    color: ${colors.brown[0]};
    font-size: 0.83rem;
    font-weight: 500;
    line-height: 1.2;
  `,
  calendarWrap: css`
    width: 100%;
    overflow: hidden;
    margin-top: 2px;

    .rbc-calendar {
      width: 100%;
      color: ${colors.brown[1]};
      font-family: inherit;
    }

    .rbc-time-view,
    .rbc-month-view {
      overflow: hidden;
      border: 1px solid #e6dfd4;
      border-radius: 8px;
      background: #ffffff;
    }

    .rbc-time-header {
      border-bottom: 1px solid #e6dfd4;
    }

    .rbc-time-header-content {
      border-left: 1px solid #e6dfd4;
    }

    .rbc-header {
      min-height: 36px;
      padding: 9px 4px;
      border-bottom: 0;
      color: ${colors.brown[1]};
      font-size: 0.8rem;
      font-weight: 800;
      background: #fbfaf8;
    }

    .rbc-header.rbc-today {
      background: rgba(71, 190, 155, 0.08);
      color: ${colors.mint[3]};
    }

    .rbc-time-content {
      border-top: 0;
      overflow-y: hidden;
    }

    .rbc-time-content > * + * > * {
      border-left: 1px solid #ebe6de;
    }

    .rbc-timeslot-group {
      min-height: 64px;
      border-bottom: 1px solid #ebe6de;
    }

    .rbc-time-gutter,
    .rbc-time-header-gutter {
      background: #fbfaf8;
    }

    .rbc-time-gutter .rbc-timeslot-group {
      display: flex;
      align-items: center;
    }

    .rbc-time-gutter .rbc-time-slot {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }

    .rbc-time-gutter .rbc-time-slot:not(:first-of-type) {
      display: none;
    }

    .rbc-label {
      padding: 0 10px;
      color: ${colors.brown[1]};
      font-size: 0.84rem;
      font-weight: 600;
    }

    .rbc-day-slot .rbc-time-slot {
      border-top: 1px solid #f4f1ed;
    }

    .rbc-today {
      background-color: rgba(71, 190, 155, 0.05);
    }

    .rbc-event {
      overflow: hidden;
      border: 0 !important;
      border-radius: 6px;
      background-color: ${colors.mint[2]};
      box-shadow: 0 4px 12px rgba(71, 190, 155, 0.14);
      padding: 0;
    }

    .rbc-event-label {
      display: none;
    }

    .rbc-event-content {
      height: 100%;
    }

    .rbc-event:focus {
      outline: 2px solid rgba(71, 190, 155, 0.32);
      outline-offset: 2px;
    }

    .rbc-allday-cell {
      display: none;
    }

    @media (max-width: 768px) {
      .rbc-header {
        padding: 6px 2px;
        font-size: 0.68rem;
      }

      .rbc-label {
        padding: 0 4px;
        font-size: 0.72rem;
      }

      .rbc-time-gutter,
      .rbc-time-header-gutter {
        width: 48px;
        min-width: 48px;
      }

      .rbc-timeslot-group {
        min-height: 60px;
      }
    }
  `,
  eventTitle: css`
    margin: 0;
    color: ${colors.brown[1]};
    font-weight: 800;
  `,
  eventTime: css`
    color: ${colors.brown[0]};
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 10px;
  `,
  reservationEvent: css`
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    gap: 5px;
    padding: 8px 10px;
    color: #ffffff;
    box-sizing: border-box;

    @media (max-width: 768px) {
      gap: 2px;
      padding: 5px;
    }

    &[data-compact='true'] {
      gap: 2px;
      padding: 5px 8px;
    }

    &[data-tiny='true'] {
      display: block;
      padding: 4px 8px;
      white-space: nowrap;
    }
  `,
  reservationTime: css`
    flex: 0 0 auto;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.15;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 0.6rem;
    }

    [data-compact='true'] & {
      font-size: 0.66rem;
      line-height: 1.1;
    }

    [data-tiny='true'] & {
      font-size: 0.68rem;
      line-height: 1.15;
    }
  `,
  reservationPurpose: css`
    display: -webkit-box;
    overflow: hidden;
    font-size: 0.86rem;
    font-weight: 800;
    line-height: 1.24;
    word-break: keep-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @media (max-width: 768px) {
      font-size: 0.68rem;
    }

    [data-compact='true'] & {
      font-size: 0.76rem;
      line-height: 1.15;
      -webkit-line-clamp: 1;
    }

    [data-tiny='true'] & {
      display: inline;
      font-size: 0.68rem;
      line-height: 1.15;
      white-space: nowrap;
      -webkit-line-clamp: unset;
    }
  `,
  reservationHost: css`
    margin-top: auto;
    overflow: hidden;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.2;
    opacity: 0.78;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 0.6rem;
    }
  `,
}));

type RoomEventResource = {
  id?: number | string;
  purpose?: string;
  host?: string;
};

type RoomCalendarEvent = Event & {
  resource?: RoomEventResource;
};

type RoomToolbarProps = ToolbarProps<RoomCalendarEvent>;

export default function RoomReservationPage() {
  // data
  const { styles } = useStyles();
  const message = useMessage();

  const [startDate, setStartDate] = useState(() => dayjs().startOf('week').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('week').format('YYYY-MM-DD'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<RoomCalendarEvent | undefined>();

  const { data: eventResponse, refetch: refetchEvent } = useAppQuery({
    queryKey: [queryKey.room.range(startDate, endDate)],
    queryFn: () =>
      RoomControllerService.findRoomReservationUsingGet({
        start: startDate,
        end: endDate,
      }),
  });

  const { mutate: createReservation } = useAppMutation({
    mutationFn: RoomControllerService.createRoomReservationUsingPost,
  });

  const { mutate: deleteReservation } = useAppMutation({
    mutationFn: RoomControllerService.deleteRoomReservationUsingDelete,
  });

  const eventList: RoomCalendarEvent[] =
    eventResponse?.data?.map((el) => ({
      title: `${el.purpose} - ${el.host}`,
      start: dayjs(`${el.date} ${el.start}`).toDate(),
      end: dayjs(`${el.date} ${el.end}`).toDate(),
      resource: {
        id: el.id,
        purpose: el.purpose,
        host: el.host,
      },
    })) ?? [];

  // methods
  const onSelectSlot = (slotInfo: SlotInfo) => {
    const start = dayjs(slotInfo.start);
    const end = dayjs(slotInfo.end);

    for (const event of eventList) {
      const eventStart = dayjs(event.start);
      const eventEnd = dayjs(event.end);

      if (start.isBetween(eventStart, eventEnd, undefined, '[)')) {
        message.error('다른 행사와 시간이 겹칠 수 없습니다.');
        return;
      }

      if (end.isBetween(eventStart, eventEnd, undefined, '(]')) {
        message.error('다른 행사와 시간이 겹칠 수 없습니다.');
        return;
      }
    }

    const purpose = window.prompt('행사명(예. 웹세미나) 입력해주세요.');

    if (!purpose) {
      return;
    }

    const startTime = `${start.hour().toString().padStart(2, '0')}:${start.minute().toString().padStart(2, '0')}` as unknown as LocalTimeReq;
    const endTime = `${end.hour().toString().padStart(2, '0')}:${end.minute().toString().padStart(2, '0')}` as unknown as LocalTimeReq;

    createReservation(
      {
        roomPostRequest: {
          start: startTime,
          end: endTime,
          purpose,
          // start와 end는 날짜가 동일하므로 어느 것을 사용해도 무관
          date: start.format('YYYY-MM-DD'),
        },
      },
      {
        onSuccess() {
          message.success('동아리방이 예약되었습니다.');
          refetchEvent();
        },
      },
    );
  };

  const onSelectEvent = (e: RoomCalendarEvent) => {
    setIsModalOpen(true);
    setCurrentEvent(e);
  };

  const onRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    let start: Date;
    let end: Date;

    if (Array.isArray(range)) {
      [start] = range;
      end = range[range.length - 1];
    } else {
      start = range.start;
      end = range.end;
    }

    setStartDate(dayjs(start).format('YYYY-MM-DD'));
    setEndDate(dayjs(end).format('YYYY-MM-DD'));
  };

  const onModalOk = () => setIsModalOpen(false);

  const onDelete = () => {
    const isConfirmed = confirm('해당 행사를 정말 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    deleteReservation(
      {
        reservationId: currentEvent?.resource?.id,
      },
      {
        onSuccess() {
          message.success('해당 행사가 삭제되었습니다.');
          setIsModalOpen(false);
          setCurrentEvent(undefined);
          refetchEvent();
        },
      },
    );
  };

  const ReservationEvent = ({ event }: { event: RoomCalendarEvent }) => {
    const durationMinutes = dayjs(event.end).diff(dayjs(event.start), 'minute');
    const isTiny = durationMinutes <= 30;
    const isCompact = durationMinutes < 60;
    const shouldHideHost = isTiny;
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    const startMeridiem = start.format('A');
    const endMeridiem = end.format('A');
    const timeText = startMeridiem === endMeridiem ? `${start.format('A h:mm')} - ${end.format('h:mm')}` : `${start.format('A h:mm')} - ${end.format('A h:mm')}`;
    const purpose = event.resource?.purpose || event.title;

    if (isTiny) {
      return (
        <div className={styles.reservationEvent} data-compact data-tiny>
          <span className={styles.reservationTime}>{timeText}</span>
          <span className={styles.reservationPurpose}> · {purpose}</span>
        </div>
      );
    }

    return (
      <div className={styles.reservationEvent} data-compact={isCompact}>
        <span className={styles.reservationTime}>{timeText}</span>
        <span className={styles.reservationPurpose}>{purpose}</span>
        {!shouldHideHost && event.resource?.host && <span className={styles.reservationHost}>{event.resource.host}</span>}
      </div>
    );
  };

  const RoomToolbar = ({ date, view, onNavigate, onView }: RoomToolbarProps) => {
    const visibleStart = view === Views.DAY ? dayjs(date) : dayjs(date).startOf('week');
    const visibleEnd = view === Views.DAY ? dayjs(date) : dayjs(date).endOf('week');
    const isSameMonth = visibleStart.isSame(visibleEnd, 'month');
    const monthText = isSameMonth ? visibleStart.format('YYYY년 M월') : `${visibleStart.format('YYYY년 M월')} - ${visibleEnd.format('YYYY년 M월')}`;
    const rangeText =
      view === Views.DAY
        ? visibleStart.format('M월 D일')
        : `${visibleStart.format('M월 D일')} - ${visibleEnd.format('M월 D일')}`;

    return (
      <div className={styles.toolbar}>
        <div className={styles.toolbarNav}>
          <button type="button" className={styles.toolbarButton} onClick={() => onNavigate('TODAY')}>
            이번 주
          </button>
          <button type="button" className={styles.toolbarButton} onClick={() => onNavigate('PREV')}>
            이전
          </button>
          <button type="button" className={styles.toolbarButton} onClick={() => onNavigate('NEXT')}>
            다음
          </button>
        </div>
        <div className={styles.toolbarRange}>
          <span className={styles.toolbarMonth}>{monthText}</span>
          <span className={styles.toolbarDates}>{rangeText}</span>
        </div>
        <div className={styles.toolbarView}>
          <button type="button" className={styles.toolbarButton} data-active={view === Views.WEEK} onClick={() => onView(Views.WEEK)}>
            주간
          </button>
          <button type="button" className={styles.toolbarButton} data-active={view === Views.DAY} onClick={() => onView(Views.DAY)}>
            일간
          </button>
        </div>
      </div>
    );
  };

  // template
  return (
    <>
      <PageShell>
        <PagePanel>
          <PageContent>
            <PageHeader title="동아리방 예약" />
            <div className={styles.calendarWrap}>
              <Calendar
                localizer={localizer}
                selectable
                style={{
                  width: '100%',
                  height: 1260,
                }}
                culture="ko"
                defaultView={Views.WEEK}
                views={{
                  week: true,
                  day: true,
                }}
                messages={{
                  today: '이번 주',
                  previous: '이전',
                  next: '다음',
                  week: '주간',
                  day: '일간',
                }}
                components={{
                  toolbar: RoomToolbar,
                  event: ReservationEvent,
                }}
                events={eventList}
                onSelectSlot={onSelectSlot}
                onSelectEvent={onSelectEvent}
                onRangeChange={onRangeChange}
                min={new Date(0, 0, 0, 7, 0, 0)}
                max={new Date(0, 0, 0, 23, 0, 0)}
                scrollToTime={new Date(0, 0, 0, 7, 0, 0)}
              />
            </div>
          </PageContent>
        </PagePanel>
      </PageShell>
      <Modal
        title="동방 예약행사"
        open={isModalOpen}
        onOk={onModalOk}
        onCancel={onModalOk}
        footer={[
          <Button type="primary" onClick={onModalOk} key="confirm">
            확인
          </Button>,
          <Button danger onClick={onDelete} key="delete">
            삭제
          </Button>,
        ]}
      >
        <p className={styles.eventTitle}>{currentEvent?.resource?.purpose || currentEvent?.title}</p>
        {currentEvent?.resource?.host && <p className={styles.eventTime}>예약자: {currentEvent.resource.host}</p>}
        <p className={styles.eventTime}>
          시작: {dayjs(currentEvent?.start).format('MM월 DD일 HH시 mm분')}
          <br />
          종료: {dayjs(currentEvent?.end).format('MM월 DD일 HH시 mm분')}
        </p>
      </Modal>
    </>
  );
}
