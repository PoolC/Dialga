import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import classNames from 'classnames';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    &.scope {
      padding: 30px 20px;
    }
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

export default function MyPageMessageFormPage() {
  const { styles } = useStyles();
  const [content, setContent] = useState('');
  const history = useHistory();

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <Space
          direction={'vertical'}
          className={styles.fullWidth}
          size={'large'}
        >
          <Space className={styles.topBox}>
            <Space>
              <Button
                shape="circle"
                type="text"
                onClick={() => history.goBack()}
              >
                <ArrowLeftOutlined />
              </Button>
              <Typography.Text className={styles.topBoxName}>
                쪽지보내기
              </Typography.Text>
            </Space>
          </Space>
          <Input.TextArea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="primary" block>
            메세지 보내기
          </Button>
        </Space>
      </WhiteBlock>
    </Block>
  );
}
