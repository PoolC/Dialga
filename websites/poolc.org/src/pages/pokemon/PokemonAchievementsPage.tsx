import { CheckCircleOutlined, CheckOutlined, GiftOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Progress, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import { useMessage } from '~/hooks/useMessage';
import * as gameAPI from '~/lib/api/gamification';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';

type QuestType = 'DAILY' | 'SEASON' | 'REPEATABLE' | 'PERMANENT';
type Quest = {
  key: string;
  type: QuestType;
  title: string;
  description: string;
  target: number;
  progress: number;
  rewardBallType: string;
  rewardAmount: number;
  claimed: boolean;
  claimableCount: number;
};

const normalBallImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

const questIcons = { attendance: CheckCircleOutlined, wifi: WifiOutlined, draw: GiftOutlined };

export default function PokemonAchievementsPage() {
  const { styles } = useStyles();
  const message = useMessage();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<QuestType | 'ALL'>('DAILY');

  const load = async () => {
    try {
      const response = await gameAPI.getAchievements();
      setQuests(response.data);
    } catch {
      message.error('퀘스트 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const claim = async (questKey: string) => {
    setClaiming(questKey);
    try {
      await gameAPI.claimAchievement(questKey);
      message.success('퀘스트 보상을 받았습니다.');
      await load();
    } catch (error: any) {
      message.error(error.response?.data?.message ?? '보상을 받을 수 없습니다.');
    } finally {
      setClaiming(null);
    }
  };

  const sections = useMemo(() => (['DAILY', 'SEASON', 'REPEATABLE', 'PERMANENT'] as QuestType[])
    .filter((type) => selectedType === 'ALL' || selectedType === type)
    .map((type) => ({
      type,
      quests: quests.filter((quest) => quest.type === type).sort((a, b) => {
        const aCompleted = a.claimed || (a.progress >= a.target && a.claimableCount === 0);
        const bCompleted = b.claimed || (b.progress >= b.target && b.claimableCount === 0);
        return Number(aCompleted) - Number(bCompleted);
      }),
    })), [quests, selectedType]);
  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <PageContent className={styles.content}>
          <PageHeader title="퀘스트" />
          <SectionTabs
            className={styles.questTabs}
            activeKey={selectedType}
            onChange={(value) => setSelectedType(value as QuestType | 'ALL')}
            items={[
              { key: 'DAILY', label: '일일' },
              { key: 'SEASON', label: '시즌' },
              { key: 'REPEATABLE', label: '반복' },
              { key: 'PERMANENT', label: '업적' },
              { key: 'ALL', label: '전체' },
            ]}
          />
          {loading ? <Spin className={styles.spinner} /> : <>
            {sections.map(({ type, quests: sectionQuests }) => <QuestSection key={type} quests={sectionQuests} claiming={claiming} onClaim={claim} styles={styles} />)}
          </>}
        </PageContent>
      </WhiteBlock>
    </Block>
  );
}

function QuestSection({ quests, claiming, onClaim, styles }: { quests: Quest[]; claiming: string | null; onClaim: (key: string) => void; styles: Record<string, string> }) {
  return <section className={styles.section}>
    <div className={styles.questList}>{quests.map((quest) => {
      const completed = quest.progress >= quest.target;
      const canClaim = quest.type === 'REPEATABLE'
        ? quest.claimableCount > 0
        : completed && !quest.claimed;
      const isCompleted = completed && !canClaim;
      const percentage = Math.min(100, Math.round((quest.progress / quest.target) * 100));
      const QuestIcon = quest.key.includes('CLUB_WIFI') ? questIcons.wifi
        : quest.key.includes('DRAW') ? questIcons.draw : questIcons.attendance;
      const progressLabel = quest.type === 'REPEATABLE' ? `${quest.claimableCount}회 수령 가능` : completed ? '완료' : `${Math.min(quest.progress, quest.target)} / ${quest.target}`;
      return <article className={`${styles.quest} ${canClaim ? styles.claimable : ''} ${isCompleted ? styles.completed : ''}`} key={quest.key}>
        <div className={styles.questIcon}><QuestIcon /></div>
        <div className={styles.questBody}><div className={styles.questTitle}><h3>{quest.title}</h3>{canClaim && <span>보상 가능</span>}</div><p className={styles.questDescription}>{quest.description}</p>{!isCompleted && <div className={styles.questProgress}><Progress percent={percentage} showInfo={false} strokeColor={completed ? '#48b99a' : '#9bbab0'} trailColor="#e7efed" /><strong>{progressLabel}</strong></div>}</div>
        <div className={styles.questActions}>
          <div className={styles.questReward}><strong><img className={styles.rewardBallIcon} src={normalBallImage} alt="일반 포켓볼" /> × {quest.type === 'REPEATABLE' && canClaim ? quest.rewardAmount * quest.claimableCount : quest.rewardAmount}</strong></div>
          {isCompleted ? <span className={styles.completedBadge}>✓ 보상 수령 완료</span> : <Button type={canClaim ? 'primary' : 'default'} disabled={!canClaim} loading={claiming === quest.key} onClick={() => onClaim(quest.key)} icon={canClaim ? <CheckOutlined /> : undefined}>{canClaim ? quest.type === 'REPEATABLE' ? `${quest.claimableCount}개 받기` : '받기' : '진행 중'}</Button>}
        </div>
      </article>;
    })}</div>
  </section>;
}

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`box-sizing:border-box; padding:60px 0; align-items:center;`,
  content: css`max-width:1210px;`,
  questTabs: css`margin-bottom:24px;`,
  spinner: css`display:block; margin:72px auto;`,
  dailySummary: css`padding:20px 24px; margin:0 0 24px; border:1px solid #d9ebe5; border-radius:8px; background:#f4fbf8;`,
  summaryHeading: css`display:flex; justify-content:space-between; gap:20px; h2{margin:0 0 4px; color:#4c3722; font-size:1.2rem;} p{margin:0; color:#747b77; font-size:.85rem;}`,
  resetInfo: css`display:flex; align-items:center; gap:6px; align-self:flex-start; color:#747b77; font-size:.78rem; white-space:nowrap;`,
  summaryProgress: css`display:flex; align-items:center; gap:16px; margin-top:22px; >div{display:flex; align-items:baseline; gap:5px; min-width:62px; color:#747b77; font-size:.75rem;} strong{color:#2b9c7d; font-size:1.1rem;} .ant-progress{flex:1;}`,
  section: css`margin:0 0 30px;`,
  questList: css`display:flex; flex-direction:column; gap:8px;`,
  quest: css`display:flex; align-items:center; gap:14px; min-height:88px; padding:12px 16px; border:1px solid #e5eeeb; border-radius:6px; background:#fff; transition:border-color .2s, background .2s; @media(max-width:700px){align-items:flex-start; flex-wrap:wrap; gap:10px; .questBody{min-width:calc(100% - 52px);} .questActions{width:calc(100% - 52px); margin-left:52px;}}`,
  claimable: css`border-color:#91d6c0; background:#fbfffd;`,
  completed: css`border-color:#d8e1de; background:#f5f7f6; .questIcon{background:#e7edeb; color:#7c8984;} .questTitle h3,.questReward strong{color:#69746f;} .questProgress strong{color:#7c8984;}`,
  completedBadge: css`flex:none; color:#7c8984; font-size:.75rem; font-weight:700; white-space:nowrap;`,
  questIcon: css`display:flex; align-items:center; justify-content:center; width:42px; height:42px; flex:none; border-radius:50%; background:#e7f5f0; color:#2b9c7d; font-size:1rem;`,
  questBody: css`flex:1; min-width:0;`,
  questTitle: css`display:flex; align-items:center; gap:8px; h3{margin:0; color:#4c3722; font-size:1rem; font-weight:700;} span{padding:3px 6px; border-radius:3px; background:#dff5ed; color:#2b9c7d; font-size:.68rem; font-weight:700;}`,
  questDescription: css`margin:5px 0 0; color:#7b847f; font-size:.78rem; line-height:1.35;`,
  questActions: css`display:flex; align-items:center; justify-content:flex-end; gap:24px; min-width:220px;`,
  questReward: css`display:flex; min-width:0; strong{display:flex; align-items:center; gap:5px; color:#4c3722; font-size:.78rem; white-space:nowrap;}`,
  rewardBallIcon: css`width:30px; height:30px; object-fit:contain; image-rendering:auto;`,
  questProgress: css`display:flex; align-items:center; gap:10px; margin-top:8px; .ant-progress{max-width:210px; flex:1;} strong{color:#747b77; font-size:.72rem; white-space:nowrap;}`,
}));
