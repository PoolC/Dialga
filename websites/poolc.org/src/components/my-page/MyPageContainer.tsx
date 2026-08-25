import { Avatar, Button, List, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, EditTwoTone, MessageTwoTone, StarTwoTone, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { BadgeControllerService, MemberControllerService, queryKey, useAppMutation, useAppSuspenseQueries } from '~/lib/api-v2';
import { MENU } from '~/constants/menus';
import { MEMBER_ROLE } from '~/constants/memberRoles';
import { queryClient } from '~/lib/utils/queryClient';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import getFileUrl from '~/lib/utils/getFileUrl';

export default function MyPageContainer() {
  const { styles, cx } = useStyles();

  const listData: {
    title: string;
    icon: JSX.Element;
    link?: string;
    onClick?: () => void;
  }[] = [
    {
      title: '회원 정보 수정',
      icon: <UserOutlined size={24} />,
      link: '/my-info',
    },
    {
      title: '내가 쓴 글',
      icon: <EditTwoTone size={24} twoToneColor="#ffd43b" />,
      link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_MY_POSTS}`,
    },
    {
      title: '내가 스크랩한 글',
      icon: <StarTwoTone size={24} twoToneColor="#ffa94d" />,
      link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_MY_SCRAPS}`,
    },
    {
      title: '쪽지',
      icon: <MessageTwoTone size={24} twoToneColor="#4dabf7" />,
      link: `/${MENU.MESSAGE}`,
    },
  ];

  const [{ data: myHour }, { data: me }, { data: badge }] = useAppSuspenseQueries({
    queries: [
      {
        queryKey: queryKey.member.hour,
        queryFn: MemberControllerService.getMyActivityTimeUsingGet,
      },
      {
        queryKey: queryKey.member.me,
        queryFn: MemberControllerService.getMeUsingGet,
      },
      {
        queryKey: queryKey.badge.badge,
        queryFn: BadgeControllerService.getMyBadgeUsingGet,
      },
    ],
  });

  const activityMinimumHour = 10;
  const recordedActivityHours = myHour.hour ?? 0;
  const remainingActivityHours = Math.max(activityMinimumHour - recordedActivityHours, 0);
  const meetsRecordedActivityRequirement = recordedActivityHours >= activityMinimumHour;
  const activityProgress = Math.min((recordedActivityHours / activityMinimumHour) * 100, 100);
  const activityDecision = (() => {
    switch (me.role) {
      case MEMBER_ROLE.INACTIVE:
        return { label: '면제', description: '이번 학기 비활동 회원입니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.GRADUATED:
        return { label: '면제', description: '졸업회원은 활동 기준 대상이 아닙니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.COMPLETE:
        return { label: '면제', description: '수료회원은 활동 기준 대상이 아닙니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.ADMIN:
        return { label: '충족', description: '이번 학기 임원진 활동으로 기준을 충족합니다.', className: styles.activityStatusMet };
      case MEMBER_ROLE.TECHNICIAN:
        return { label: '충족', description: '기술 기여 역할로 기준을 충족합니다.', className: styles.activityStatusMet };
      case MEMBER_ROLE.MEMBER:
        return meetsRecordedActivityRequirement
          ? { label: '충족', description: '현재 반영된 인정 활동시간 기준을 충족했습니다.', className: styles.activityStatusMet }
          : { label: '추가 확인 필요', description: `현재 반영된 시간 기준은 ${remainingActivityHours}시간 남았습니다.`, className: '' };
      default:
        return { label: '대상 아님', description: '현재 회원 상태는 활동 기준 판정 대상이 아닙니다.', className: styles.activityStatusNotApplicable };
    }
  })();
  const activityReasonItems = [
    { label: '현재 반영 출석시간', value: `${recordedActivityHours}시간`, color: '#47be9b' },
    { label: '공식 행사', value: '연동 전', color: '#74c0fc' },
    { label: '프로젝트·주최', value: '연동 전', color: '#ffd43b' },
  ];
  const alternativeCriteria = [
    '세미나·스터디 4시간 이상 주최',
    '활동 5시간 이상과 주최 2시간 이상',
    '기술 기여 인정',
    '이번 학기 임원진 활동',
  ];
  const deductionCriteria = ['공식 행사 인정 시간은 학기당 최대 5시간', '지각·결석에 따른 활동시간 차감'];

  const { mutate: selectBadge } = useAppMutation({
    mutationFn: BadgeControllerService.selectBadgeUsingPost,
  });

  const onBadgeButtonClick = (id: number) => {
    if (me?.badge?.id === id) {
      return;
    }

    selectBadge(
      {
        badgeId: id,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: queryKey.member.me,
          });
        },
      },
    );
  };

  return (
    <Space direction="vertical" className={styles.fullWidth} size={40}>
      <Space className={styles.wrapper} size="middle">
        <Avatar size={80} src={getProfileImageUrl(me.profileImageURL)} />
        <Space direction="vertical">
          <Space>
            <Typography.Text className={styles.userName}>{me.name}님</Typography.Text>
            {me.badge && <Avatar src={getFileUrl(me.badge.imageUrl)} alt={me.name} size={60} className={styles.badge} />}
          </Space>
          <Typography.Text>{me.introduction}</Typography.Text>
        </Space>
      </Space>
      <Space direction="vertical" size={0} className={styles.wrapper}>
        <div className={styles.activitySummaryHeader}>
          <Typography.Title level={5}>나의 활동 기준</Typography.Title>
          <Typography.Text className={styles.activitySemester}>이번 학기</Typography.Text>
        </div>
        <Typography.Text className={styles.activitySectionTitle}>시간 기준</Typography.Text>
        <div className={styles.activityOverview}>
          <div className={styles.activityOverviewStatus}>
            <Typography.Text
              className={cx(styles.activityStatusBadge, {
                [activityDecision.className]: Boolean(activityDecision.className),
              })}
            >
              {activityDecision.label}
            </Typography.Text>
            <Typography.Text className={styles.activityRequirementValue}>
              {activityDecision.description}
            </Typography.Text>
          </div>
          <div
            className={styles.activityProgressRing}
            style={{
              background: `conic-gradient(#47be9b ${activityProgress}%, #d9f1e9 ${activityProgress}% 100%)`,
            }}
          >
            <div className={styles.activityProgressRingInner}>
              <Typography.Text className={styles.activityProgressRingValue}>{recordedActivityHours}</Typography.Text>
              <Typography.Text className={styles.activityProgressRingLabel}>/ {activityMinimumHour}시간</Typography.Text>
            </div>
          </div>
        </div>
        <div className={styles.activityLegend} aria-label="인정 활동시간 구성">
          {activityReasonItems.map((item) => (
            <div className={styles.activityLegendItem} key={item.label}>
              <span className={styles.activityLegendDot} style={{ backgroundColor: item.color }} />
              <Typography.Text className={styles.activityLegendLabel}>{item.label}</Typography.Text>
              <Typography.Text className={styles.activityLegendValue}>{item.value}</Typography.Text>
            </div>
          ))}
        </div>
        <div className={styles.activityRuleSection}>
          <Typography.Text className={styles.activitySectionTitle}>대체 충족 조건</Typography.Text>
          <div className={styles.activityRuleList}>
            {alternativeCriteria.map((criterion) => (
              <div className={styles.activityRuleItem} key={criterion}>
                <span className={styles.activityRuleIndicator} />
                <Typography.Text>{criterion}</Typography.Text>
                <Typography.Text className={styles.activityRuleStatus}>미반영</Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.activityRuleSection}>
          <Typography.Text className={styles.activitySectionTitle}>감점·제한</Typography.Text>
          <div className={styles.activityRuleList}>
            {deductionCriteria.map((criterion) => (
              <div className={styles.activityRuleItem} key={criterion}>
                <span className={styles.activityRuleIndicator} />
                <Typography.Text>{criterion}</Typography.Text>
                <Typography.Text className={styles.activityRuleStatus}>미반영</Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </Space>
      <Space direction="vertical" size={0} className={styles.wrapper}>
        <Typography.Title level={5} className={styles.badgeTitle}>
          얻은 뱃지
          <Link to={`/${MENU.MY_PAGE}/${MENU.MY_PAGE_BADGE_LIST}`} className={styles.badgeLink}>
            모든 뱃지보기 <span>&gt;</span>
          </Link>
        </Typography.Title>
        {badge?.data && badge.data.length > 0 ? (
          <Space size={[8, 16]} wrap>
            {badge.data.map((el, idx) => (
              <Button
                key={`${el.id}-${idx}`}
                onClick={() => onBadgeButtonClick(el.id!)}
                shape="circle"
                className={cx(styles.badgeButton, {
                  active: me.badge?.id === el.id,
                })}
              >
                <Avatar src={getFileUrl(el.imageUrl)} alt={el.name} size={50} />
              </Button>
            ))}
          </Space>
        ) : (
          <Typography.Text>아직 뱃지가 없습니다.</Typography.Text>
        )}
      </Space>
      <Space direction="vertical" size={0} className={styles.wrapper}>
        <Typography.Title level={5}>나의 메뉴</Typography.Title>
        <List
          size="large"
          className={styles.fullWidth}
          bordered
          dataSource={listData}
          renderItem={(item) =>
            item.link ? (
              <List.Item onClick={item.onClick}>
                <Link to={item.link} className={styles.link}>
                  <div className={styles.linkInner}>
                    {item.icon}
                    <Typography.Text>{item.title}</Typography.Text>
                  </div>
                  <ArrowRightOutlined size={18} color="#ced4da" />
                </Link>
              </List.Item>
            ) : (
              <List.Item onClick={item.onClick} className={styles.link}>
                <div className={styles.linkInner}>
                  {item.icon}
                  <Typography.Text>{item.title}</Typography.Text>
                </div>
                <ArrowRightOutlined size={18} color="#ced4da" />
              </List.Item>
            )
          }
        />
      </Space>
    </Space>
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
  fullWidth: css`
    width: 100%;
  `,
  activitySummaryHeader: css`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;

    .ant-typography {
      margin-bottom: 12px;
    }
  `,
  activitySemester: css`
    color: #868e96;
    font-size: 12px;
  `,
  activityOverview: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 6px 0 0;

    @media (max-width: 576px) {
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;
    }
  `,
  activityOverviewStatus: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  activityStatusBadge: css`
    width: fit-content;
    padding: 3px 8px;
    border-radius: 999px;
    background: #fff4e6;
    color: #e67700;
    font-size: 12px;
    font-weight: 700;
  `,
  activityStatusMet: css`
    background: #e6fcf5;
    color: #2f9d7e;
  `,
  activityStatusExempt: css`
    background: #e7f5ff;
    color: #1971c2;
  `,
  activityStatusNotApplicable: css`
    background: #f1f3f5;
    color: #868e96;
  `,
  activityRequirementValue: css`
    display: block;
    color: #495057;
    font-size: 14px;
  `,
  activityProgressRing: css`
    display: grid;
    flex: none;
    width: 128px;
    height: 128px;
    place-items: center;
    border-radius: 50%;
  `,
  activityProgressRingInner: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 104px;
    border-radius: 50%;
    background: #fff;
  `,
  activityProgressRingValue: css`
    color: #2f9d7e;
    font-size: 30px;
    font-weight: 700;
    line-height: 1;
  `,
  activityProgressRingLabel: css`
    margin-top: 3px;
    color: #868e96;
    font-size: 11px;
  `,
  activityLegend: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    margin-top: 14px;
  `,
  activityLegendItem: css`
    display: inline-flex;
    align-items: center;
    gap: 5px;
  `,
  activityLegendDot: css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
  activityLegendLabel: css`
    color: #495057;
    font-size: 12px;
  `,
  activityLegendValue: css`
    color: #868e96;
    font-size: 12px;
  `,
  activityRuleSection: css`
    margin-top: 24px;
  `,
  activityRuleList: css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 24px;

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  `,
  activityRuleItem: css`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 10px 0;
    border-top: 1px solid #f1f3f5;

    .ant-typography:nth-child(2) {
      flex: 1;
      min-width: 0;
      color: #495057;
      font-size: 13px;
    }
  `,
  activityRuleIndicator: css`
    flex: none;
    width: 8px;
    height: 8px;
    border: 1px solid #adb5bd;
    border-radius: 50%;
  `,
  activityRuleStatus: css`
    flex: none;
    color: #868e96;
    font-size: 12px;
  `,
  link: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-decoration: inherit;
    cursor: pointer;
  `,
  linkInner: css`
    display: flex;
    align-items: center;
    gap: 20px;
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
  badgeTitle: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  badgeLink: css`
    font-size: 12px;
    color: #9d9893 !important;
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  badgeButton: css`
    display: flex;
    height: auto;
    min-width: auto;
    padding: 0;
    border: 2px solid transparent;
    &.active {
      border-color: #47be9b;
    }
  `,
  badge: css`
    border: 2px solid #47be9b;
  `,
}));
