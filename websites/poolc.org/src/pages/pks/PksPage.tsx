import { Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles } from 'antd-style';
import Skeleton from '~/components/common/Skeleton';
import PksContainer from '~/components/pks/PksContainer';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import useLoginCheck from '~/hooks/useLoginCheck';

export default function PksPage() {
  const { styles } = useStyles();
  const history = useHistory();

  useLoginCheck(history);

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <Suspense fallback={<Skeleton />}>
          <PksContainer />
        </Suspense>
      </WhiteBlock>
    </Block>
  );
}

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    box-sizing: border-box;
    padding: 30px 20px;
  `,
}));
