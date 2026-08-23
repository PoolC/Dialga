import {
  ArrowRightOutlined,
  BookTwoTone,
  CloudServerOutlined,
  DeploymentUnitOutlined,
  EyeTwoTone,
  FormOutlined,
  GithubOutlined,
  SettingTwoTone,
} from '@ant-design/icons';
import { Typography } from 'antd';
import { createStyles } from 'antd-style';
import { ReactNode } from 'react';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import PksKubectlSection from '~/components/pks/PksKubectlSection';
import { KubernetesControllerService, queryKey, useAppQuery } from '~/lib/api-v2';
import { publicConfig } from '~/lib/config/publicConfig';

type PksResource = {
  title: string;
  description?: string;
  icon: ReactNode;
  link?: string;
  badge?: string;
};

const PKS_RESOURCES: PksResource[] = [
  {
    title: '프로젝트 인프라 요청',
    description: '배포, DB, 스토리지 등 운영 환경 요청',
    icon: <FormOutlined />,
    badge: '준비 중',
  },
  {
    title: 'kubectl 빠른 설정',
    description: '클러스터 접속 가이드',
    icon: <SettingTwoTone twoToneColor="#adb5bd" />,
    link: publicConfig.pks.userGuide.url,
  },
  {
    title: 'PKS Docs',
    description: 'PKS 사용 문서',
    icon: <BookTwoTone twoToneColor="#ffa94d" />,
    link: publicConfig.pks.docs.url,
  },
  {
    title: 'Gitea',
    description: 'PoolC 전용 Github',
    icon: <GithubOutlined />,
    link: publicConfig.pks.gitea.url,
  },
  {
    title: 'Argo CD',
    description: '배포 상태 확인',
    icon: <DeploymentUnitOutlined />,
    link: publicConfig.pks.argoCd.url,
  },
  {
    title: 'Grafana',
    description: '서버 상태 모니터링',
    icon: <EyeTwoTone twoToneColor="#4dabf7" />,
    link: publicConfig.pks.grafana.url,
  },
];

export default function PksContainer() {
  const { styles } = useStyles();

  const { data: kubernetes, isError: isKubernetesError } = useAppQuery({
    queryKey: queryKey.kubernetes.me,
    queryFn: KubernetesControllerService.getMyKeyUsingGet,
    retry: false,
  });

  const renderKubectlContent = () => {
    if (isKubernetesError) {
      return <Typography.Text className={styles.mutedText}>쿠버네티스 키가 아직 발급되지 않았습니다. 관리자에게 문의해주세요.</Typography.Text>;
    }

    if (kubernetes?.key) {
      return <PksKubectlSection jwtToken={kubernetes.key} showLinks={false} />;
    }

    return <Typography.Text className={styles.mutedText}>키 정보를 확인하고 있습니다.</Typography.Text>;
  };

  return (
    <div className={styles.container}>
      <PageHeader title="PKS" />

      <section className={styles.introSection}>
        <p className={styles.introText}>
          PKS는 동아리방에 있는 PoolC 서버들 위에서 운영되는 Kubernetes 클러스터입니다. 동아리 프로젝트의 Git 저장소, 배포 환경, 운영 도구를 한곳에 모아 팀별 웹 서비스와 실험용 애플리케이션을 올릴 수 있도록 제공합니다.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>도구</h3>
        <div className={styles.resourceGrid}>
          {PKS_RESOURCES.map((item) => {
            const content = (
              <>
                <span className={styles.resourceIcon}>{item.icon}</span>
                <span className={styles.resourceText}>
                  <span className={styles.resourceTitle}>{item.title}</span>
                  {item.description && <span className={styles.resourceDescription}>{item.description}</span>}
                </span>
                {item.badge ? <span className={styles.pendingBadge}>{item.badge}</span> : <ArrowRightOutlined className={styles.resourceArrow} />}
              </>
            );

            return item.link ? (
              <a key={item.title} href={item.link} className={styles.resourceCard} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <article key={item.title} className={styles.resourceCard} aria-disabled>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.kubectlHeader}>
          <h3 className={styles.sectionTitle}>kubectl</h3>
          <CloudServerOutlined className={styles.kubectlIcon} />
        </div>
        <div className={styles.kubectlBox}>{renderKubectlContent()}</div>
      </section>
    </div>
  );
}

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    width: 100%;
    max-width: 1210px;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  `,
  section: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;

    & + & {
      margin-top: 38px;
    }
  `,
  sectionTitle: css`
    margin: 0;
    color: #4c3722;
    font-size: 1.08rem;
    font-weight: 800;
    line-height: 1.35;
  `,
  introSection: css`
    width: 100%;
    margin-bottom: 30px;
  `,
  introText: css`
    max-width: 820px;
    margin: 0;
    color: rgba(76, 55, 34, 0.72);
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.75;
    word-break: keep-all;
  `,
  resourceGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,
  resourceCard: css`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 14px;
    min-height: 64px;
    padding: 16px 18px;
    border: 1px solid rgba(76, 55, 34, 0.1);
    border-radius: 8px;
    background: #ffffff;
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
    transition: 0.2s;

    &:hover {
      color: inherit;
      text-decoration: none;
      border-color: rgba(71, 190, 155, 0.45);
      background: rgba(229, 240, 237, 0.45);
      transform: translateY(-1px);
    }

    &[aria-disabled='true'] {
      cursor: default;
    }

    &[aria-disabled='true']:hover {
      border-color: rgba(76, 55, 34, 0.1);
      background: #ffffff;
      transform: none;
    }
  `,
  resourceIcon: css`
    display: inline-flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    color: #47be9b;
    font-size: 1.15rem;
  `,
  resourceText: css`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 4px;
  `,
  resourceTitle: css`
    overflow: hidden;
    color: #302820;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  resourceDescription: css`
    overflow: hidden;
    color: rgba(76, 55, 34, 0.58);
    font-size: 0.84rem;
    font-weight: 500;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  resourceArrow: css`
    color: #47be9b;
    font-size: 0.95rem;
  `,
  pendingBadge: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(229, 240, 237, 0.72);
    color: #47be9b;
    font-size: 0.75rem;
    font-weight: 800;
    white-space: nowrap;
  `,
  kubectlHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  `,
  kubectlIcon: css`
    color: #47be9b;
    font-size: 1.25rem;
  `,
  kubectlBox: css`
    width: 100%;
    padding: 20px;
    border: 1px solid rgba(76, 55, 34, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
  `,
  mutedText: css`
    color: rgba(76, 55, 34, 0.58) !important;
    font-size: 0.92rem;
    font-weight: 500;
  `,
}));
