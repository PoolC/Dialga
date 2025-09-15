import { createStyles } from 'antd-style';
import Carousel from '~/components/home/Carousel';
import RecentNotice from '~/components/home/RecentNotice';
import RecentProject from '~/components/home/RecentProject';
import { useAppSelector } from '~/hooks/useAppSelector';
import { PoolcControllerService, PostControllerService, ProjectControllerService, queryKey, useAppSuspenseQueries } from '~/lib/api-v2';
import { getBoardTitleForRequest } from '~/lib/utils/boardUtil';
import ApplyBanner from '~/components/home/ApplyBanner';

const useStyles = createStyles(({ css }) => ({
  block: css`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 1366px;
  `,
}));

export default function HomeEntry() {
  const { styles } = useStyles();

  const [{ data: poolcInfo }, { data: projectInfo }, { data: noticeInfo }] = useAppSuspenseQueries({
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
            boardTitle: getBoardTitleForRequest('NOTICE'),
            page: 0,
          }),
      },
    ],
  });

  const isLogin = useAppSelector((state) => state.auth.status.isLogin);
  const role = useAppSelector((state) => state.auth.user.role);

  const isHideApplyBanner =
    poolcInfo.isSubscriptionPeriod === null || (poolcInfo.isSubscriptionPeriod && poolcInfo.applyUri == null) || !poolcInfo.isSubscriptionPeriod || (isLogin && role !== 'UNACCEPTED');

  return (
    <div className={styles.block}>
      <Carousel />
      {Boolean(!isHideApplyBanner) && <ApplyBanner />}
      <RecentNotice notices={noticeInfo.posts?.slice(0, 5) ?? []} />
      <RecentProject projects={projectInfo.data.slice(0, 7)} />
    </div>
  );
}
