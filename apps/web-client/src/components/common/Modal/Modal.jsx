import { useEffect, useState } from 'react';
import {
  ButtonContainer,
  ContentContainer,
  HeaderBar,
  ModalBlock,
  ModalContainer,
} from './Modal.styles.js';

const Modal = ({ contents, buttons, visible, onConfirm, onCancel }) => {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!localVisible && !animate) return null;

  return (
    <ModalBlock disappear={!visible} onClick={onCancel}>
      <ModalContainer
        disappear={!visible}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <HeaderBar>
          <i className="fas fa-times" onClick={onCancel}></i>
        </HeaderBar>
        <ContentContainer>{contents}</ContentContainer>
        <ButtonContainer>{buttons}</ButtonContainer>
      </ModalContainer>
    </ModalBlock>
  );
};

export default Modal;
