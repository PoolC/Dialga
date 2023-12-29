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

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const title = window.prompt(
      "'행사명 - 이름'을 입력해주세요(ex. 웹세미나 - 홍길동).",
    );
    if (title) {
      console.log(slotInfo, title);
    }
  };

  const onSelectEvent = (e: Event) => {
    console.log(e.title);
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
                onSelectSlot={onSelectSlot}
                onSelectEvent={onSelectEvent}
                culture="ko"
                defaultView={Views.WEEK}
                views={{
                  week: true,
                  day: true,
                }}
              />
            </div>
          </Space>
        </div>
      </WhiteBlock>
    </Block>
  );
}
