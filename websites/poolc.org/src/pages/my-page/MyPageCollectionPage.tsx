import { FilterOutlined, StarFilled } from '@ant-design/icons';
import { Button, Empty, Popover, Select, Spin, Tooltip, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useMemo, useState } from 'react';
import CollectibleDetailModal, { type CollectibleDetail } from '~/components/my-page/CollectibleDetailModal/CollectibleDetailModal';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import { useMessage } from '~/hooks/useMessage';
import * as gameAPI from '~/lib/api/gamification';
import { media } from '~/styles/responsive';

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

type Summary = {
  ballBalances: BallBalances;
  totalCatalogCount: number;
  collectedCatalogCount: number;
  shinyCatalogCount: number;
  normalCatalogCount: number;
  totalVariantCount: number;
  collectedVariantCount: number;
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

  const collectedCount = summary?.collectedVariantCount ?? 0;
  const totalCatalogCount = summary?.totalVariantCount ?? 0;
  const ballCount = summary?.ballBalances?.normal ?? 0;
  const normalCollectedCount = summary?.normalCatalogCount ?? 0;
  const baseCatalogCount = totalCatalogCount / 2;
  const shinyDrawStatus = summary?.shinyDrawStatus ?? 'NEEDS_NORMAL';
  const shinyDrawGuide = shinyDrawStatus === 'NEEDS_NORMAL'
    ? '일반 포켓몬을 먼저 획득하면 이로치 뽑기를 이용할 수 있습니다.'
    : shinyDrawStatus === 'COMPLETE'
      ? '획득한 포켓몬의 이로치를 모두 수집했습니다.'
      : null;
  const shinyDrawUnavailable = shinyDrawStatus !== 'AVAILABLE';
  const handleDraw = async (shiny: boolean) => {
    setDrawing(shiny ? 'SHINY' : 'NORMAL');
    try {
      const response = await gameAPI.drawCollectible({ shiny });
      const draw = response.data as DrawResult;
      const previousCollection = collection.find((item) => item.collectibleId === draw.collectibleId);
      const isNewVariant = draw.shiny
        ? !previousCollection || previousCollection.shinyCount === 0
        : !previousCollection || previousCollection.normalOwnedCount === 0;
      const isNewCatalogEntry = !previousCollection || previousCollection.ownedCount === 0;
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
        collectedVariantCount: current.collectedVariantCount + (isNewVariant ? 1 : 0),
        collectedCatalogCount: current.collectedCatalogCount + (isNewCatalogEntry ? 1 : 0),
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
            title="포켓몬 도감"
            actions={
              <div className={styles.drawPanel}>
              <div className={styles.drawAction}>
                  <span className={styles.ballBalance}>일반 포켓볼 {ballCount}개</span>
                  <div className={styles.drawButtons} aria-describedby={shinyDrawGuide ? 'shiny-draw-guide' : undefined}>
                    <Button type="primary" loading={drawing === 'NORMAL'} disabled={!summary || drawing !== null || ballCount < 1} onClick={() => handleDraw(false)}>일반 뽑기 x1</Button>
                    <Button className={cx(styles.shinyDrawButton, { [styles.shinyDrawUnavailable]: shinyDrawUnavailable })} aria-disabled={shinyDrawUnavailable} aria-describedby={shinyDrawGuide ? 'shiny-draw-guide' : undefined} loading={drawing === 'SHINY'} disabled={!summary || drawing !== null || ballCount < 2} onClick={() => { if (!shinyDrawUnavailable) handleDraw(true); }}>이로치 뽑기 x2</Button>
                  </div>
                  {shinyDrawGuide && <Typography.Text id="shiny-draw-guide" className={styles.shinyDrawGuide} aria-live="polite">{shinyDrawGuide}</Typography.Text>}
                </div>
              </div>
            }
          />


          <div className={styles.collectionStatus}>
            <strong>{collectedCount} / {totalCatalogCount}종</strong>
            <span>일반 {normalCollectedCount} / {baseCatalogCount} · 이로치 {summary?.shinyCatalogCount ?? 0} / {baseCatalogCount}</span>
          </div>

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
                <Button aria-label="상세 필터" icon={<FilterOutlined />} className={cx({ [styles.activeFilter]: generation !== 'ALL' || rarity !== 'ALL' })} />
              </Tooltip>
            </Popover>
          </div>

          {loading ? <Spin className={styles.spinner} /> : visibleCollection.length === 0 ? <Empty description="표시할 도감이 없습니다." /> : (
            <div className={styles.grid}>
            {visibleCollection.map((item) => {
              const displaySpriteUrl = item.spriteUrl;
              const openCollectible = {
                ...item,
                spriteUrl: displaySpriteUrl,
                shiny: false,
                shinyOwned: item.shinyCount > 0,
                normalOwnedCount: item.normalOwnedCount,
                shinyOwnedCount: item.shinyCount,
              };
              return (
                <article
                  key={item.collectibleId}
                  className={cx(styles.card, { [styles.unowned]: item.normalOwnedCount === 0, [styles.shinyCard]: item.shinyCount > 0, [styles.clickableCard]: item.normalOwnedCount > 0 })}
                  onClick={item.normalOwnedCount > 0 ? () => setDetailModal({ collectible: openCollectible }) : undefined}
                  onKeyDown={item.normalOwnedCount > 0 ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setDetailModal({ collectible: openCollectible });
                    }
                  } : undefined}
                  role={item.normalOwnedCount > 0 ? 'button' : undefined}
                  tabIndex={item.normalOwnedCount > 0 ? 0 : undefined}
                >
                  {item.shinyCount > 0 && <span className={styles.shinyBadge}><StarFilled /> 이로치</span>}
                  {item.shinyCount > 0 && item.shinySpriteUrl && <img src={item.shinySpriteUrl} alt="" aria-hidden="true" className={styles.shinyPreview} />}
                  {displaySpriteUrl ? <img src={displaySpriteUrl} alt={item.normalOwnedCount > 0 ? item.name : '미획득'} className={styles.sprite} /> : <div className={styles.spriteFallback} />}
                  <div className={styles.cardMeta}>
                    <Typography.Text className={styles.number} style={{ color: item.normalOwnedCount > 0 ? rarityColor[item.rarity] : undefined }}>
                      No.{String(item.externalId).padStart(3, '0')}
                    </Typography.Text>
                    <Typography.Text className={styles.cardName}>{item.normalOwnedCount > 0 ? item.name : '????'}</Typography.Text>
                  </div>
                </article>
              );
            })}
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
  drawPanel: css`display:flex; align-items:center; ${media.compact}{align-items:flex-start;}`,
  drawAction: css`display:flex; align-items:center; gap:12px; flex-wrap:wrap; ${media.compact}{align-items:flex-start; flex-direction:column; gap:8px;}`,
  drawButtons: css`display:flex; gap:8px; flex-wrap:wrap; .ant-btn{font-size:.82rem;}`,
  shinyDrawButton: css`border-color:#d5a62d !important; color:#8d6810 !important; &:not(:disabled):hover{border-color:#ba8a13 !important; color:#74530a !important;}`,
  shinyDrawUnavailable: css`cursor:not-allowed; opacity:.55;`,
  shinyDrawGuide: css`width:100%; color:#7b736a; font-size:.74rem; ${media.compact}{max-width:280px;}`,
  ballBalance: css`color:#276f59; font-size:.85rem; font-weight:700;`,
  collectionStatus: css`display:flex; align-items:center; gap:12px; margin:0 0 20px; color:#7b736a; font-size:.85rem; strong{color:#249b78; font-size:1rem;} span{padding-left:12px; border-left:1px solid #e5f0ed;} ${media.compact}{align-items:flex-start; flex-direction:column; gap:4px; span{padding-left:0; border-left:0;}}`,
  emptyGuide: css`display:flex; flex-direction:column; gap:4px; padding:14px 16px; margin:0 0 18px; border-left:3px solid #49bf9e; background:#f8fcfb; strong{color:#276f59;} .ant-typography{font-size:.82rem; color:#6e7772;}`,
  filters: css`display:flex; align-items:flex-start; gap:8px; margin-bottom:18px;`,
  collectionTabs: css`flex:1; min-width:0;`,
  filterPanel: css`display:flex; width:180px; flex-direction:column; gap:12px; label{display:flex; flex-direction:column; gap:5px; color:#69716d; font-size:.78rem; font-weight:700;} .ant-btn{align-self:flex-start; padding:0;}`,
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
