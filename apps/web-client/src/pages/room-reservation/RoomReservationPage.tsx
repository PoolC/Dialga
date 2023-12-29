import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Space } from 'antd';
import {
  Calendar,
  SlotInfo,
  Event,
  Views,
  dateFnsLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ko from 'date-fns/locale/ko';
import {
  queryKey,
  RoomControllerService,
  useAppMutation,
  useAppQuery,
} from '~/lib/api-v2';
import dayjs from 'dayjs';
import { useMessage } from '~/hooks/useMessage';
import { useState } from 'react';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    ko: ko,
  },
});

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
    display: flex;
    justify-content: center;
    .rbc-today {
      background-color: rgb(250, 250, 250);
    }
  `,
  fullWidth: css`
    width: 100%;
  `,
}));

export default function RoomReservationPage() {
  const { styles } = useStyles();
  const message = useMessage();

  const [startDate, setStartDate] = useState(() =>
    dayjs().startOf('week').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    dayjs().endOf('week').format('YYYY-MM-DD'),
  );

  const { data: eventResponse } = useAppQuery({
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

  const eventList =
    eventResponse?.data?.map((el) => ({
      title: `${el.purpose} - ${el.host}`,
      start: dayjs(
        `${el.date} ${el.start?.hour}-${el.start?.minute}-${el.start?.second}`,
      ).toDate(),
      end: dayjs(
        `${el.date} ${el.end?.hour}-${el.end?.minute}-${el.end?.second}`,
      ).toDate(),
    })) ?? [];

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const purpose = window.prompt(
      "'행사명 - 이름'을 입력해주세요(ex. 웹세미나 - 홍길동).",
    );

    if (!purpose) {
      return;
    }

    const start = dayjs(slotInfo.start);
    const end = dayjs(slotInfo.end);

    createReservation(
      {
        roomPostRequest: {
          start: {
            hour: start.hour().toString(),
            minute: start.minute().toString(),
            second: start.second().toString(),
            nano: 0,
          },
          end: {
            hour: end.hour().toString(),
            minute: end.minute().toString(),
            second: end.second().toString(),
            nano: 0,
          },
          purpose,
          // start와 end는 날짜가 동일하므로 어느 것을 사용해도 무관
          date: start.format('YYYY-MM-DD'),
        },
      },
      {
        onSuccess() {
          message.success('동아리방이 예약되었습니다.');
        },
      },
    );
  };

  const onSelectEvent = (e: Event) => {
    // TODO 수정/삭제 관련
    console.log(e.title);
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

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <div className={styles.wrapper}>
          <Space direction="vertical" size="large" className={styles.fullWidth}>
            <Space direction="vertical" size="middle">
              <h2 className={styles.heading}>동아리방 예약하기</h2>
              <p className={styles.paragraph}>
                원하는 시간대에 동아리방을 예약해요.
              </p>
            </Space>
            <div className={styles.calendarWrap}>
              <Calendar
                localizer={localizer}
                selectable
                style={{ width: '100%', height: 500 }}
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
              />
            </div>
          </Space>
        </div>
      </WhiteBlock>
    </Block>
  );
}
