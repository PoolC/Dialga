import { Avatar, Progress, Space, Tooltip, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { match } from 'ts-pattern';
import {
  Badge,
  BadgeControllerService,
  MemberControllerService,
  queryKey,
  useAppQueries,
} from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import classNames from 'classnames';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import getFileUrl from '~/lib/utils/getFileUrl';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    &.scope {
      padding: 30px 20px;
      align-items: stretch;
      gap: 40px;
    }
  `,
  wrapper: css`
    width: 100%;
    box-sizing: border-box;
  `,
  fullWidth: css`
    width: 100%;
  `,
  userName: css`
    font-size: 24px;
    font-weight: 700;
    position: relative;

    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 7px;
      background-color: #47be9b;
      opacity: 0.5;
      bottom: 0;
      left: 0;
    }
  `,
  category: css`
    border-radius: 16px;
    background: #d9d9d9;
    padding: 8px;
    display: inline-block;
    font-weight: 700;
  `,
  badgeName: css`
    font-weight: 700;
  `,
  badgeDesc: css`
    font-weight: 300;
  `,
  badgeWrap: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  `,
  tierProgressRow: css`
    display: flex;
    gap: 24px;
  `,
}));

export default function MyPageBadgeListPage() {
  const { styles } = useStyles();

  const [{ data: allBadges }, { data: me }] = useAppQueries({
    queries: [
      {
        queryKey: queryKey.badge.all,
        queryFn: BadgeControllerService.getAllBadgeUsingGet,
      },
      {
        queryKey: queryKey.member.me,
        queryFn: MemberControllerService.getMeUsingGet,
      },
    ],
  });

  const baekjoonBadges =
    allBadges?.data?.filter((badge) => badge.category === 'BAEKJOON') ?? [];

  const baekjoonSuccessiveSolveBadges = baekjoonBadges.slice(
    0,
    baekjoonBadges.length - 5,
  );

  const baekjoonTierBadges = baekjoonBadges.slice(baekjoonBadges.length - 5);

  const renderBadgeTooltipTitle = (badge: Badge) => {
    return (
      <div>
        <span className={styles.badgeName}>{badge.name}</span>
        <br />
        <span className={styles.badgeDesc}>{badge.description}</span>
      </div>
    );
  };

  const renderBakejoonTierProgress = (
    tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'ruby',
    count: number,
  ) => {
    const title = match(tier)
      .with('bronze', () => '브론즈')
      .with('silver', () => '실버')
      .with('gold', () => '골드')
      .with('platinum', () => '플래티넘')
      .with('diamond', () => '다이아몬드')
      .with('ruby', () => '루비')
      .exhaustive();

    const strokecolor = match(tier)
      .with('bronze', () => '#ad5600')
      .with('silver', () => '#435f7a')
      .with('gold', () => '#ec9a00')
      .with('platinum', () => '#27e2a4')
      .with('diamond', () => '#00b4fc')
      .with('ruby', () => '#ff0062')
      .exhaustive();

    return (
      <Space direction="vertical" size={0} className={styles.wrapper}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Typography.Text>{count}개 / 10개</Typography.Text>
        <Progress
          percent={(count / 10) * 100}
          showInfo={false}
          strokeColor={strokecolor}
        />
      </Space>
    );
  };

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <Space className={styles.wrapper} size={'middle'}>
          <Avatar size={80} src={getProfileImageUrl(me?.profileImageURL)} />
          <Space>
            <Typography.Text className={styles.userName}>
              {me?.name}님
            </Typography.Text>
            <Typography.Text>의 뱃지함</Typography.Text>
          </Space>
        </Space>
        <Space
          direction="vertical"
          size={'middle'}
          className={styles.fullWidth}
        >
          <div>
            <Typography.Text className={styles.category}>
              Attendance
            </Typography.Text>
          </div>
          <div className={styles.badgeWrap}>
            {allBadges?.data
              ?.filter((badge) => badge.category === 'ATTENDANCE')
              .map((badge) => (
                <Tooltip key={badge.id} title={renderBadgeTooltipTitle(badge)}>
                  <Avatar src={getFileUrl(badge.imageUrl)} alt={badge.name} />
                </Tooltip>
              ))}
          </div>
          <Space direction="vertical" size={0} className={styles.wrapper}>
            <Typography.Title level={5}>출석 횟수(누적)</Typography.Title>
            <Typography.Text>
              {allBadges?.attendance ?? 0}일 / 30일
            </Typography.Text>
            <Progress
              percent={((allBadges?.attendance ?? 0) / 30) * 100}
              showInfo={false}
              strokeColor={'#47be9b'}
            />
          </Space>
        </Space>
        <Space
          direction="vertical"
          size={'middle'}
          className={styles.fullWidth}
        >
          <div>
            <Typography.Text className={styles.category}>
              Baekjoon
            </Typography.Text>
          </div>
          <div className={styles.badgeWrap}>
            {baekjoonSuccessiveSolveBadges.map((badge) => (
              <Tooltip key={badge.id} title={renderBadgeTooltipTitle(badge)}>
                <Avatar src={getFileUrl(badge.imageUrl)} alt={badge.name} />
              </Tooltip>
            ))}
          </div>
          <Space direction="vertical" size={0} className={styles.wrapper}>
            <Typography.Title level={5}>문제풀이 횟수(연속)</Typography.Title>
            <Typography.Text>
              {allBadges?.baekjoon ?? 0}일 / 50일
            </Typography.Text>
            <Progress
              percent={(allBadges?.baekjoon ?? 0) / 50}
              showInfo={false}
              strokeColor={'#47be9b'}
            />
          </Space>
          <div className={styles.badgeWrap}>
            {baekjoonTierBadges.map((badge) => (
              <Tooltip key={badge.id} title={renderBadgeTooltipTitle(badge)}>
                <Avatar src={getFileUrl(badge.imageUrl)} alt={badge.name} />
              </Tooltip>
            ))}
          </div>
          <div className={styles.tierProgressRow}>
            {renderBakejoonTierProgress('bronze', allBadges?.bronze ?? 0)}
            {renderBakejoonTierProgress('platinum', allBadges?.platinum ?? 0)}
          </div>
          <div className={styles.tierProgressRow}>
            {renderBakejoonTierProgress('silver', allBadges?.silver ?? 0)}
            {renderBakejoonTierProgress('diamond', allBadges?.diamond ?? 0)}
          </div>
          <div className={styles.tierProgressRow}>
            {renderBakejoonTierProgress('gold', allBadges?.gold ?? 0)}
            {renderBakejoonTierProgress('ruby', allBadges?.ruby ?? 0)}
          </div>
        </Space>
      </WhiteBlock>
    </Block>
  );
}
