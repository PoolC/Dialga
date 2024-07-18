import { Button, List, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { ConversationControllerService, queryKey, useAppSuspenseQuery } from '~/lib/api-v2';
import { dayjs } from '~/lib/utils/dayjs';
import { MENU } from '~/constants/menus';

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
  listItemLink: css`
    padding: 12px 0;
    width: 100%;
  `,
}));

export default function MessageAllListContent() {
  const { styles } = useStyles();
  const history = useHistory();

  const { data } = useAppSuspenseQuery({
    queryKey: queryKey.conversation.all,
    queryFn: ConversationControllerService.getAllConversationsUsingGet,
  });

  return (
    <Space direction="vertical" className={styles.fullWidth} size="large">
      <Space className={styles.topBox}>
        <Space>
          <Button shape="circle" type="text" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
          </Button>
          <Typography.Text className={styles.topBoxName}>대화 목록</Typography.Text>
        </Space>
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/${MENU.MESSAGE}/${item.id}`} className={styles.listItemLink}>
              <Space direction="vertical" className={styles.fullWidth}>
                <Space className={styles.metaInfo}>
                  <Typography.Text className={styles.messageType}>{item.otherLoginID}</Typography.Text>
                  <Typography.Text>{dayjs(item.lastMessage?.sentAt).format('YYYY-MM-DD HH:mm:ss')}</Typography.Text>
                </Space>
                <Typography.Text>{item.lastMessage?.content}</Typography.Text>
              </Space>
            </Link>
          </List.Item>
        )}
      />
    </Space>
  );
}
