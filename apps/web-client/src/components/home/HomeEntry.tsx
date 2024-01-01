import { PoolcControllerService, PostControllerService, ProjectControllerService, queryKey, useAppQueries } from '~/lib/api-v2';
import Carousel from '~/components/home/Carousel';
import ApplyBanner from '~/components/home/ApplyBanner';
import RecentProject from '~/components/home/RecentProject';
import { useAppSelector } from '~/hooks/useAppSelector';
import { getBoardTitleByBoardType } from '~/lib/utils/boardUtil';
import RecentNotice from '~/components/home/RecentNotice';
import { useAppSuspeneseQueries } from '~/lib/api-v2/useAppSuspenseQueries';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  block: css`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1366px;
  `,
}));

export default function HomeEntry() {
  const { styles } = useStyles();

  const [{ data: poolcInfo }, { data: projectInfo }, { data: noticeInfo }] = useAppSuspeneseQueries({
    queries: [
      {
        queryKey: queryKey.poolc.poolc,
        queryFn: PoolcControllerService.findPoolcUsingGet,
      },
      {
        queryKey: queryKey.project.all,
        queryFn: ProjectControllerService.findProjectsUsingGet,
      },
      {
        queryKey: queryKey.post.all('NOTICE', 0),
        queryFn: () =>
          PostControllerService.viewPostsByBoardUsingGet({
            boardTitle: getBoardTitleByBoardType('NOTICE'),
            page: 0,
          }),
      },
    ],
  });

  const isLogin = useAppSelector((state) => state.auth.status.isLogin);
  const role = useAppSelector((state) => state.auth.user.role);

  const isHideApplyBanner =
    poolcInfo.isSubscriptionPeriod == null || (poolcInfo.isSubscriptionPeriod === true && poolcInfo.applyUri == null) || poolcInfo.isSubscriptionPeriod === false || (isLogin && role !== 'UNACCEPTED');

  return (
    <div className={styles.block}>
      <Carousel />
      {isHideApplyBanner ? null : <ApplyBanner />}
      <RecentNotice notices={noticeInfo.posts?.slice(0, 5) ?? []} />
      <RecentProject projects={projectInfo.data.slice(0, 7)} />
    </div>
  );
}
