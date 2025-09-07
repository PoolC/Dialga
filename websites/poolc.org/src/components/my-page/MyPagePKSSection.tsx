import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Typography, Space, Button } from 'antd';
import { createStyles } from 'antd-style';
import useCopy from '../../hooks/useCopy';

const { Link, Paragraph } = Typography;

export default function MyPagePKSSection({ jwtToken }: { jwtToken: string }) {
  const { styles } = useStyles();
  const { isCopied, copy } = useCopy();

  const code = dedent`kubectl config set-credentials pks --token=${jwtToken}
                kubectl config set-cluster pks --server="https://165.132.131.121:6443" --insecure-skip-tls-verify=true
                kubectl config set-context pks --cluster=pks --user=pks
                kubectl config use-context pks`;

  return (
    <Space direction="vertical" size="middle" className={styles.container}>
      <Paragraph className={styles.title}>
        <Link href="https://github.com/PoolC/PKS-docs/tree/user-guide" target="_blank">
          <span className={styles.docs}>Docs</span> [https://github.com/PoolC/PKS-docs/tree/user-guide]
        </Link>
      </Paragraph>
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
  title: css({
    margin: '0 !important',
  }),
  docs: css({
    color: '#000',
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
