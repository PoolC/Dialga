import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import MyPageContainer from '~/components/my-page/MyPageContainer';
import Skeleton from '~/components/common/Skeleton';

export default function MyPage() {
  const { styles } = useStyles();

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <div className={styles.wrapper}>
          <Suspense fallback={<Skeleton />}>
            <MyPageContainer />
          </Suspense>
        </div>
      </WhiteBlock>
    </Block>
  );
}

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    box-sizing: border-box;
    padding: 30px 20px;
  `,
  wrapper: css`
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    box-sizing: border-box;
  `,
}));
