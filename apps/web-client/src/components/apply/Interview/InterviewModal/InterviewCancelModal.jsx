import { getHourMinuteString } from '../../../../lib/utils/getDateString';
import ActionButton from '../../../common/Buttons/ActionButton';
import Modal from '../../../common/Modal/Modal';

const InterviewCancelModal = ({
  date,
  startTime,
  endTime,
  visible,
  onConfirm,
  onCancel,
}) => {
  const contents = `${date} ${getHourMinuteString(
    startTime,
  )}~${getHourMinuteString(endTime)}의 면접을 취소하시겠습니까?`;
  const buttons = <ActionButton onClick={onConfirm}>신청 취소</ActionButton>;
  return (
    <Modal
      contents={contents}
      buttons={buttons}
      onCancel={onCancel}
      visible={visible}
    />
  );
};

export default InterviewCancelModal;
