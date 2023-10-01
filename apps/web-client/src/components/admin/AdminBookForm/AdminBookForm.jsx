import { useState } from 'react';
import useInput from '../../../hooks/useInput';
import getFileUrl from '../../../lib/utils/getFileUrl';
import throttle from '../../../lib/utils/throttle';
import { notEmptyValidation } from '../../../lib/utils/validation';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import FileUploadButton from '../../common/Buttons/FileUploadButton';
import { FileName } from '../../common/FileUploadModal/FileUploadModal.styles';
import Modal from '../../common/Modal/Modal';
import {
  ImageContainer,
  ImageContainerHeader,
  StyledImage,
} from '../AdminInfo/AdminInfo.styles';
import {
  StyledActionButton,
  StyledForm,
  StyledInput,
  TitleContainer,
} from './AdminBookForm.styles';

const AdminBookForm = ({
  onCreateBook,
  onUpdateBook,
  book,
  errorMessage,
  buttons,
  errorModalVisible,
  onCloseErrorModal,
}) => {
  const [title, onChangeTitle] = useInput(
    book ? book.title : '',
    notEmptyValidation,
  );
  const [author, onChangeAuthor] = useInput(
    book ? book.author : '',
    notEmptyValidation,
  );
  const [imageURL, setImageURL] = useState(book ? book.imageURL : '');
  const [info, onChangeInfo] = useInput(
    book ? book.info : '',
    notEmptyValidation,
  );
  const handleCreate = throttle((e) => {
    e.preventDefault();
    onCreateBook({ title, author, imageURL, info });
  }, 1000);
  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateBook({ title, author, imageURL, info });
  };
  return (
    <>
      <Modal
        contents={errorMessage}
        buttons={buttons}
        visible={errorModalVisible}
        onConfirm={onCloseErrorModal}
        onCancel={onCloseErrorModal}
      />
      <WhiteNarrowBlock>
        <TitleContainer>도서 생성</TitleContainer>
        <StyledForm>
          <StyledInput
            valueText={title}
            labelText="책 제목"
            typeText="text"
            nameText="title"
            onChangeFunc={onChangeTitle}
            placeholderText="ex) 클린 코드"
          />
          <StyledInput
            valueText={author}
            labelText="저자"
            typeText="text"
            nameText="author"
            onChangeFunc={onChangeAuthor}
            placeholderText="ex) 로버트 C. 마틴"
          />
          <label>표지 이미지 첨부</label>
          <FileUploadButton onSubmit={setImageURL} />
          <FileName style={{ marginBottom: '0rem' }}>
            {imageURL ? getFileUrl(imageURL) : '선택된 파일이 없습니다'}
          </FileName>
          <ImageContainer>
            <ImageContainerHeader>현재 이미지</ImageContainerHeader>
            {imageURL ? (
              <StyledImage src={getFileUrl(imageURL)} />
            ) : (
              <p style={{ fontWeight: 300 }}>이미지가 없습니다.</p>
            )}
          </ImageContainer>
          <StyledInput
            valueText={info}
            labelText="설명"
            typeText="text"
            nameText="info"
            onChangeFunc={onChangeInfo}
            placeholderText="ex) ㅇㅇㅇ 기증"
          />
          {book ? (
            <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton>
          ) : (
            <StyledActionButton onClick={handleCreate}>제출</StyledActionButton>
          )}
        </StyledForm>
      </WhiteNarrowBlock>
    </>
  );
};

export default AdminBookForm;
