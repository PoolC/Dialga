import { ArrowRightOutlined, BookTwoTone, CloudServerOutlined, CodeOutlined, DeploymentUnitOutlined, EyeTwoTone, GithubOutlined } from '@ant-design/icons';
import { List, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { ReactNode } from 'react';
import PksKubectlSection from '~/components/pks/PksKubectlSection';
import { publicConfig } from '~/lib/config/publicConfig';
import { KubernetesControllerService, queryKey, useAppQuery } from '~/lib/api-v2';

type PksResource = {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
};

const PKS_RESOURCES: PksResource[] = [
  {
    title: 'Gitea',
    description: publicConfig.pks.gitea.description,
    icon: <GithubOutlined size={24} />,
    link: publicConfig.pks.gitea.url,
  },
  {
    title: 'Argo CD',
    description: publicConfig.pks.argoCd.description,
    icon: <DeploymentUnitOutlined size={24} />,
    link: publicConfig.pks.argoCd.url,
  },
  {
    title: 'Grafana',
    description: publicConfig.pks.grafana.description,
    icon: <EyeTwoTone size={24} twoToneColor="#4dabf7" />,
    link: publicConfig.pks.grafana.url,
  },
  {
    title: 'will-it-compile',
    description: publicConfig.pks.compile.description,
    icon: <CodeOutlined size={24} />,
    link: publicConfig.pks.compile.url,
  },
  {
    title: 'PKS Docs',
    description: publicConfig.pks.docs.description,
    icon: <BookTwoTone size={24} twoToneColor="#ffa94d" />,
    link: publicConfig.pks.docs.url,
  },
];

export default function PksContainer() {
  const { styles } = useStyles();

  const { data: kubernetes, isError: isKubernetesError } = useAppQuery({
    queryKey: queryKey.kubernetes.me,
    queryFn: KubernetesControllerService.getMyKeyUsingGet,
    retry: false,
  });

  return (
    <Space direction="vertical" size={32} className={styles.container}>
      <Space direction="vertical" size={4}>
        <Space align="center" size={12}>
          <CloudServerOutlined className={styles.titleIcon} />
          <Typography.Title level={3} className={styles.title}>
            PKS
          </Typography.Title>
        </Space>
        <Typography.Text type="secondary">PoolC Kubernetes Service</Typography.Text>
      </Space>

      <Space direction="vertical" size={12} className={styles.section}>
        <Typography.Title level={5} className={styles.sectionTitle}>
          Platform
        </Typography.Title>
        <List
          size="large"
          bordered
          dataSource={PKS_RESOURCES}
          renderItem={(item) => (
            <List.Item>
              <a href={item.link} className={styles.link} target="_blank" rel="noreferrer">
                <div className={styles.linkInner}>
                  {item.icon}
                  <Space direction="vertical" size={0}>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <Typography.Text type="secondary">{item.description}</Typography.Text>
                  </Space>
                </div>
                <ArrowRightOutlined size={18} />
              </a>
            </List.Item>
          )}
        />
      </Space>

      <Space direction="vertical" size={12} className={styles.section}>
        <Typography.Title level={5} className={styles.sectionTitle}>
          kubectl
        </Typography.Title>
        {isKubernetesError ? (
          <Typography.Text type="secondary">쿠버네티스 키가 아직 발급되지 않았습니다. 관리자에게 문의해주세요.</Typography.Text>
        ) : kubernetes?.key ? (
          <PksKubectlSection jwtToken={kubernetes.key} showLinks={false} />
        ) : null}
      </Space>
    </Space>
  );
}

const useStyles = createStyles(({ css }) => ({
  container: css`
    width: 100%;
    max-width: 960px;
  `,
  titleIcon: css`
    color: #47be9b;
    font-size: 30px;
  `,
  title: css`
    margin: 0 !important;
  `,
  section: css`
    width: 100%;
  `,
  sectionTitle: css`
    margin: 0 !important;
  `,
  link: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  linkInner: css`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
}));
