import { Button, List, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import { MENU } from '~/constants/menus';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    padding: 30px 20px;
  `,
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

export default function MyPageMessageListPage() {
  const { styles } = useStyles();
  const history = useHistory();
  const { conversationId } = useParams<{ conversationId: string }>();

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
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <Space direction="vertical" className={styles.fullWidth} size="large">
          <Space className={styles.topBox}>
            <Space>
              <Button shape="circle" type="text" onClick={() => history.goBack()}>
                <ArrowLeftOutlined />
              </Button>
              <Typography.Text className={styles.topBoxName}>익명</Typography.Text>
            </Space>
            <Link to={`/${MENU.MESSAGE}/${conversationId}/${MENU.MESSAGE_FORM}`}>
              <Button>쪽지 보내기</Button>
            </Link>
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
      </WhiteBlock>
    </Block>
  );
}
