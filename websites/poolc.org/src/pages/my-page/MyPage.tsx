import { createStyles } from 'antd-style';
import { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import MyPageContainer from '~/components/my-page/MyPageContainer';
import Skeleton from '~/components/common/Skeleton';
import { MEMBER_ROLE } from '~/constants/memberRoles';
import { MENU } from '~/constants/menus';
import { useAppSelector } from '~/hooks/useAppSelector';

export default function MyPage() {
  const { styles } = useStyles();
  const role = useAppSelector((state) => state.auth.user.role);

  if (role === MEMBER_ROLE.UNACCEPTED) {
    return <Redirect to={`/${MENU.APPLY}`} />;
  }

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
