import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { FormEventHandler, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { MessageControllerService, useAppMutation } from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';

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
  textarea: css`
    min-height: 300px !important;
    resize: none;
  `,
}));

export default function MessageFormView() {
  const { styles } = useStyles();
  // TODO: react-hook-form 기반으로 변경
  const [content, setContent] = useState('');
  const history = useHistory();
  const { conversationId } = useParams<{ conversationId: string }>();

  const { mutate: sendMessage } = useAppMutation({
    mutationFn: () =>
      MessageControllerService.sendMessageUsingPost({
        request: {
          content,
          conversationId,
        },
      }),
  });

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    sendMessage(undefined, {
      onSuccess: () => {
        history.push(`/${MENU.MESSAGE}/${conversationId}`);
      },
    });
  };

  return (
    <Block>
      <WhiteBlock className={styles.whiteBlock}>
        <form onSubmit={onFormSubmit} className={styles.fullWidth}>
          <Space direction="vertical" className={styles.fullWidth} size="large">
            <Space className={styles.topBox}>
              <Space>
                <Button shape="circle" type="text" onClick={() => history.goBack()}>
                  <ArrowLeftOutlined />
                </Button>
                <Typography.Text className={styles.topBoxName}>쪽지보내기</Typography.Text>
              </Space>
            </Space>
            <Input.TextArea className={styles.textarea} value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="primary" block htmlType="submit">
              보내기
            </Button>
          </Space>
        </form>
      </WhiteBlock>
    </Block>
  );
}
