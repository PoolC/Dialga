import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Space } from 'antd';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

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
}));

const localizer = dayjsLocalizer(dayjs);

export default function RoomReservationPage() {
  const { styles } = useStyles();

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <div className={styles.wrapper}>
          <Space direction="vertical" size={'middle'}>
            <Space direction="vertical" size={'middle'}>
              <h2 className={styles.heading}>동아리방 예약하기</h2>
              <p className={styles.paragraph}>
                원하는 시간대에 동아리방을 예약해요
              </p>
            </Space>
            <Calendar localizer={localizer} />
          </Space>
        </div>
      </WhiteBlock>
    </Block>
  );
}
