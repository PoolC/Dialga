import { FilterOutlined, StarFilled } from '@ant-design/icons';
import { Button, Empty, Popover, Select, Spin, Tooltip, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import CollectibleDetailModal, { type CollectibleDetail } from '~/components/my-page/CollectibleDetailModal/CollectibleDetailModal';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import { useMessage } from '~/hooks/useMessage';
import * as gameAPI from '~/lib/api/gamification';
import pokeballImage from '~/assets/images/pokeball.png';
import { media } from '~/styles/responsive';

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

type Summary = {
  ballBalances: BallBalances;
  totalCatalogCount: number;
  shinyCatalogCount: number;
  normalCatalogCount: number;
  shinyDrawStatus: 'AVAILABLE' | 'NEEDS_NORMAL' | 'COMPLETE';
};

type BallBalances = { normal: number };

type CollectionItem = {
  collectibleId: number;
  externalId: number;
  name: string;
  generation: number;
  types: string;
  rarity: Rarity;
  spriteUrl?: string;
  shinySpriteUrl?: string;
  category?: string;
  description?: string;
  heightDecimeters?: number;
  weightHectograms?: number;
  abilities?: string;
  hp?: number;
  attack?: number;
  defense?: number;
  specialAttack?: number;
  specialDefense?: number;
  speed?: number;
  ownedCount: number;
  normalOwnedCount: number;
  shinyCount: number;
};

type DrawResult = {
  drawId: number;
  collectibleId: number;
  name: string;
  spriteUrl?: string;
  shinySpriteUrl?: string;
  rarity: Rarity;
  shiny: boolean;
  drawnAt: string;
  ballBalances?: BallBalances;
  externalId?: number;
  ownedCount?: number;
  isNewCollectible?: boolean;
  category?: string;
  description?: string;
  heightDecimeters?: number;
  weightHectograms?: number;
  abilities?: string;
  hp?: number;
  attack?: number;
  defense?: number;
  specialAttack?: number;
  specialDefense?: number;
  speed?: number;
};

type DetailModalState = {
  collectible: CollectibleDetail;
  title?: string;
  description?: string;
};

type CollectionView = 'ALL' | 'OWNED';

type CollectionCardProps = {
  item: CollectionItem;
  onOpen: (item: CollectionItem) => void;
  cardClassName: string;
  unownedClassName: string;
  shinyCardClassName: string;
  clickableCardClassName: string;
  shinyBadgeClassName: string;
  shinyPreviewClassName: string;
  spriteClassName: string;
  spriteFallbackClassName: string;
  cardMetaClassName: string;
  numberClassName: string;
  cardNameClassName: string;
};

const rarityLabel: Record<Rarity, string> = {
  COMMON: '일반',
  RARE: '레어',
  EPIC: '에픽',
  LEGENDARY: '전설',
};

const rarityColor: Record<Rarity, string> = {
  COMMON: '#6c757d',
  RARE: '#3b82c4',
  EPIC: '#9c5cc6',
  LEGENDARY: '#d59a12',
};

const CollectionCard = memo(({
  item,
  onOpen,
  cardClassName,
  unownedClassName,
  shinyCardClassName,
  clickableCardClassName,
  shinyBadgeClassName,
  shinyPreviewClassName,
  spriteClassName,
  spriteFallbackClassName,
  cardMetaClassName,
  numberClassName,
  cardNameClassName,
}: CollectionCardProps) => {
  const openCollectible = () => onOpen(item);
  const canOpen = item.normalOwnedCount > 0;

  return (
    <article
      className={[cardClassName, !canOpen && unownedClassName, item.shinyCount > 0 && shinyCardClassName, canOpen && clickableCardClassName].filter(Boolean).join(' ')}
      onClick={canOpen ? openCollectible : undefined}
      onKeyDown={canOpen ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCollectible();
        }
      } : undefined}
      role={canOpen ? 'button' : undefined}
      tabIndex={canOpen ? 0 : undefined}
    >
      {item.shinyCount > 0 && <span className={shinyBadgeClassName}><StarFilled /> 이로치</span>}
      {item.shinyCount > 0 && item.shinySpriteUrl && <img src={item.shinySpriteUrl} alt="" aria-hidden="true" className={shinyPreviewClassName} loading="lazy" />}
      {item.spriteUrl ? <img src={item.spriteUrl} alt={canOpen ? item.name : '미획득'} className={spriteClassName} loading="lazy" /> : <div className={spriteFallbackClassName} />}
      <div className={cardMetaClassName}>
        <Typography.Text className={numberClassName} style={{ color: canOpen ? rarityColor[item.rarity] : undefined }}>No.{String(item.externalId).padStart(3, '0')}</Typography.Text>
        <Typography.Text className={cardNameClassName}>{canOpen ? item.name : '????'}</Typography.Text>
      </div>
    </article>
  );
});

