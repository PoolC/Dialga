import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useInput from '../../../hooks/useInput';
import { notEmptyValidation } from '../../../lib/utils/validation';
import {
  Description,
  ImageContainer,
  ImageContainerHeader,
  StyledActionButton,
  StyledForm,
  StyledImage,
  StyledInput,
  TitleContainer,
} from './AdminInfo.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import { FileName } from '../../common/FileUploadModal/FileUploadModal.styles';
import FileUploadButton from '../../common/Buttons/FileUploadButton';
import Modal from '../../common/Modal/Modal';
import getFileUrl from '../../../lib/utils/getFileUrl';

const AdminInfo = ({
  info,
  onUpdate,
  errorMessage,
  buttons,
  errorModalVisible,
  onCloseErrorModal,
}) => {
  const editorRef = useRef();

  const [presidentName, onChangePresidentName] = useInput(
    info ? info.presidentName : '',
    notEmptyValidation,
  );
  const [location, onChangeLocation] = useInput(
    info ? info.location : '',
    notEmptyValidation,
  );
  const [locationUrl, setLocationUrl] = useState(
    info ? info.locationUrl : '동방약도.png',
  );
  const [phoneNumber, onChangePhoneNumber] = useInput(
    info ? info.phoneNumber : '',
    notEmptyValidation,
  );
  const [introduction, setIntroduction] = useState(
    info ? info.introduction : '',
  );
  const [isSubscriptionPeriod, setIsSubscriptionPeriod] = useState(
    info ? info.isSubscriptionPeriod : false,
  );
  const [mainImageUrl, setMainImageUrl] = useState(
    info ? info.mainImageUrl : 'poolcMainImage.png',
  );
  const [applyUri, onChangeApplyUri] = useInput(
    info ? info.applyUri : '',
    notEmptyValidation,
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate({
      presidentName,
      phoneNumber,
      location,
      locationUrl,
      introduction,
      mainImageUrl,
      isSubscriptionPeriod,
      applyUri,
    });
  };

  const onChangeIsSubscriptionPeriod = (e) => {
    setIsSubscriptionPeriod(e.target.value === 'possible');
  };

  const onEditorChange = (e) => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    setIntroduction(markdownContent);
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
        <TitleContainer>동아리 정보 관리</TitleContainer>
        <StyledForm>
          <label>회장 이름</label>
          <Description>홈페이지 Footer에 반영됩니다</Description>
          <StyledInput
            type="text"
            placeholder="ex) 김풀씨"
            value={presidentName}
            onChange={onChangePresidentName}
          />
          <label>전화번호</label>
          <Description>홈페이지 Footer에 반영됩니다</Description>
          <StyledInput
            type="text"
            placeholder="ex) 010-0000-0000"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
          />
          <label>동아리방 위치</label>
          <Description>홈페이지 Footer에 반영됩니다</Description>
          <StyledInput
            type="text"
            placeholder="ex) 연세대학교 제1공학관 537호"
            value={location}
            onChange={onChangeLocation}
          />
          <label>동아리방 위치 안내 이미지</label>
          <Description>
            홈페이지 PoolC 메뉴-'동아리 소개'에 반영됩니다
          </Description>
          <FileUploadButton onSubmit={setLocationUrl} />
          <FileName style={{ marginBottom: '0rem' }}>
            {locationUrl ? getFileUrl(locationUrl) : '선택된 파일이 없습니다'}
          </FileName>
          <ImageContainer>
            <ImageContainerHeader>현재 이미지</ImageContainerHeader>
            {locationUrl ? (
              <StyledImage src={getFileUrl(locationUrl)} />
            ) : (
              '현재 이미지가 없습니다'
            )}
          </ImageContainer>
          <label>동아리 소개</label>
          <Description>
            홈페이지 PoolC 메뉴-'동아리 소개'에 반영됩니다
          </Description>
          <Editor
            initialEditType="wysiwyg"
            initialValue={introduction}
            ref={editorRef}
            onChange={(e) => onEditorChange(e)}
          />
          <label>메인 이미지 관리</label>
          <Description>
            이미지 사이즈는 1000px * 200px으로 맞춰주세요
          </Description>
          <FileUploadButton onSubmit={setMainImageUrl} />
          <FileName style={{ marginBottom: '0rem' }}>
            {mainImageUrl ? getFileUrl(mainImageUrl) : '선택된 파일이 없습니다'}
          </FileName>
          <ImageContainer>
            <ImageContainerHeader>현재 이미지</ImageContainerHeader>
            {mainImageUrl ? (
              <StyledImage src={getFileUrl(mainImageUrl)} />
            ) : (
              '현재 이미지가 없습니다'
            )}
          </ImageContainer>
          <label>가입 기간 설정</label>
          <Description>설정에 따라 상단 apply 메뉴가 열립니다.</Description>
          <div>
            <input
              type="radio"
              value="possible"
              onChange={onChangeIsSubscriptionPeriod}
              checked={isSubscriptionPeriod === true ? true : false}
            />
            <span>가입 가능 기간</span>
            <input
              type="radio"
              value="impossible"
              onChange={onChangeIsSubscriptionPeriod}
              checked={isSubscriptionPeriod === true ? false : true}
            />
            <span>가입 불가 기간</span>
          </div>
          <label>지원서 링크</label>
          <Description>apply 메뉴에서 이 링크로 이동됩니다.</Description>
          <StyledInput
            type="text"
            placeholder="http://example.com"
            value={applyUri}
            onChange={onChangeApplyUri}
          />
          <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton>
        </StyledForm>
      </WhiteNarrowBlock>
    </>
  );
};

export default AdminInfo;
