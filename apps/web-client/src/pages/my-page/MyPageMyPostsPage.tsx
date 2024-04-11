import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import Skeleton from '~/components/common/Skeleton';
import MyPageMyPostsEntry from '~/components/my-page/MyPageMyPostsEntry';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    &.scope {
      padding: 30px 0;
    }
  `,
  wrapper: css`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 8px;
  `,
}));

export default function MyPageMyPostsPage() {
  const { styles } = useStyles();

  return (
    <div>
      <div className={styles.wrapper}>
        <Suspense fallback={<Skeleton />}>
          <MyPageMyPostsEntry />
        </Suspense>
      </div>
    </div>
  );
}
