import { Avatar, Button, Empty, List, Modal, Select, Space, Switch, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppstoreOutlined, ArrowRightOutlined, DownOutlined, EditOutlined, MessageOutlined, StarOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';
import { MemberControllerService, MyActivityDetailResponse, MyActivitySummaryResponse, queryKey, useAppSuspenseQueries } from '~/lib/api-v2';
import { MENU } from '~/constants/menus';
import { MEMBER_ROLE } from '~/constants/memberRoles';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import pokedexDeviceImage from '~/assets/images/pokedex-device.webp';
import pokeballImage from '~/assets/images/pokeball.png';
import * as gameAPI from '~/lib/api/gamification';
import { loadUser } from '~/modules/auth';
import { useMessage } from '~/hooks/useMessage';
import { media } from '~/styles/responsive';

type GameSummary = {
  ballBalances: { normal: number };
  totalCatalogCount: number;
  shinyCatalogCount: number;
  normalCatalogCount: number;
  shinyDrawStatus: 'AVAILABLE' | 'NEEDS_NORMAL' | 'COMPLETE';
};

type FeaturedCollectible = {
  collectibleId: number;
  externalId: number;
  name: string;
  spriteUrl?: string;
  shinySpriteUrl?: string;
  shiny: boolean;
  useAsProfile: boolean;
};

type OwnedCollectible = {
  collectibleId: number;
  externalId: number;
  name: string;
  spriteUrl?: string;
  shinySpriteUrl?: string;
  ownedCount: number;
  normalOwnedCount: number;
  shinyCount: number;
};

const shinyCatalogImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png';

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
  const dispatch = useDispatch();
  const message = useMessage();
  const [expandedActivitySections, setExpandedActivitySections] = useState<Record<string, boolean>>({});
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);
  const [featuredCollectible, setFeaturedCollectible] = useState<FeaturedCollectible | null>(null);
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);
  const [ownedCollectibles, setOwnedCollectibles] = useState<OwnedCollectible[]>([]);
  const [selectedCollectibleId, setSelectedCollectibleId] = useState<number | undefined>();
  const [selectedShiny, setSelectedShiny] = useState(false);
  const [savingFeatured, setSavingFeatured] = useState(false);

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
      title: '포켓몬 도감',
      icon: <AppstoreOutlined size={24} />,
      link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_COLLECTION}`,
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

  useEffect(() => {
    let active = true;

    gameAPI.getGameSummary()
      .then((response) => {
        if (active) setGameSummary(response.data);
      })
      .catch(() => {});

    gameAPI.getFeaturedCollectible()
      .then((response) => {
        if (active) setFeaturedCollectible(response.status === 204 ? null : response.data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const openFeaturedModal = async () => {
    try {
      const response = await gameAPI.getCollection();
      const owned = response.data.filter((item: OwnedCollectible) => item.ownedCount > 0 || item.shinyCount > 0);
      setOwnedCollectibles(owned);
      setSelectedCollectibleId(featuredCollectible?.collectibleId);
      setSelectedShiny(featuredCollectible?.shiny ?? false);
      setFeaturedModalOpen(true);
    } catch {
      message.error('보유 포켓몬을 불러오지 못했습니다.');
    }
  };

  const saveFeaturedCollectible = async () => {
    if (!selectedCollectibleId) return;
    setSavingFeatured(true);
    try {
      const response = await gameAPI.updateFeaturedCollectible({ collectibleId: selectedCollectibleId, shiny: selectedShiny });
      setFeaturedCollectible(response.data);
      setFeaturedModalOpen(false);
      dispatch(loadUser());
      message.success('대표 포켓몬을 지정했습니다.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      message.error(errorMessage && errorMessage !== 'No message available' ? errorMessage : '대표 포켓몬을 지정하지 못했습니다.');
    } finally {
      setSavingFeatured(false);
    }
  };

  const clearFeaturedCollectible = async () => {
    setSavingFeatured(true);
    try {
      await gameAPI.clearFeaturedCollectible();
      setFeaturedCollectible(null);
      setFeaturedModalOpen(false);
      dispatch(loadUser());
      message.success('대표 포켓몬을 해제했습니다.');
    } catch {
      message.error('대표 포켓몬을 해제하지 못했습니다.');
    } finally {
      setSavingFeatured(false);
    }
  };

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
    { label: '프로젝트', hours: activitySummary.projectHours ?? 0, color: '#ff922b' },
    { label: '기타', hours: activitySummary.officialActivityHours ?? 0, color: '#ffd43b' },
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
      title: '프로젝트',
      items: toDetailItems(activitySummary.projectActivities),
    },
    {
      title: '기타',
      items: toDetailItems(activitySummary.officialActivities),
    },
  ];
  const collectedCount = gameSummary?.normalCatalogCount ?? 0;
  const totalCatalogCount = gameSummary?.totalCatalogCount ?? 0;
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
        {activityExemptionLabel ? (
          <div className={styles.activityExemptionSummary}>
            <Typography.Text className={styles.activityProgressLabel}>활동 기준</Typography.Text>
            <Typography.Text className={styles.activityExemptionValue}>{activityExemptionLabel}</Typography.Text>
          </div>
        ) : (
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
              <Typography.Text className={styles.activityProgressValue}>
                {displayedActivityHours}
                <span> / {activityMinimumHour}시간</span>
              </Typography.Text>
            </div>
            <div className={styles.activityProgressTrack} aria-label={`활동시간 ${displayedActivityHours} / ${activityMinimumHour}시간`}>
              {activityReasonItems.map((item) => (
                <Tooltip key={item.label} title={`${item.label} ${item.hours}시간`}>
                  <span
                    style={{
                      width: `${Math.min((item.hours / activityMinimumHour) * 100, 100)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        )}
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
                {section.items.length > 0 && <Typography.Text className={styles.activityDetailHours}>총 {formatHours(totalHours)}시간</Typography.Text>}
              </div>
              {section.items.length > 0 ? (
                <div className={styles.activityDetailList}>
                  {visibleItems.map((item) => (
                    <div className={styles.activityDetailItem} key={item.id}>
                      <div className={styles.activityDetailItemContent}>
                        <Typography.Text className={styles.activityDetailItemTitle}>{item.title}</Typography.Text>
                        {item.hosted && <Typography.Text className={styles.activityDetailHost}>주최</Typography.Text>}
                      </div>
                      <Typography.Text className={styles.activityDetailItemHours}>{formatHours(item.hours)}시간</Typography.Text>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className={styles.activityDetailEmptyList}>
                  <li><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="반영된 활동이 없습니다." /></li>
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
      <section className={styles.collectionOverview} aria-labelledby="my-collection-title">
        <div className={styles.collectionOverviewHeader}>
          <div>
            <Typography.Title id="my-collection-title" level={5} className={styles.collectionOverviewTitle}>포켓몬 도감</Typography.Title>
          </div>
          <Link to={`/${MENU.MY_PAGE}/${MENU.MY_PAGE_COLLECTION}`} className={styles.collectionLink}>도감 보기 <ArrowRightOutlined /></Link>
        </div>
        <div className={styles.collectionOverviewBody}>
          <div className={styles.collectionStats}>
            <div className={cx(styles.collectionStat, styles.collectionStatPrimary)}>
              <img className={cx(styles.collectionStatVisual, styles.collectionStatVisualPokedex)} src={pokedexDeviceImage} alt="포켓몬 도감" />
              <strong>{collectedCount} <span>/ {totalCatalogCount}종</span></strong>
              <Typography.Text>도감 완성</Typography.Text>
            </div>
            <div className={styles.collectionStat}>
              <img className={cx(styles.collectionStatVisual, styles.collectionStatVisualShiny)} src={shinyCatalogImage} alt="이로치 피카츄" />
              <strong>{gameSummary?.shinyCatalogCount ?? 0}종</strong>
              <Typography.Text>이로치</Typography.Text>
            </div>
            <div className={styles.collectionStat}>
              <img className={cx(styles.collectionStatVisual, styles.collectionStatVisualPokeball)} src={pokeballImage} alt="일반 포켓볼" />
              <strong>{gameSummary?.ballBalances?.normal ?? 0}개</strong>
              <Typography.Text>포켓볼</Typography.Text>
            </div>
          </div>
          <div className={styles.featuredCollectible}>
            <Typography.Text className={styles.featuredCollectibleLabel}>대표 포켓몬</Typography.Text>
            {featuredCollectible ? (
              <div className={styles.featuredCollectibleContent}>
                <div className={styles.featuredCollectibleIdentity}>
                  <img src={featuredCollectible.shiny ? (featuredCollectible.shinySpriteUrl ?? featuredCollectible.spriteUrl) : featuredCollectible.spriteUrl} alt={featuredCollectible.name} />
                  <div><strong>{featuredCollectible.name}</strong><span>No.{String(featuredCollectible.externalId).padStart(3, '0')}</span></div>
                  <Button type="text" className={styles.featuredCollectibleChange} onClick={openFeaturedModal}>변경</Button>
                </div>
              </div>
            ) : <div className={styles.featuredCollectibleEmpty}><Typography.Text>대표 포켓몬을 지정해 보세요.</Typography.Text><Button type="link" onClick={openFeaturedModal}>지정</Button></div>}
          </div>
        </div>
      </section>
      <Modal
        title="대표 포켓몬 지정"
        open={featuredModalOpen}
        onCancel={() => setFeaturedModalOpen(false)}
        onOk={saveFeaturedCollectible}
        okText="지정"
        cancelText="취소"
        confirmLoading={savingFeatured}
        okButtonProps={{ disabled: !selectedCollectibleId }}
        footer={(_, { OkBtn, CancelBtn }) => <div className={styles.featuredModalFooter}>{featuredCollectible && <Button danger type="text" loading={savingFeatured} onClick={clearFeaturedCollectible}>대표 해제</Button>}<div><CancelBtn /><OkBtn /></div></div>}
      >
        <div className={styles.featuredModalBody}>
          <label>포켓몬
            <Select
              showSearch
              value={selectedCollectibleId}
              placeholder="보유한 포켓몬 선택"
              optionFilterProp="label"
              onChange={(value) => {
                const selected = ownedCollectibles.find((item) => item.collectibleId === value);
                setSelectedCollectibleId(value);
                setSelectedShiny((selected?.normalOwnedCount ?? 0) === 0);
              }}
              options={ownedCollectibles.map((item) => ({ value: item.collectibleId, label: `No.${String(item.externalId).padStart(3, '0')} ${item.name}` }))}
            />
          </label>
          {(() => {
            const selected = ownedCollectibles.find((item) => item.collectibleId === selectedCollectibleId);
            return selected?.shinyCount ? <label className={styles.shinyOption}><Switch size="small" checked={selectedShiny} disabled={selected.normalOwnedCount === 0} onChange={setSelectedShiny} /> 이로치로 지정</label> : null;
          })()}
        </div>
      </Modal>
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

    ${media.mobile} {
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

    ${media.mobile} {
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

    ${media.mobile} {
      width: 100%;
    }
  `,
  activityExemptionSummary: css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #e9f7f2;
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
  activityDetailGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    width: 100%;
    align-items: stretch;

    ${media.belowWide} {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  `,
  collectionOverview: css`
    width: 100%;
    padding: 20px;
    border: 1px solid #e5eeeb;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
  `,
  collectionOverviewHeader: css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;

    ${media.mobile} {
      margin-bottom: 24px;
    }
  `,
  collectionOverviewTitle: css`
    margin: 0 0 4px !important;
  `,
  collectionLink: css`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 44px;
    padding: 0 8px;
    color: #2f9d7e;
    font-size: 0.85rem;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
  `,
  collectionOverviewBody: css`
    display: grid;
    grid-template-columns: minmax(0, .85fr) minmax(360px, 1.15fr);
    gap: 24px;

    ${media.tablet} {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    ${media.compact} {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    ${media.phone} {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  `,
  collectionStats: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    ${media.phone} {
      display: flex;
      flex-direction: column;
      gap: 0;
      border-top: 1px solid #e5eeeb;
    }
  `,
  collectionStat: css`
    display: flex;
    min-width: 0;
    aspect-ratio: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 12px;
    border: 1px solid #e5eeeb;
    border-radius: 6px;
    background: #fff;
    box-sizing: border-box;
    > strong { color: #4c735f; font-size: 1rem; line-height: 1.25; white-space: nowrap; }
    > strong span { color: #7b847f; font-size: 0.78rem; font-weight: 600; }
    .ant-typography { color: #7b847f; font-size: 0.74rem; }

    ${media.tablet} {
      min-height: 148px;
    }

    ${media.compact} {
      min-height: 132px;
      padding: 10px 8px;

      > strong { font-size: 0.96rem; }
      > strong span { font-size: 0.7rem; }
      .ant-typography { font-size: 0.7rem; }
    }

    ${media.phone} {
      display: grid;
      min-height: 76px;
      grid-template-columns: 56px minmax(0, 1fr);
      grid-template-rows: auto auto auto;
      align-items: center;
      justify-content: initial;
      gap: 5px 12px;
      padding: 10px 0;
      border: 0;
      border-bottom: 1px solid #e5eeeb;
      border-radius: 0;
      background: transparent;
      aspect-ratio: auto;

      > strong {
        grid-column: 2;
        grid-row: 1;
        font-size: 1.08rem;
        text-align: left;
      }

      > strong span {
        font-size: 0.72rem;
      }

      .ant-typography {
        grid-column: 2;
        grid-row: 2;
        font-size: 0.78rem;
        text-align: left;
      }
    }
  `,
  collectionStatPrimary: css`
    border-color: #91d9c4;
    background: #f1fbf8;

    > strong { color: #249b78; font-size: 1.28rem; }

    ${media.compact} {
      > strong { font-size: 1.12rem; }
    }

    ${media.phone} {
      border-color: transparent;
      background: transparent;
    }
  `,
  collectionStatVisual: css`
    width: clamp(42px, 5vw, 66px);
    height: clamp(42px, 5vw, 66px);
    margin-bottom: 6px;
    object-fit: contain;

    ${media.tablet} {
      width: 60px;
      height: 60px;
    }

    ${media.compact} {
      width: 46px;
      height: 46px;
      margin-bottom: 4px;
    }

    ${media.phone} {
      grid-column: 1;
      grid-row: 1 / span 3;
      width: 56px;
      height: 56px;
      margin: 0;
    }
  `,
  collectionStatVisualPokedex: css`
    transform: scale(0.95);
  `,
  collectionStatVisualShiny: css`
    transform: scale(1.08);
  `,
  collectionStatVisualPokeball: css`
    transform: scale(0.9);
  `,
  featuredCollectible: css`
    min-width: 0;
    padding: 10px 0 10px 24px;
    border-left: 1px solid #e5eeeb;

    ${media.tablet} {
      padding: 16px 0 0;
      border-top: 1px solid #e5eeeb;
      border-left: 0;
    }

    ${media.compact} {
      padding: 16px 0 0;
      border-top: 1px solid #e5eeeb;
      border-left: 0;
    }

    ${media.phone} {
      padding: 0;
      border-left: 0;
    }
  `,
  featuredCollectibleLabel: css`
    display: block;
    margin-bottom: 8px;
    color: #7b847f;
    font-size: 0.74rem;
    font-weight: 700;

    ${media.phone} {
      display: none;
    }
  `,
  featuredCollectibleContent: css`
    display: flex;
    min-height: 100px;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 8px;
    padding: 0;

    ${media.phone} {
      display: grid;
      min-height: 76px;
      grid-template-columns: 56px minmax(0, 1fr) auto;
      grid-template-rows: auto auto;
      align-items: center;
      justify-content: initial;
      gap: 5px 12px;
      padding: 16px 0 10px;
    }
  `,
  featuredCollectibleIdentity: css`
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 10px;

    img { width: 82px; height: 74px; flex: 0 0 82px; object-fit: contain; transform: scale(1.12); }
    > div { display: flex; min-width: 0; align-items: baseline; gap: 6px; }
    strong { overflow: hidden; color: #4c3722; font-size: 0.92rem; text-overflow: ellipsis; white-space: nowrap; }
    span { flex: none; color: #7b847f; font-size: 0.74rem; font-weight: 700; }

    ${media.phone} {
      display: contents;

      img {
        grid-column: 1;
        grid-row: 1 / span 2;
        width: 56px;
        height: 56px;
      }

      > div {
        grid-column: 2;
        grid-row: 1 / span 2;
      }
    }
  `,
  featuredCollectibleChange: css`
    min-height: 36px;
    padding: 0 8px;
    border-radius: 6px;
    background: #f1fbf8;
    color: #16896d;
    font-size: 0.8rem;
    font-weight: 700;

    ${media.phone} {
      grid-column: 3;
      grid-row: 1;
      align-self: center;
      min-height: 36px;
    }
  `,
  featuredCollectibleEmpty: css`
    display: flex;
    min-height: 84px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0;

    .ant-typography { color: #7b847f; font-size: 0.78rem; }
    .ant-btn { padding: 0; font-size: 0.78rem; }
  `,
  featuredModalBody: css`
    display: flex;
    flex-direction: column;
    gap: 16px;

    > label { display: flex; flex-direction: column; gap: 7px; color: #4c3722; font-size: 0.85rem; font-weight: 700; }
  `,
  shinyOption: css`
    flex-direction: row !important;
    align-items: center;
    color: #6d5b2d !important;
  `,
  featuredModalFooter: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  recentDraws: css`
    min-width: 0;
  `,
  recentDrawsLabel: css`
    display: block;
    margin-bottom: 8px;
    color: #7b847f;
    font-size: 0.74rem;
    font-weight: 700;
  `,
  recentDrawList: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  `,
  recentDraw: css`
    position: relative;
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 6px;
    border: 1px solid transparent;
    border-radius: 5px;
    background: #fafcfb;

    img, > div { width: 48px; height: 48px; object-fit: contain; }
    .ant-typography { width: 100%; overflow: hidden; color: #4c3722; font-size: 0.72rem; font-weight: 700; text-align: center; text-overflow: ellipsis; white-space: nowrap; }
  `,
  latestDraw: css`
    border-color: #9edbc9;
    background: #f4fbf8;
  `,
  latestDrawLabel: css`
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 2px 4px;
    border-radius: 3px;
    background: #dff5ed;
    color: #249b78;
    font-size: 0.62rem;
    font-weight: 800;
    line-height: 1;
  `,
  recentDrawFallback: css`
    border-radius: 50%;
    background: #edf0ef;
  `,
  recentDrawEmpty: css`
    display: block;
    padding: 24px 12px;
    border: 1px solid #e5eeeb;
    border-radius: 5px;
    color: #7b847f;
    font-size: 0.78rem;
    text-align: center;
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

    ${media.mobile} {
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

    ${media.mobile} {
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
      display: flex;
      flex: 1;
      min-height: 160px;
      align-items: center;
      justify-content: center;
    }

    ${media.mobile} {
      flex: none;

      li {
        min-height: 84px;
      }
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
