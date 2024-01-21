import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { createStyles } from 'antd-style';
import { Button, Modal, Space } from 'antd';
import { Calendar, dayjsLocalizer, Event, SlotInfo, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { LocalTimeReq, queryKey, RoomControllerService, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { dayjs } from '~/lib/utils/dayjs';
import { useMessage } from '~/hooks/useMessage';
import { useState } from 'react';

const localizer = dayjsLocalizer(dayjs);

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    &.scope {
      padding: 30px 0;
    }
  `,
  wrapper: css`
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    box-sizing: border-box;
  `,
  heading: css`
    font-size: 18px;
  `,
  paragraph: css`
    font-size: 14px;
    color: #666;
  `,
  calendarWrap: css`
    .rbc-today {
      background-color: rgb(250, 250, 250);
    }
    .rbc-event {
      background-color: #47be9b;
      border: 1px solid #47be9b !important;
    }
    .rbc-allday-cell {
      display: none;
    }
    .rbc-header {
      border-bottom: none;
    }
    overflow-x: auto;
  `,
  fullWidth: css`
    width: 100%;
  `,
  eventTitle: css`
    font-weight: 500;
  `,
  eventTime: css`
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  `,
}));

export default function RoomReservationPage() {
  // data
  const { styles, cx } = useStyles();
  const message = useMessage();

  const [startDate, setStartDate] = useState(() => dayjs().startOf('week').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('week').format('YYYY-MM-DD'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | undefined>();

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

  const eventList: Event[] =
    eventResponse?.data?.map((el) => ({
      title: `${el.purpose} - ${el.host}`,
      start: dayjs(`${el.date} ${el.start}`).toDate(),
      end: dayjs(`${el.date} ${el.end}`).toDate(),
      resource: el.id,
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

  const onSelectEvent = (e: Event) => {
    setIsModalOpen(true);
    setCurrentEvent(e);
  };

  const onRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    let start: Date;
    let end: Date;

    if (Array.isArray(range)) {
      const { length: l } = range;
      start = range[0];
      end = range[l - 1];
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
        reservationId: currentEvent?.resource,
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

  // template
  return (
    <>
      <Block>
        <WhiteBlock className={cx(styles.whiteBlock, 'scope')}>
          <div className={styles.wrapper}>
            <Space direction="vertical" size="large" className={styles.fullWidth}>
              <Space direction="vertical" size="middle">
                <h2 className={styles.heading}>동아리방 예약하기</h2>
                <p className={styles.paragraph}>원하는 시간대에 동아리방을 예약해요.</p>
              </Space>
              <div className={styles.calendarWrap}>
                <Calendar
                  localizer={localizer}
                  selectable
                  style={{
                    width: '100%',
                    height: 1000,
                    minWidth: '600px',
                  }}
                  culture="ko"
                  defaultView={Views.WEEK}
                  views={{
                    week: true,
                    day: true,
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
            </Space>
          </div>
        </WhiteBlock>
      </Block>
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
        <p className={styles.eventTitle}>{currentEvent?.title}</p>
        <p className={styles.eventTime}>
          시작: {dayjs(currentEvent?.start).format('MM월 DD일 HH시 mm분')}
          <br />
          종료: {dayjs(currentEvent?.end).format('MM월 DD일 HH시 mm분')}
        </p>
      </Modal>
    </>
  );
}
