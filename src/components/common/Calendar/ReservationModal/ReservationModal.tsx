import React, { useState } from 'react';
import { ReservationModalBlock, ReservationModalContainer } from './ReservationModal.style';
import { ButtonContainer, ContentContainer, HeaderBar } from '../../Modal/Modal.styles';

export const ReservationModal: React.FC<{
  offsetX: number;
  offsetY: number;
  visible: boolean;
  onCancel: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ offsetX, offsetY, visible, onCancel }) => {
  const buttons = '';
  const contents = '';
  
  return (
    <ReservationModalBlock disappear={!visible} onClick={onCancel}>
      <ReservationModalContainer
        offsetX={offsetX}
        offsetY={offsetY}
        disappear={!visible}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <HeaderBar>
          <i className="fas fa-times" onClick={onCancel}></i>
        </HeaderBar>
        <ContentContainer>{contents}</ContentContainer>
        <ButtonContainer>{buttons}</ButtonContainer>
      </ReservationModalContainer>
  </ReservationModalBlock>);
}