import {
  PoolcControllerService,
  ProjectControllerService,
  queryKey,
  useAppQueries,
} from '~/lib/api-v2';
import { Skeleton } from 'antd';
import Carousel from '~/components/home/Carousel/Carousel';
import ApplyBanner from '~/components/home/ApplyBanner/ApplyBanner';
import RecentProject from '~/components/home/RecentProject/RecentProject';
import { getEmptyArray } from '~/lib/utils/getEmptyArray';
import { createStyles } from 'antd-style';
import { useAppSelector } from '~/hooks/useAppSelector';

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

const HomePage = () => {
  const { styles } = useStyles();

  const [{ data: poolcInfo }, { data: projectInfo }] = useAppQueries({
    queries: [
      {
        queryKey: queryKey.poolc.poolc,
        queryFn: PoolcControllerService.findPoolcUsingGet,
      },
      {
        queryKey: queryKey.project.all,
        queryFn: ProjectControllerService.findProjectsUsingGet,
      },
    ],
  });

  const isLogin = useAppSelector((state) => state.auth.status.isLogin);
  const role = useAppSelector((state) => state.auth.user.role);

  const isLoading = !poolcInfo || !projectInfo;

  if (isLoading) {
    return (
      <div className={styles.block}>
        <div className={styles.skeletonWrap}>
          {getEmptyArray(3).map((i) => (
            <Skeleton key={i} active />
          ))}
        </div>
      </div>
    );
  }

  const isHideApplyBanner =
    poolcInfo.isSubscriptionPeriod == null ||
    (poolcInfo.isSubscriptionPeriod === true && poolcInfo.applyUri == null) ||
    poolcInfo.isSubscriptionPeriod === false ||
    (isLogin && role !== 'UNACCEPTED');

  return (
    <div className={styles.block}>
      <Carousel />
      {isHideApplyBanner ? null : <ApplyBanner />}
      {/* <RecentNoticeContainer /> */}
      <RecentProject projects={projectInfo.data.slice(0, 7)} />
    </div>
  );
};

export default HomePage;
