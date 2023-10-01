import { useEffect, useState } from 'react';
import {
  ButtonContainer,
  ContentContainer,
  FileLabel,
  FileName,
  FileNameContainer,
  HeaderBar,
  ModalBlock,
  ModalContainer,
  ModalName,
  StyledActionButton,
  StyledFileButton,
  StyledFileInput,
  StyledForm,
} from './FileUploadModal.styles.js';

const FileUploadModal = ({
  visible,
  file,
  onUploadFile,
  onBrowseFile,
  onCancel,
}) => {
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
      <ModalContainer disappear={!visible} onClick={(e) => e.stopPropagation()}>
        <HeaderBar>
          <i className="fas fa-times" onClick={onCancel}></i>
        </HeaderBar>
        <ContentContainer>
          <ModalName>파일 업로드</ModalName>
          <StyledForm encType="multipart/form-data" onSubmit={onUploadFile}>
            <FileNameContainer>
              <FileLabel>선택된 파일</FileLabel>
              {file ? (
                <FileName>{file?.name}</FileName>
              ) : (
                <FileName>선택된 파일이 없습니다</FileName>
              )}
            </FileNameContainer>
            <ButtonContainer>
              <StyledFileButton
                className="browse-file"
                htmlFor="my_file"
                onChange={onBrowseFile}
              >
                파일 찾기
              </StyledFileButton>
              <StyledActionButton className="upload-file">
                이 파일 첨부
              </StyledActionButton>
            </ButtonContainer>
            <StyledFileInput type="file" onChange={onBrowseFile} id="my_file" />
          </StyledForm>
        </ContentContainer>
      </ModalContainer>
    </ModalBlock>
  );
};

export default FileUploadModal;
