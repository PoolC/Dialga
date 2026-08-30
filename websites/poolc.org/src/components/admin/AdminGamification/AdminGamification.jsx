import { Spin, Tag, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';
import { useMessage } from '~/hooks/useMessage';
import * as gameAPI from '~/lib/api/gamification';
import { WhiteNarrowBlock } from '~/styles/common/Block.styles';
import ActionButton from '../../common/Buttons/ActionButton';

export default function AdminGamification() {
  const { styles } = useStyles();
  const message = useMessage();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  const loadLatest = async () => {
    try {
      const response = await gameAPI.getLatestCatalogSync();
      setRun(response.status === 204 ? null : response.data);
    } catch (error) {
      if (error.response?.status !== 404) message.error('동기화 상태를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLatest();
  }, []);

  useEffect(() => {
    if (run?.status !== 'RUNNING') return undefined;
    const timer = window.setInterval(loadLatest, 3000);
    return () => window.clearInterval(timer);
  }, [run?.status]);

  const startSync = async () => {
    setStarting(true);
    try {
      const response = await gameAPI.startCatalogSync();
      setRun(response.data);
      message.success('도감 동기화를 시작했습니다.');
    } catch (error) {
      message.error(error.response?.data?.message ?? '도감 동기화를 시작하지 못했습니다.');
    } finally {
      setStarting(false);
    }
  };

  return (
    <WhiteNarrowBlock>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>도감 동기화</h2>
          <p className={styles.description}>전 세대 수집 대상을 PokeAPI에서 동기화합니다.</p>
        </div>
        <ActionButton className={styles.syncButton} disabled={starting || run?.status === 'RUNNING'} onClick={startSync}>동기화 실행</ActionButton>
      </header>
      {loading ? <Spin className={styles.spinner} /> : !run ? <div className={styles.emptyState}>아직 동기화한 도감이 없습니다.</div> : (
        <div className={styles.status}>
          <div><span>상태</span><Tag color={run.status === 'COMPLETED' ? 'green' : run.status === 'FAILED' ? 'red' : 'blue'}>{run.status}</Tag></div>
          <div><span>처리한 종</span><strong>{run.processedCount}종</strong></div>
          <div><span>시작</span><strong>{new Date(run.startedAt).toLocaleString()}</strong></div>
          {run.completedAt && <div><span>완료</span><strong>{new Date(run.completedAt).toLocaleString()}</strong></div>}
          {run.message && <Typography.Text type="danger">{run.message}</Typography.Text>}
        </div>
      )}
    </WhiteNarrowBlock>
  );
}

const useStyles = createStyles(({ css }) => ({
  header: css`display:flex; width:100%; align-items:flex-end; justify-content:space-between; gap:24px; margin-bottom:18px; @media(max-width:768px){align-items:stretch; flex-direction:column;}`,
  title: css`margin:0; color:#4c3722; font-size:1.75rem; font-weight:800; line-height:1.25;`,
  description: css`margin:8px 0 0; color:#827971; font-size:.85rem; line-height:1.45;`,
  syncButton: css`margin:0;`,
  spinner: css`display:block; margin:64px auto;`,
  emptyState: css`width:100%; padding:42px 20px; border:1px solid rgba(76,55,34,.12); border-radius:8px; color:#827971; font-size:.9rem; text-align:center; box-sizing:border-box;`,
  status: css`display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:1px; overflow:hidden; border:1px solid #e5f0ed; border-radius:8px; background:#e5f0ed; > div{display:flex; flex-direction:column; gap:8px; min-height:96px; padding:16px; background:#fff;} span{font-size:.8rem; color:#7b736a;} strong{color:#4c3722;} @media(max-width:640px){grid-template-columns:1fr;}`,
}));
