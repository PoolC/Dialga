import { getHourMinuteString } from '../../../../lib/utils/getDateString';
import ActionButton from '../../../common/Buttons/ActionButton';
import Modal from '../../../common/Modal/Modal';

const InterviewSelectModal = ({
  date,
  startTime,
  endTime,
  visible,
  onConfirm,
  onCancel,
}) => {
  const contents = `${date} ${getHourMinuteString(
    startTime,
  )}~${getHourMinuteString(endTime)}의 면접을 신청하시겠습니까?`;
  const buttons = <ActionButton onClick={onConfirm}>신청</ActionButton>;
  return (
    <Modal
      contents={contents}
      buttons={buttons}
      onCancel={onCancel}
      visible={visible}
    />
  );
};

export default InterviewSelectModal;
