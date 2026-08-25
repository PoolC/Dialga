import { Avatar, Progress, Space, Tooltip, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { Badge, BadgeControllerService, MemberControllerService, queryKey, useAppQueries } from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import getFileUrl from '~/lib/utils/getFileUrl';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    padding: 30px 20px;
    align-items: stretch;
    gap: 40px;
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
  owned: css`
    border: 2px solid #47be9b;
  `,
  notOwned: css`
    border: 2px solid #eee;
  `,
}));

export default function MyPageBadgeListPage() {
  const { styles, cx } = useStyles();

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

  const renderBadgeTooltipTitle = (badge: Badge) => (
    <div>
      <span className={styles.badgeName}>{badge.name}</span>
      <br />
      <span className={styles.badgeDesc}>{badge.description}</span>
    </div>
  );

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <Space className={styles.wrapper} size="middle">
          <Avatar size={80} src={getProfileImageUrl(me?.profileImageURL)} />
          <Space>
            <Typography.Text className={styles.userName}>{me?.name}님</Typography.Text>
            <Typography.Text>의 뱃지함</Typography.Text>
          </Space>
        </Space>
        <Space direction="vertical" size="middle" className={styles.fullWidth}>
          <div>
            <Typography.Text className={styles.category}>Attendance</Typography.Text>
          </div>
          <div className={styles.badgeWrap}>
            {allBadges?.data
              ?.filter((badge) => badge.category === 'ATTENDANCE')
              .map((badge) => (
                <Tooltip key={badge.id} title={renderBadgeTooltipTitle(badge)}>
                  <Avatar src={getFileUrl(badge.imageUrl)} alt={badge.name} size={60} className={cx(badge.own ? styles.owned : styles.notOwned)} />
                </Tooltip>
              ))}
          </div>
          <Space direction="vertical" size={0} className={styles.wrapper}>
            <Typography.Title level={5}>출석 횟수(누적)</Typography.Title>
            <Typography.Text>{allBadges?.attendance ?? 0}일 / 30일</Typography.Text>
            <Progress percent={((allBadges?.attendance ?? 0) / 30) * 100} showInfo={false} strokeColor="#47be9b" />
          </Space>
        </Space>
      </WhiteBlock>
    </Block>
  );
}