export default function MyPageCollectionPage() {
  const { styles, cx } = useStyles();
  const message = useMessage();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [draws, setDraws] = useState<DrawResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState<'NORMAL' | 'SHINY' | null>(null);
  const [generation, setGeneration] = useState<number | 'ALL'>('ALL');
  const [rarity, setRarity] = useState<Rarity | 'ALL'>('ALL');
  const [ownership, setOwnership] = useState<CollectionView>('ALL');
  const [detailModal, setDetailModal] = useState<DetailModalState | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [summaryResponse, collectionResponse, drawsResponse] = await Promise.all([gameAPI.getGameSummary(), gameAPI.getCollection(), gameAPI.getDrawHistory()]);
      setSummary(summaryResponse.data);
      setCollection(collectionResponse.data);
      setDraws(drawsResponse.data);
    } catch {
      message.error('도감 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const generations = useMemo(() => [...new Set(collection.map((item) => item.generation))].sort((a, b) => a - b), [collection]);
  const visibleCollection = useMemo(
    () => collection.filter((item) => (
      (generation === 'ALL' || item.generation === generation)
      && (rarity === 'ALL' || item.rarity === rarity)
      && (ownership === 'ALL' || item.normalOwnedCount > 0)
    )),
    [collection, generation, ownership, rarity],
  );

  const collectedCount = summary?.normalCatalogCount ?? 0;
  const totalCatalogCount = summary?.totalCatalogCount ?? 0;
  const ballCount = summary?.ballBalances?.normal ?? 0;
  const normalDrawUnavailable = totalCatalogCount > 0 && collectedCount >= totalCatalogCount;
  const shinyDrawStatus = summary?.shinyDrawStatus ?? 'NEEDS_NORMAL';
  const shinyDrawGuide = shinyDrawStatus === 'NEEDS_NORMAL'
    ? '일반 포켓몬을 먼저 획득하면 이로치 뽑기를 이용할 수 있습니다.'
    : null;
  const shinyDrawUnavailable = shinyDrawStatus !== 'AVAILABLE';
  const shinyComplete = shinyDrawStatus === 'COMPLETE';
  const openCollectionItem = useCallback((item: CollectionItem) => {
    setDetailModal({
      collectible: {
        ...item,
        shiny: false,
        shinyOwned: item.shinyCount > 0,
        shinyOwnedCount: item.shinyCount,
      },
    });
  }, []);
  const handleDraw = async (shiny: boolean) => {
    setDrawing(shiny ? 'SHINY' : 'NORMAL');
    try {
      const response = await gameAPI.drawCollectible({ shiny });
      const draw = response.data as DrawResult;
      const previousCollection = collection.find((item) => item.collectibleId === draw.collectibleId);
      const isNewVariant = draw.shiny
        ? !previousCollection || previousCollection.shinyCount === 0
        : !previousCollection || previousCollection.normalOwnedCount === 0;
      const preparedDraw = {
        ...draw,
        externalId: draw.externalId ?? previousCollection?.externalId,
        ownedCount: (previousCollection?.ownedCount ?? 0) + 1,
        normalOwnedCount: (previousCollection?.normalOwnedCount ?? 0) + (draw.shiny ? 0 : 1),
        shinyOwnedCount: (previousCollection?.shinyCount ?? 0) + (draw.shiny ? 1 : 0),
        shinyOwned: draw.shiny || (previousCollection?.shinyCount ?? 0) > 0,
      };

      setDetailModal({
        collectible: preparedDraw,
        title: isNewVariant ? draw.shiny ? '이로치 포켓몬 획득!' : '새 포켓몬 획득!' : '이미 수집한 포켓몬이에요',
        description: isNewVariant
          ? `No.${String(preparedDraw.externalId ?? 0).padStart(3, '0')} ${draw.shiny ? '이로치' : '일반'} 도감에 새로 등록되었습니다.`
          : `현재 보유 ${preparedDraw.ownedCount}마리`,
      });
      setSummary((current) => current && {
        ...current,
        ballBalances: draw.ballBalances ?? current.ballBalances,
        shinyCatalogCount: current.shinyCatalogCount + (draw.shiny && isNewVariant ? 1 : 0),
        normalCatalogCount: current.normalCatalogCount + (!draw.shiny && isNewVariant ? 1 : 0),
        shinyDrawStatus: draw.shiny
          ? (isNewVariant && current.normalCatalogCount === current.shinyCatalogCount + 1 ? 'COMPLETE' : current.shinyDrawStatus)
          : 'AVAILABLE',
      });
      setCollection((current) => current.map((item) => item.collectibleId === draw.collectibleId
        ? draw.shiny
          ? { ...item, ownedCount: item.ownedCount + 1, shinyCount: item.shinyCount + 1 }
          : { ...item, ownedCount: item.ownedCount + 1, normalOwnedCount: item.normalOwnedCount + 1 }
        : item));
      setDraws((current) => [draw, ...current]);
    } catch (error: any) {
      message.error(error.response?.data?.message ?? '뽑기에 실패했습니다.');
    } finally {
      setDrawing(null);
    }
  };

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <PageContent className={styles.content}>
          <PageHeader
            className={styles.collectionHeader}
            title={
              <span className={styles.catalogTitle}>
                <span>포켓몬 도감</span>
                <span className={styles.catalogMetrics}>
                  <span><strong>{collectedCount} / {totalCatalogCount}종</strong></span>
                </span>
              </span>
            }
            actions={
              <div className={styles.drawPanel}>
                <div className={styles.drawAction}>
                  <span className={styles.ballBalance} aria-label={`포켓볼 ${ballCount}개 보유`}><img src={pokeballImage} alt="" aria-hidden="true" /><strong>{ballCount}</strong></span>
                  <div className={styles.drawButtons} aria-describedby={shinyDrawGuide ? 'shiny-draw-guide' : undefined}>
                    <Tooltip title={normalDrawUnavailable ? '일반 도감을 모두 완성했습니다.' : '포켓볼 1개로 일반 포켓몬 뽑기'}><Button aria-label={normalDrawUnavailable ? '일반 도감을 모두 완성했습니다.' : '포켓볼 1개로 일반 포켓몬 뽑기'} className={styles.drawButton} type="primary" loading={drawing === 'NORMAL'} disabled={!summary || drawing !== null || normalDrawUnavailable || ballCount < 1} onClick={() => handleDraw(false)}><img src={pokeballImage} alt="" aria-hidden="true" /><span>×1</span></Button></Tooltip>
                    <Tooltip title={shinyDrawUnavailable ? '획득한 포켓몬의 이로치를 모두 수집했습니다.' : '포켓볼 2개로 이로치 포켓몬 뽑기'}><Button aria-label={shinyDrawUnavailable ? '획득한 포켓몬의 이로치를 모두 수집했습니다.' : '포켓볼 2개로 이로치 포켓몬 뽑기'} className={cx(styles.drawButton, styles.shinyDrawButton, { [styles.shinyDrawUnavailable]: shinyDrawUnavailable })} aria-describedby={shinyDrawGuide ? 'shiny-draw-guide' : undefined} loading={drawing === 'SHINY'} disabled={!summary || drawing !== null || shinyDrawUnavailable || ballCount < 2} onClick={() => handleDraw(true)}><img src={pokeballImage} alt="" aria-hidden="true" /><StarFilled aria-hidden="true" /><span>×2</span></Button></Tooltip>
                  </div>
                  <span id="shiny-draw-guide" className={styles.shinyDrawGuide} aria-live={shinyDrawGuide ? 'polite' : undefined}>{shinyDrawGuide}</span>
                </div>
              </div>
            }
          />

          {!loading && collectedCount === 0 && <section className={styles.emptyGuide}>
            <strong>첫 포켓몬을 만나 보세요.</strong>
            <Typography.Text>이번 학기 인정 활동시간이 1시간 쌓이면 포켓볼 1개를 받고 도감을 시작할 수 있어요.</Typography.Text>
          </section>}

          <div className={styles.filters}>
            <SectionTabs
              className={styles.collectionTabs}
              activeKey={ownership}
              onChange={(value) => setOwnership(value as CollectionView)}
              items={[{ key: 'ALL', label: '전체 도감' }, { key: 'OWNED', label: '획득한 포켓몬' }]}
            />
            <Popover
              trigger="click"
              placement="bottomLeft"
              content={<div className={styles.filterPanel}>
                <label>세대
                  <Select aria-label="세대 필터" value={generation} onChange={setGeneration} options={[{ value: 'ALL', label: '모든 세대' }, ...generations.map((value) => ({ value, label: `${value}세대` }))]} />
                </label>
                <label>등급
                  <Select aria-label="등급 필터" value={rarity} onChange={setRarity} options={[{ value: 'ALL', label: '모든 등급' }, ...Object.entries(rarityLabel).map(([value, label]) => ({ value, label }))]} />
                </label>
                {(generation !== 'ALL' || rarity !== 'ALL') && <Button type="link" onClick={() => { setGeneration('ALL'); setRarity('ALL'); }}>초기화</Button>}
              </div>}
            >
              <Tooltip title="상세 필터">
                <Button aria-label="상세 필터" icon={<FilterOutlined />} className={cx(styles.filterButton, { [styles.activeFilter]: generation !== 'ALL' || rarity !== 'ALL' })} />
              </Tooltip>
            </Popover>
          </div>

          {loading ? <Spin className={styles.spinner} /> : visibleCollection.length === 0 ? <Empty description="표시할 도감이 없습니다." /> : (
            <div className={styles.grid}>
            {visibleCollection.map((item) => (
              <CollectionCard
                key={item.collectibleId}
                item={item}
                onOpen={openCollectionItem}
                cardClassName={styles.card}
                unownedClassName={styles.unowned}
                shinyCardClassName={styles.shinyCard}
                clickableCardClassName={styles.clickableCard}
                shinyBadgeClassName={styles.shinyBadge}
                shinyPreviewClassName={styles.shinyPreview}
                spriteClassName={styles.sprite}
                spriteFallbackClassName={styles.spriteFallback}
                cardMetaClassName={styles.cardMeta}
                numberClassName={styles.number}
                cardNameClassName={styles.cardName}
              />
            ))}
            </div>
          )}

          <section className={styles.history}>
          <Typography.Title level={4}>최근 뽑기</Typography.Title>
          {draws.length === 0 ? <Typography.Text className={styles.historyEmpty}>아직 뽑기 기록이 없습니다.</Typography.Text> : (
            <div className={styles.historyList}>
              {draws.slice(0, 5).map((draw) => (
                <div className={styles.historyItem} key={draw.drawId}>
                  <span>{draw.shiny ? '이로치' : rarityLabel[draw.rarity]}</span>
                  <strong>{draw.name}</strong>
                  <time>{new Date(draw.drawnAt).toLocaleDateString()}</time>
                </div>
              ))}
            </div>
          )}
          </section>
        </PageContent>
      </WhiteBlock>

      <CollectibleDetailModal
        collectible={detailModal?.collectible ?? null}
        title={detailModal?.title}
        description={detailModal?.description}
        onClose={() => setDetailModal(null)}
      />
    </Block>
  );
}

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`box-sizing:border-box; padding:30px 20px; align-items:center;`,
  content: css`max-width:1180px;`,
  collectionHeader: css`${media.mobile}{gap:12px; margin-bottom:10px; > div:first-of-type{gap:4px;} > div:last-child{width:100%; justify-content:center;} h2{font-size:1.75rem;}}`,
  catalogTitle: css`display:inline-flex; align-items:center; gap:18px; ${media.mobile}{flex-direction:column; gap:4px;}`,
  catalogMetrics: css`display:inline-flex; align-items:center; color:#737c77; font-size:.82rem; font-weight:600; font-variant-numeric:tabular-nums; white-space:nowrap; > span{display:inline-flex; align-items:center;} strong{color:#249b78; font-size:.9rem;} ${media.mobile}{strong{min-width:108px; font-size:1rem; text-align:center;}}`,
  drawPanel: css`display:flex; align-items:center; ${media.mobile}{width:100%; align-items:flex-start;}`,
  drawAction: css`display:flex; align-items:center; gap:10px; flex-wrap:wrap; ${media.mobile}{width:100%; justify-content:center; gap:8px;}`,
  drawButtons: css`display:flex; gap:8px; flex-wrap:wrap; .ant-btn{display:inline-flex; align-items:center; gap:5px; font-size:.82rem;} .ant-btn img{width:18px; height:18px; object-fit:contain;} .ant-btn .anticon{font-size:.68rem;}`,
  drawButton: css`${media.mobile}{min-width:68px; min-height:44px; padding:0 10px;}`,
  shinyDrawButton: css`border-color:#d5a62d !important; color:#8d6810 !important; &:not(:disabled):hover{border-color:#ba8a13 !important; color:#74530a !important;} ${media.mobile}{min-width:78px;}`,
  shinyDrawUnavailable: css`cursor:not-allowed; opacity:.55;`,
  shinyDrawGuide: css`display:block; width:100%; min-height:18px; color:#7b736a; font-size:.74rem; line-height:18px; ${media.mobile}{text-align:center;}`,
  ballBalance: css`display:inline-flex; align-items:center; gap:5px; min-width:68px; color:#276f59; font-variant-numeric:tabular-nums; font-weight:700; img{width:21px; height:21px; object-fit:contain;} strong{font-size:.9rem;} ${media.mobile}{min-height:44px; justify-content:center;}`,
  emptyGuide: css`display:flex; flex-direction:column; gap:4px; padding:14px 16px; margin:0 0 18px; border-left:3px solid #49bf9e; background:#f8fcfb; strong{color:#276f59;} .ant-typography{font-size:.82rem; color:#6e7772;}`,
  filters: css`display:flex; align-items:center; gap:8px; margin-bottom:18px; border-bottom:1px solid rgba(76, 55, 34, .08); ${media.mobile}{min-height:44px; gap:12px;}`,
  collectionTabs: css`width:auto; flex:none; min-width:0; .ant-tabs-nav{margin:0; border-bottom:0;} .ant-tabs-tab{padding:12px 0 14px;} ${media.mobile}{flex:1; .ant-tabs-nav-wrap{overflow:visible;} .ant-tabs-tab{display:flex; min-height:44px; align-items:center; padding:0 0 2px;}}`,
  filterPanel: css`display:flex; width:180px; flex-direction:column; gap:12px; label{display:flex; flex-direction:column; gap:5px; color:#69716d; font-size:.78rem; font-weight:700;} .ant-btn{align-self:flex-start; padding:0;}`,
  filterButton: css`width:44px; height:44px; padding:0; flex:none;`,
  activeFilter: css`border-color:#49bf9e !important; color:#249b78 !important;`,
  spinner: css`display:block; margin:72px auto;`,
  grid: css`display:grid; grid-template-columns:repeat(auto-fill, minmax(160px, 1fr)); gap:12px;`,
  card: css`position:relative; display:flex; min-height:172px; flex-direction:column; justify-content:space-between; padding:10px; border:1px solid #e2e5e4; border-radius:4px; background:#fff; transition:border-color .15s ease, box-shadow .15s ease; &:hover{border-color:#9edbc9; box-shadow:0 4px 12px rgba(39, 112, 88, .08);}`,
  unowned: css`background:#f6f7f7; img{filter:brightness(0) opacity(.22);}`,
  shinyCard: css`border-color:#e6c76a;`,
  shinyBadge: css`position:absolute; top:8px; right:8px; z-index:1; display:inline-flex; align-items:center; gap:3px; padding:3px 5px; border:1px solid #e6c76a; border-radius:3px; background:#fffaf0; color:#9b720e; font-size:.62rem; font-weight:800; line-height:1;`,
  shinyPreview: css`position:absolute; right:8px; bottom:34px; z-index:1; width:40px; height:40px; padding:3px; border:1px solid #e6c76a; border-radius:4px; background:#fffaf0; object-fit:contain;`,
  clickableCard: css`cursor:pointer; &:focus-visible{outline:2px solid #49bf9e; outline-offset:2px;}`,
  sprite: css`width:112px; height:112px; object-fit:contain; align-self:center; flex:1 0 auto; min-height:0;`,
  spriteFallback: css`width:112px; height:112px; background:#edf0ef; border-radius:50%; align-self:center; flex:1 0 auto;`,
  cardMeta: css`display:flex; min-width:0; align-items:baseline; justify-content:center; gap:5px; padding-top:8px; border-top:1px solid #f1f3f5; white-space:nowrap;`,
  number: css`flex:none; font-size:.7rem; font-weight:700; color:#8b918e;`,
  cardName: css`overflow:hidden; color:#495057; font-size:.76rem; font-weight:700; text-overflow:ellipsis;`,
  history: css`margin-top:34px; h4{margin-bottom:12px !important; color:#4c3722 !important;}`,
  historyEmpty: css`color:#7b736a;`,
  historyList: css`border-top:1px solid #e5f0ed;`,
  historyItem: css`display:grid; grid-template-columns:72px 1fr auto; gap:12px; align-items:center; padding:11px 0; border-bottom:1px solid #e5f0ed; span{font-size:.78rem; color:#249b78; font-weight:700;} strong{color:#4c3722;} time{font-size:.78rem; color:#7b736a;}`,
}));
