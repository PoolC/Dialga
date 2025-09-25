import { CopyOutlined, CheckOutlined, ArrowRightOutlined, SettingTwoTone, BookTwoTone, DeploymentUnitOutlined, EyeTwoTone } from '@ant-design/icons';
import { Typography, Space, Button, List } from 'antd';
import { createStyles } from 'antd-style';
import useCopy from '../../hooks/useCopy';

export default function MyPagePKSSection({ jwtToken }: { jwtToken: string }) {
  const { styles } = useStyles();
  const { isCopied, copy } = useCopy();

  const linkList: {
    title: string;
    icon: JSX.Element;
    link: string;
  }[] = [
    {
      title: 'kubectl 빠른 설정',
      icon: <SettingTwoTone size={24} twoToneColor="#adb5bd" />,
      link: 'https://github.com/PoolC/PKS-docs/tree/main/docs/user-guides',
    },
    {
      title: '전체 문서',
      icon: <BookTwoTone size={24} twoToneColor="#ffa94d" />,
      link: 'https://github.com/PoolC/PKS-docs/tree/main',
    },
    {
      title: 'Argo CD',
      icon: <DeploymentUnitOutlined size={24} />,
      link: 'https://argocd.dev.poolc.org',
    },
    {
      title: '모니터링',
      icon: <EyeTwoTone size={24} twoToneColor="#4dabf7" />,
      link: 'https://mon.dev.poolc.org',
    },
  ];

  const code = dedent`kubectl config set-credentials pks --token=${jwtToken}
                kubectl config set-cluster pks --server="https://165.132.131.121:6443" --insecure-skip-tls-verify=true
                kubectl config set-context pks --cluster=pks --user=pks
                kubectl config use-context pks`;

  return (
    <Space direction="vertical" size="middle" className={styles.container}>
      <List
        size="large"
        className={styles.fullWidth}
        bordered
        dataSource={linkList}
        renderItem={(item) => (
          <List.Item>
            <a href={item.link} className={styles.link} target="_blank" rel="noreferrer">
              <div className={styles.linkInner}>
                {item.icon}
                <Typography.Text>{item.title}</Typography.Text>
              </div>
              <ArrowRightOutlined size={18} />
            </a>
          </List.Item>
        )}
      />
      <div className={styles.codeBlock}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLabel}>Command</span>
          <Button size="small" icon={isCopied ? <CheckOutlined /> : <CopyOutlined />} onClick={() => copy(code)} />
        </div>
        <pre className={styles.code}>{code}</pre>
      </div>
    </Space>
  );
}

const useStyles = createStyles(({ css }) => ({
  container: css({
    width: '100%',
  }),
  fullWidth: css({
    width: '100%',
  }),
  link: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }),
  linkInner: css({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  }),
  codeBlock: css({
    width: '100%',
    border: '1px solid rgba(100, 100, 100, 0.2)',
    borderRadius: '6px',
    overflow: 'hidden',
  }),
  codeHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    background: 'rgba(150, 150, 150, 0.1)',
    borderBottom: '1px solid rgba(100, 100, 100, 0.2)',
  }),
  codeLabel: css({
    fontSize: '12px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
    letterSpacing: '0.5px',
  }),
  code: css({
    whiteSpace: 'pre !important',
    margin: '0 !important',
    padding: '12px',
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
    background: 'rgba(250, 250, 250, 0.5)',
    overflowX: 'auto',
  }),
}));

function dedent(text: TemplateStringsArray, ...args: unknown[]) {
  let raw = text.raw[0];

  for (let i = 0; i < args.length; i++) {
    raw += String(args[i]) + text.raw[i + 1];
  }

  return raw
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
}
