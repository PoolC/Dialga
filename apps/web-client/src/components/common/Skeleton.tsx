import { getEmptyArray } from '~/lib/utils/getEmptyArray';
import { Skeleton as SkeletonImpl } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  block: css`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1366px;
  `,
  skeletonWrap: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    gap: 20px;
    box-sizing: border-box;
  `,
}));

export default function Skeleton() {
  const { styles } = useStyles();

  return (
    <div className={styles.block}>
      <div className={styles.skeletonWrap}>
        {getEmptyArray(3).map((i) => (
          <SkeletonImpl key={i} active />
        ))}
      </div>
    </div>
  );
}
