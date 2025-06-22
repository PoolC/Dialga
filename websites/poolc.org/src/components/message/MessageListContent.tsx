import { Button, List, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { useAppSuspenseQuery, queryKey, ConversationControllerService } from '~/lib/api-v2';
import { dayjs } from '~/lib/utils/dayjs';

const useStyles = createStyles(({ css }) => ({
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

export default function MessageListContent() {
  const { styles } = useStyles();

  const { conversationId } = useParams<{ conversationId: string }>();

  const { data } = useAppSuspenseQuery({
    queryKey: queryKey.conversation.conversation(conversationId),
    queryFn: () => ConversationControllerService.viewConversationUsingGet({ conversationId }),
  });

  return (
    <Space direction="vertical" className={styles.fullWidth} size="large">
      <Space className={styles.topBox}>
        <Space>
          <Link to={`/${MENU.MESSAGE}`}>
            <Button shape="circle" type="text">
              <ArrowLeftOutlined />
            </Button>
          </Link>
          <Typography.Text className={styles.topBoxName}>대화 상세</Typography.Text>
        </Space>
        <Link to={`/${MENU.MESSAGE}/${conversationId}/${MENU.MESSAGE_FORM}`}>
          <Button>쪽지 보내기</Button>
        </Link>
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={data.toReversed()}
        renderItem={(item) => (
          <List.Item>
            <Space direction="vertical" className={styles.fullWidth}>
              <Space className={styles.metaInfo}>
                <Typography.Text className={styles.messageType}>{item.sentByStarter ? '보낸 쪽지' : '받은 쪽지'}</Typography.Text>
                <Typography.Text>{dayjs(item.sentAt).format('YYYY-MM-DD HH:mm:ss')}</Typography.Text>
              </Space>
              <Typography.Text>{item.content}</Typography.Text>
            </Space>
          </List.Item>
        )}
      />
    </Space>
  );
}
