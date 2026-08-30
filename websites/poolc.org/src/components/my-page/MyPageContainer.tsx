import { Avatar, Button, List, Space, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, ArrowRightOutlined, DownOutlined, EditOutlined, MessageOutlined, StarOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { MemberControllerService, MyActivityDetailResponse, MyActivitySummaryResponse, queryKey, useAppSuspenseQueries } from '~/lib/api-v2';
import { MENU } from '~/constants/menus';
import { MEMBER_ROLE } from '~/constants/memberRoles';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import { EmptyState } from '~/components/common/EmptyState/EmptyState';

const getMyActivitySummary = async (): Promise<MyActivitySummaryResponse> => {
  try {
    return await MemberControllerService.getMyActivitySummaryUsingGet();
  } catch {
    const legacyHour = await MemberControllerService.getMyActivityTimeUsingGet();
    const totalHours = legacyHour.hour ?? 0;

    return {
      totalHours,
      seminarStudyHours: totalHours,
      officialActivityHours: 0,
      projectHours: 0,
      seminarStudyActivities: [],
      officialActivities: [],
      projectActivities: [],
    };
  }
};

export default function MyPageContainer() {
  const { styles, cx } = useStyles();
  const [expandedActivitySections, setExpandedActivitySections] = useState<Record<string, boolean>>({});

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
      icon: <EditOutlined size={24} />,
      link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_MY_POSTS}`,
    },
    {
      title: '내가 스크랩한 글',
      icon: <StarOutlined size={24} />,
      link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_MY_SCRAPS}`,
    },
    {
      title: '쪽지',
      icon: <MessageOutlined size={24} />,
      link: `/${MENU.MESSAGE}`,
    },
    {
      title: '포켓몬 도감',
      icon: <AppstoreOutlined size={24} />,
      link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_COLLECTION}`,
    },
  ];

  const [{ data: activitySummary }, { data: me }] = useAppSuspenseQueries({
    queries: [
      {
        queryKey: queryKey.member.activitySummary,
        queryFn: getMyActivitySummary,
      },
      {
        queryKey: queryKey.member.me,
        queryFn: MemberControllerService.getMeUsingGet,
      },
    ],
  });

  const activityMinimumHour = 10;
  const recordedActivityHours = activitySummary.totalHours ?? 0;
  const hasRoleExemption = me.role === MEMBER_ROLE.ADMIN || me.role === MEMBER_ROLE.TECHNICIAN;
  const hasManualExemption = Boolean(me.isExcepted) && !hasRoleExemption;
  const activityExemptionLabel =
    me.role === MEMBER_ROLE.ADMIN
      ? '임원진 면제'
      : me.role === MEMBER_ROLE.TECHNICIAN
        ? '기술적 기여 면제'
        : hasManualExemption
          ? '관리자 면제'
          : null;
  const displayedActivityHours = recordedActivityHours;
  const remainingActivityHours = Math.max(activityMinimumHour - displayedActivityHours, 0);
  const meetsRecordedActivityRequirement = displayedActivityHours >= activityMinimumHour;
  const activityProgress = Math.min((displayedActivityHours / activityMinimumHour) * 100, 100);
  const activityDecision = (() => {
    if (hasManualExemption) {
      return { label: '면제', description: '관리자 승인으로 활동 기준이 면제됩니다.', className: styles.activityStatusExempt };
    }

    switch (me.role) {
      case MEMBER_ROLE.INACTIVE:
        return { label: '면제', description: '이번 학기 비활동 회원입니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.GRADUATED:
        return { label: '면제', description: '졸업회원은 활동 기준 대상이 아닙니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.COMPLETE:
        return { label: '면제', description: '수료회원은 활동 기준 대상이 아닙니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.ADMIN:
        return { label: '면제', description: '임원진 역할로 활동 기준이 면제됩니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.TECHNICIAN:
        return { label: '면제', description: '기술 기여 역할로 활동 기준이 면제됩니다.', className: styles.activityStatusExempt };
      case MEMBER_ROLE.MEMBER:
        return meetsRecordedActivityRequirement
          ? { label: '충족', description: '현재 반영된 인정 활동시간 기준을 충족했습니다.', className: styles.activityStatusMet }
          : { label: '추가 확인 필요', description: `현재 반영된 시간 기준은 ${remainingActivityHours}시간 남았습니다.`, className: '' };
      default:
        return { label: '대상 아님', description: '현재 회원 상태는 활동 기준 판정 대상이 아닙니다.', className: styles.activityStatusNotApplicable };
    }
  })();
  const activityReasonItems = [
    { label: '세미나', hours: activitySummary.seminarStudyHours ?? 0, color: '#47be9b' },
    { label: '공식 활동', hours: activitySummary.officialActivityHours ?? 0, color: '#ffd43b' },
    { label: '프로젝트', hours: activitySummary.projectHours ?? 0, color: '#ff922b' },
  ];
  const formatHours = (hours: number) => (Number.isInteger(hours) ? `${hours}` : hours.toFixed(1));
  const toDetailItems = (items: MyActivityDetailResponse[] = []) =>
    items.map((item) => ({
      id: item.activityId ?? item.title ?? 'unknown-activity',
      title: item.title ?? '이름 없는 활동',
      hours: item.recognizedHours ?? 0,
      hosted: item.hosted ?? false,
    }));
  const activityDetailSections = [
    {
      title: '세미나/스터디',
      items: toDetailItems(activitySummary.seminarStudyActivities),
    },
    {
      title: '공식 활동',
      items: toDetailItems(activitySummary.officialActivities),
    },
    {
      title: '프로젝트',
      items: toDetailItems(activitySummary.projectActivities),
    },
  ];

  return (
    <Space direction="vertical" className={cx(styles.fullWidth, styles.pageContent)} size={32}>
      <section className={styles.profileHeader} aria-labelledby="my-profile-title">
        <Space className={styles.wrapper} size="middle">
          <Avatar size={80} src={getProfileImageUrl(me.profileImageURL)} />
          <Space direction="vertical">
            <Space>
              <Typography.Text id="my-profile-title" className={styles.userName}>
                {me.name}님
              </Typography.Text>
            </Space>
            <Typography.Text>{me.introduction}</Typography.Text>
          </Space>
        </Space>
        <div className={styles.activityProgress}>
          <div className={styles.activityProgressMeta}>
            <div className={styles.activityStatusGroup}>
              <Typography.Text className={styles.activityProgressLabel}>활동 기준</Typography.Text>
              <Typography.Text
                className={cx(styles.activityStatusBadge, {
                  [activityDecision.className]: Boolean(activityDecision.className),
                })}
              >
                {activityDecision.label}
              </Typography.Text>
            </div>
            {activityExemptionLabel ? (
              <Typography.Text className={styles.activityExemptionValue}>{activityExemptionLabel}</Typography.Text>
            ) : (
              <Typography.Text className={styles.activityProgressValue}>
                {displayedActivityHours}
                <span> / {activityMinimumHour}시간</span>
              </Typography.Text>
            )}
          </div>
          <div
            className={styles.activityProgressTrack}
            aria-label={activityExemptionLabel ?? `인정 활동시간 ${displayedActivityHours} / ${activityMinimumHour}시간`}
          >
            {activityExemptionLabel ? (
              <span style={{ width: '100%', backgroundColor: activityReasonItems[0].color }} />
            ) : (
              activityReasonItems.map((item) => (
                <Tooltip key={item.label} title={`${item.label} ${item.hours}시간`}>
                  <span
                    style={{
                      width: `${Math.min((item.hours / activityMinimumHour) * 100, 100)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </Tooltip>
              ))
            )}
          </div>
          {activityExemptionLabel && <Typography.Text className={styles.activityExemptionDescription}>활동 시간 계산 제외</Typography.Text>}
        </div>
      </section>
      <div className={styles.activityDetailGrid}>
        {activityDetailSections.map((section) => {
          const totalHours = section.items.reduce((total, item) => total + item.hours, 0);
          const isExpanded = expandedActivitySections[section.title] ?? false;
          const visibleItems = isExpanded ? section.items : section.items.slice(0, 5);

          return (
            <section className={styles.activityDetailSection} key={section.title} aria-labelledby={`activity-detail-${section.title}`}>
              <div className={styles.activityDetailHeader}>
                <Typography.Title id={`activity-detail-${section.title}`} level={5} className={styles.activityDetailTitle}>
                  {section.title}
                </Typography.Title>
                {section.items.length > 0 && <Typography.Text className={styles.activityDetailHours}>누적 {formatHours(totalHours)}시간</Typography.Text>}
              </div>
              {section.items.length > 0 ? (
                <div className={styles.activityDetailList}>
                  {visibleItems.map((item) => (
                    <div className={styles.activityDetailItem} key={item.id}>
                      <div className={styles.activityDetailItemContent}>
                        <Typography.Text className={styles.activityDetailItemTitle}>{item.title}</Typography.Text>
                        {item.hosted && <Typography.Text className={styles.activityDetailHost}>주최</Typography.Text>}
                      </div>
                      <Typography.Text className={styles.activityDetailItemHours}>인정 {formatHours(item.hours)}시간</Typography.Text>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className={styles.activityDetailEmptyList}>
                  <EmptyState>반영된 활동이 없습니다.</EmptyState>
                </ul>
              )}
              {section.items.length > 5 && (
                <Button
                  block
                  size="small"
                  className={styles.activityDetailToggle}
                  icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                  onClick={() =>
                    setExpandedActivitySections((current) => ({
                      ...current,
                      [section.title]: !isExpanded,
                    }))
                  }
                >
                  {isExpanded ? '접기' : `${section.items.length - 5}개 더 보기`}
                </Button>
              )}
            </section>
          );
        })}
      </div>
      <Space direction="vertical" size={0} className={styles.wrapper}>
        <Typography.Title level={5}>나의 메뉴</Typography.Title>
        <List
          size="large"
          className={cx(styles.fullWidth, styles.menuList)}
          bordered={false}
          dataSource={listData}
          renderItem={(item) =>
            item.link ? (
              <List.Item onClick={item.onClick}>
                <Link to={item.link} className={styles.link}>
                  <div className={styles.linkInner}>
                    {item.icon}
                    <Typography.Text>{item.title}</Typography.Text>
                  </div>
                  <ArrowRightOutlined className={styles.menuArrow} />
                </Link>
              </List.Item>
            ) : (
              <List.Item onClick={item.onClick} className={styles.link}>
                <div className={styles.linkInner}>
                  {item.icon}
                  <Typography.Text>{item.title}</Typography.Text>
                </div>
                <ArrowRightOutlined className={styles.menuArrow} />
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
  pageContent: css`
    max-width: 1180px;
    margin: 0 auto;
  `,
  profileHeader: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 440px);
    align-items: center;
    gap: 64px;

    @media (max-width: 768px) {
      align-items: flex-start;
      grid-template-columns: 1fr;
      gap: 24px;
    }
  `,
  activitySummaryHeader: css`
    .ant-typography {
      margin-bottom: 16px;
    }
  `,
  activityContent: css`
    margin: 0 auto;
  `,
  activityOverview: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 440px);
    align-items: center;
    gap: 64px;
    padding: 16px 0 32px;
    border-bottom: 1px solid #e9ecef;

    @media (max-width: 768px) {
      align-items: flex-start;
      grid-template-columns: 1fr;
      gap: 28px;
    }
  `,
  activityOverviewStatus: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
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
    color: #343a40;
    font-size: 14px;
    line-height: 1.6;
  `,
  activityProgress: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  activityProgressMeta: css`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  `,
  activityStatusGroup: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
  `,
  activityProgressLabel: css`
    color: #6c757d;
    font-size: 12px;
    font-weight: 600;
  `,
  activityProgressValue: css`
    color: #2f9d7e;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;

    span {
      color: #868e96;
      font-size: 12px;
      font-weight: 500;
    }
  `,
  activityProgressTrack: css`
    overflow: hidden;
    display: flex;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #e9f7f2;

    span {
      display: block;
      height: 100%;
      background: #47be9b;
      border-radius: inherit;
      transition: width 0.2s ease;
    }
  `,
  activityExemptionValue: css`
    color: #2f9d7e;
    font-size: 16px;
    font-weight: 700;
  `,
  activityExemptionDescription: css`
    color: #868e96;
    font-size: 12px;
    text-align: right;
  `,
  activityDetailGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    width: 100%;
    align-items: stretch;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  `,
  activityDetailSection: css`
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 20px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: #fff;
  `,
  activityDetailHeader: css`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  `,
  activityDetailTitle: css`
    margin: 0 0 14px !important;
  `,
  activityDetailHours: css`
    color: #3ba886;
    font-size: 13px;
    font-weight: 700;
  `,
  activityDetailList: css`
    display: flex;
    flex-direction: column;
  `,
  activityDetailItem: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 48px;
    border-top: 1px solid #f1f3f5;

    @media (max-width: 600px) {
      align-items: flex-start;
      flex-direction: column;
      gap: 4px;
      padding: 10px 0;
    }
  `,
  activityDetailItemContent: css`
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 8px;
  `,
  activityDetailItemTitle: css`
    overflow: hidden;
    color: #343a40;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 600px) {
      white-space: normal;
    }
  `,
  activityDetailHost: css`
    padding: 2px 6px;
    border-radius: 4px;
    background: #e6fcf5;
    color: #2f9d7e;
    font-size: 11px;
    font-weight: 600;
  `,
  activityDetailItemHours: css`
    flex: none;
    color: #6c757d;
    font-size: 12px;
    font-weight: 600;
  `,
  activityDetailEmptyList: css`
    margin: 0;
    padding: 0;
    border-top: 1px solid #f1f3f5;
    flex: 1;
    display: flex;

    li {
      flex: 1;
      min-height: 160px;
    }
  `,
  activityDetailToggle: css`
    margin-top: 10px;
    border-color: #b7e7d7;
    color: #2f9d7e;
    font-weight: 600;

    &:hover {
      border-color: #47be9b;
      color: #208469;
    }
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
    gap: 16px;

    .anticon {
      color: #47be9b;
    }
  `,
  userName: css`
    font-size: 24px;
    font-weight: 700;
  `,
  menuList: css`
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;

    .ant-list-item {
      min-height: 56px;
      padding: 0 12px;
    }
  `,
  menuArrow: css`
    color: #47be9b;
    font-size: 16px;
  `,
}));
