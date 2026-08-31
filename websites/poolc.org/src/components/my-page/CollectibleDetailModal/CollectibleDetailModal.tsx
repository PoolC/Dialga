import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Segmented, Tag, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export type CollectibleDetail = {
  externalId?: number;
  name: string;
  spriteUrl?: string;
  shinySpriteUrl?: string;
  rarity: Rarity;
  shiny?: boolean;
  shinyOwned?: boolean;
  ownedCount?: number;
  normalOwnedCount?: number;
  shinyOwnedCount?: number;
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

type CollectibleDetailModalProps = {
  collectible: CollectibleDetail | null;
  title?: string;
  description?: string;
  onClose: () => void;
};

const rarityLabel: Record<Rarity, string> = {
  COMMON: '일반',
  RARE: '레어',
  EPIC: '에픽',
  LEGENDARY: '전설',
};

export default function CollectibleDetailModal({ collectible, title, description, onClose }: CollectibleDetailModalProps) {
  const { styles } = useStyles();
  const [showShiny, setShowShiny] = useState(false);
  const canShowShiny = Boolean(collectible?.shinyOwned && collectible.shinySpriteUrl);
  const showingShiny = canShowShiny && showShiny;
  const displayedOwnedCount = showingShiny
    ? collectible?.shinyOwnedCount ?? (collectible?.shiny ? collectible.ownedCount : 0)
    : collectible?.normalOwnedCount ?? (collectible?.shiny ? 0 : collectible?.ownedCount);

  useEffect(() => {
    setShowShiny(Boolean(collectible?.shiny));
  }, [collectible]);

  return (
    <Modal
      open={Boolean(collectible)}
      footer={<Button type="primary" onClick={onClose}>확인하고 닫기</Button>}
      closeIcon={<CloseOutlined aria-label="닫기" />}
      onCancel={onClose}
      centered
    >
      {collectible && <div className={styles.content}>
        {title && <Typography.Title level={4} className={styles.title}>{title}</Typography.Title>}
        {canShowShiny && <Segmented value={showingShiny ? 'SHINY' : 'NORMAL'} options={[{ label: '일반', value: 'NORMAL' }, { label: '이로치', value: 'SHINY' }]} onChange={(value) => setShowShiny(value === 'SHINY')} />}
        {(showingShiny ? collectible.shinySpriteUrl : collectible.spriteUrl) && <img src={showingShiny ? collectible.shinySpriteUrl : collectible.spriteUrl} alt={showingShiny ? `${collectible.name} 이로치` : collectible.name} />}
        <Typography.Title level={2}>{collectible.name}</Typography.Title>
        <Tag color={showingShiny ? 'gold' : 'green'}>{showingShiny ? '이로치' : rarityLabel[collectible.rarity]}</Tag>
        <Typography.Text className={styles.description}>
          {description ?? `No.${String(collectible.externalId ?? 0).padStart(3, '0')} · ${displayedOwnedCount ?? 1}마리 보유`}
        </Typography.Text>
        {(collectible.category || collectible.description) && <section className={styles.dexEntry}>
          {collectible.category && <strong>{collectible.category}</strong>}
          {collectible.description && <Typography.Paragraph>{collectible.description}</Typography.Paragraph>}
        </section>}
        {(collectible.heightDecimeters !== undefined || collectible.weightHectograms !== undefined || collectible.abilities) && <dl className={styles.profile}>
          {collectible.heightDecimeters !== undefined && <div><dt>키</dt><dd>{(collectible.heightDecimeters / 10).toFixed(1)} m</dd></div>}
          {collectible.weightHectograms !== undefined && <div><dt>몸무게</dt><dd>{(collectible.weightHectograms / 10).toFixed(1)} kg</dd></div>}
          {collectible.abilities && <div data-ability><dt>특성</dt><dd>{collectible.abilities}</dd></div>}
        </dl>}
        {[collectible.hp, collectible.attack, collectible.defense, collectible.specialAttack, collectible.specialDefense, collectible.speed].some((stat) => stat !== undefined) && <section className={styles.stats}>
          <strong>기본 능력치</strong>
          <div>
            {[['HP', collectible.hp], ['공격', collectible.attack], ['방어', collectible.defense], ['특수공격', collectible.specialAttack], ['특수방어', collectible.specialDefense], ['스피드', collectible.speed]].map(([label, value]) => (
              <span key={label}>{label} <b>{value ?? '-'}</b></span>
            ))}
          </div>
        </section>}
      </div>}
    </Modal>
  );
}

const useStyles = createStyles(({ css }) => ({
  content: css`display:flex; flex-direction:column; align-items:center; gap:8px; padding:18px 0; text-align:center; > img{width:196px; height:196px; object-fit:contain;} h2{margin:0 !important;}`,
  title: css`margin:0 0 4px !important; color:#276f59 !important;`,
  description: css`color:#6c757d; font-size:.84rem;`,
  dexEntry: css`width:100%; padding:12px; border-top:1px solid #e5f0ed; border-bottom:1px solid #e5f0ed; text-align:left; strong{font-size:.82rem; color:#276f59;} .ant-typography{margin:4px 0 0 !important; color:#5f6462; font-size:.85rem; line-height:1.6;}`,
  profile: css`display:grid; width:100%; grid-template-columns:1fr 1fr; margin:0; border:1px solid #e5f0ed; border-radius:4px; > div{padding:9px 12px; text-align:left;} dt{font-size:.72rem; color:#7b736a;} dd{margin:2px 0 0; color:#3d4843; font-size:.86rem; font-weight:700;} [data-ability]{grid-column:1 / -1; border-top:1px solid #e5f0ed;}`,
  stats: css`width:100%; text-align:left; > strong{display:block; margin-bottom:7px; color:#4c3722; font-size:.82rem;} > div{display:grid; grid-template-columns:repeat(3, 1fr); gap:5px;} span{padding:6px 7px; border-radius:3px; background:#f5f8f7; color:#67716c; font-size:.72rem;} b{float:right; color:#276f59;}`,
}));
