import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import { useLocation } from 'react-router';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import MyPageContainer from '~/components/my-page/MyPageContainer';
import Skeleton from '~/components/common/Skeleton';

export default function MyPage() {
  const { styles } = useStyles();
  const location = useLocation();

  const locationHash = location.hash.replace(/^#/, '');

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <div className={styles.wrapper}>
          <Suspense fallback={<Skeleton />}>
            <MyPageContainer locationHash={locationHash} />
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
    box-sizing: border-box;
  `,
}));
