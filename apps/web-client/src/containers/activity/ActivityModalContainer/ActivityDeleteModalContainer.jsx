import ActionButton from '../../../components/common/Buttons/ActionButton';
import Modal from '../../../components/common/Modal/Modal';

const ActivityDeleteModalContainer = ({
  activityTitle,
  visible,
  onConfirm,
  onCancel,
}) => {
  const contents = `'${activityTitle}'를(을) 삭제하시겠습니까?`;
  const buttons = <ActionButton onClick={onConfirm}>삭제</ActionButton>;
  return (
    <Modal
      contents={contents}
      buttons={buttons}
      onCancel={onCancel}
      visible={visible}
    />
  );
};

export default ActivityDeleteModalContainer;
