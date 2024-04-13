import { Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import Skeleton from '~/components/common/Skeleton';
import MyPageMyPostsEntry from '~/components/my-page/MyPageMyPostsEntry';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    padding: 30px 0;
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
  fullWidth: css`
    width: 100%;
  `,
}));

export default function MyPageMyPostsPage() {
  const { styles } = useStyles();

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <div className={styles.wrapper}>
          <Space direction="vertical" size="large" className={styles.fullWidth}>
            <Space direction="vertical" size="middle">
              <h2 className={styles.heading}>내가 쓴 글</h2>
              <p className={styles.paragraph}>내가 쓴 글 목록입니다.</p>
            </Space>
            <Suspense fallback={<Skeleton />}>
              <MyPageMyPostsEntry />
            </Suspense>
          </Space>
        </div>
      </WhiteBlock>
    </Block>
  );
}
