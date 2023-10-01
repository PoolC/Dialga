import ActionButton from '../../../components/common/Buttons/ActionButton';
import Modal from '../../../components/common/Modal/Modal';

const ActivityRegisterModalContainer = ({
  activityTitle,
  visible,
  onConfirm,
  onCancel,
  isRegister,
}) => {
  const contents = isRegister
    ? `'${activityTitle}'를(을) 신청하시겠습니까?`
    : `'${activityTitle}'를(을) 신청 취소하시겠습니까?`;
  const buttons = isRegister ? (
    <ActionButton onClick={onConfirm}>신청</ActionButton>
  ) : (
    <ActionButton onClick={onConfirm}>신청 취소</ActionButton>
  );
  return (
    <Modal
      contents={contents}
      buttons={buttons}
      onCancel={onCancel}
      visible={visible}
    />
  );
};

export default ActivityRegisterModalContainer;
