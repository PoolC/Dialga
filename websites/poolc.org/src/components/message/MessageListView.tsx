import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import Spinner from '../common/Spinner/Spinner';
import MessageListContent from './MessageListContent';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    padding: 30px 20px;
  `,
}));

export default function MessageListView() {
  const { styles } = useStyles();

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <Suspense fallback={<Spinner />}>
          <MessageListContent />
        </Suspense>
      </WhiteBlock>
    </Block>
  );
}
