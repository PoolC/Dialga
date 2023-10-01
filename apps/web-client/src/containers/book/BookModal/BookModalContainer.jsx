import ActionButton from '../../../components/common/Buttons/ActionButton';
import Modal from '../../../components/common/Modal/Modal';
import React from 'react';

const BookModalContainer = ({
  bookTitle,
  status,
  visible,
  onConfirm,
  onCancel,
}) => {
  const action = status === 'AVAILABLE' ? '대출' : '반납';
  const contents = `<${bookTitle}>을(를) ${action}하시겠습니까?`;
  const buttons = <ActionButton onClick={onConfirm}>{action}</ActionButton>;
  return (
    <Modal
      contents={contents}
      buttons={buttons}
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default BookModalContainer;
