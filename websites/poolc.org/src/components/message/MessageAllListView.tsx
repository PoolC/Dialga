import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import MessageAllListContent from './MessageAllListContent';
import Spinner from '../common/Spinner/Spinner';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    padding: 30px 20px;
  `,
}));

export default function MessageAllListView() {
  const { styles } = useStyles();

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <Suspense fallback={<Spinner />}>
          <MessageAllListContent />
        </Suspense>
      </WhiteBlock>
    </Block>
  );
}
