import ActionButton from '../../../components/common/Buttons/ActionButton';
import Modal from '../../../components/common/Modal/Modal';

const RegisterModalContainer = ({ visible, onConfirm, onCancel, message }) => {
  const action = '확인';
  const buttons = <ActionButton onClick={onConfirm}>{action}</ActionButton>;
  return (
    <Modal
      contents={message}
      buttons={buttons}
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default RegisterModalContainer;
