import { Form, Input } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import useCopy from '../../hooks/useCopy';

const USER_NAME = 'poolini';

const PASSWORD = 'rgbc0ffee';

export default function MyPageArgoCDForm() {
  const { styles } = useStyles();

  const { isCopied: isUserNameCopied, copy: copyUserName } = useCopy();
  const { isCopied: isPasswordCopied, copy: copyPassword } = useCopy();

  return (
    <Form layout="vertical">
      <Form.Item label="username" className={styles.inputWrap}>
        <Input value={USER_NAME} readOnly addonAfter={isUserNameCopied ? <CheckOutlined /> : <CopyOutlined onClick={() => copyUserName(USER_NAME)} />} />
      </Form.Item>
      <Form.Item label="password" className={styles.inputWrap}>
        <Input value={PASSWORD} readOnly addonAfter={isPasswordCopied ? <CheckOutlined /> : <CopyOutlined onClick={() => copyPassword(PASSWORD)} />} />
      </Form.Item>
    </Form>
  );
}

const useStyles = createStyles(({ css }) => ({
  inputWrap: css({
    marginBottom: '8px',
  }),
}));
