import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Space } from 'antd';

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
}));

export default function RoomReservationPage() {
  const { styles } = useStyles();

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <div className={styles.wrapper}>
          <Space>
            <h2 className={styles.heading}>동아리방 예약</h2>
          </Space>
        </div>
      </WhiteBlock>
    </Block>
  );
}
