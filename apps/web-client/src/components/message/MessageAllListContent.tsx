import { Button, List, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
  `,
  fullWidth: css`
    width: 100%;
  `,
  metaInfo: css`
    justify-content: space-between;
    width: 100%;
  `,
  messageType: css`
    font-weight: 700;
  `,
  topBox: css`
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  topBoxName: css`
    margin-bottom: 0;
    font-weight: 700;
    font-size: 20px;
  `,
}));

export default function MessageAllListContent() {
  const { styles } = useStyles();
  const history = useHistory();

  // TODO: API 호출로 대체
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <Space direction="vertical" className={styles.fullWidth} size="large">
      <Space className={styles.topBox}>
        <Space>
          <Button shape="circle" type="text" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
          </Button>
          <Typography.Text className={styles.topBoxName}>대화목록</Typography.Text>
        </Space>
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={() => (
          <List.Item>
            <Space direction="vertical" className={styles.fullWidth}>
              <Space className={styles.metaInfo}>
                <Typography.Text className={styles.messageType}>받은 쪽지</Typography.Text>
                <Typography.Text>2023.08.15 19:20:50</Typography.Text>
              </Space>
              <Typography.Text>내용내용내용</Typography.Text>
            </Space>
          </List.Item>
        )}
      />
    </Space>
  );
}
