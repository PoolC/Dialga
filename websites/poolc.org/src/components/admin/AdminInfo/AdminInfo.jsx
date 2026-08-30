/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from 'react';
// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@dialga/react-editor';
import useInput from '../../../hooks/useInput';
import { notEmptyValidation } from '../../../lib/utils/validation';
import {
  Description,
  EditorWrap,
  FileDisplay,
  FormContent,
  FormGrid,
  FormSection,
  ImageContainer,
  ImageGrid,
  Item,
  SectionTitle,
  StyledActionButton,
  StyledForm,
  StyledImage,
  StyledInput,
  SubmitArea,
  Title,
  TitleContainer,
  ToggleOptions,
  UploadControls,
  WideFormSection,
} from './AdminInfo.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import FileUploadButton from '../../common/Buttons/FileUploadButton';
import Modal from '../../common/Modal/Modal';
import getFileUrl from '../../../lib/utils/getFileUrl';

const AdminInfo = ({ info, onUpdate, errorMessage, buttons, errorModalVisible, onCloseErrorModal }) => {
  const editorRef = useRef();

  const [presidentName, onChangePresidentName] = useInput(info ? info.presidentName : '', notEmptyValidation);
  const [location, onChangeLocation] = useInput(info ? info.location : '', notEmptyValidation);
  const [locationUrl, setLocationUrl] = useState(info ? info.locationUrl : '동방약도.png');
  const [phoneNumber, onChangePhoneNumber] = useInput(info ? info.phoneNumber : '', notEmptyValidation);
  const [introduction, setIntroduction] = useState(info ? info.introduction : '');
  const [isSubscriptionPeriod, setIsSubscriptionPeriod] = useState(info ? info.isSubscriptionPeriod : false);
  const [mainImageUrl, setMainImageUrl] = useState(info ? info.mainImageUrl : 'poolcMainImage.png');
  const [applyUri, onChangeApplyUri] = useInput(info ? info.applyUri : '', notEmptyValidation);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 100);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, []);

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

  const onEditorChange = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    setIntroduction(markdownContent);
  };

  const getFileLabel = (fileUrl) => {
    if (!fileUrl) return '선택된 파일이 없습니다.';

    return `현재 파일: ${fileUrl.split('/').filter(Boolean).pop()}`;
  };

  return (
    <>
      <Modal contents={errorMessage} buttons={buttons} visible={errorModalVisible} onConfirm={onCloseErrorModal} onCancel={onCloseErrorModal} />
      <WhiteNarrowBlock>
        <FormContent>
          <TitleContainer>
            <Title>동아리 정보 관리</Title>
          </TitleContainer>
          <StyledForm>
            <FormGrid>
              <FormSection>
                <SectionTitle>기본 정보</SectionTitle>
                <Item>
                  <label htmlFor="presidentName">회장 이름</label>
                  <Description>홈페이지 Footer에 반영됩니다.</Description>
                  <StyledInput id="presidentName" type="text" placeholder="ex) 김풀씨" value={presidentName} onChange={onChangePresidentName} />
                </Item>
                <Item>
                  <label htmlFor="phoneNumber">전화번호</label>
                  <Description>홈페이지 Footer에 반영됩니다.</Description>
                  <StyledInput id="phoneNumber" type="text" placeholder="ex) 010-0000-0000" value={phoneNumber} onChange={onChangePhoneNumber} />
                </Item>
                <Item>
                  <label htmlFor="location">동아리방 위치</label>
                  <Description>홈페이지 Footer에 반영됩니다.</Description>
                  <StyledInput id="location" type="text" placeholder="ex) 연세대학교 제1공학관 537호" value={location} onChange={onChangeLocation} />
                </Item>
              </FormSection>
              <FormSection>
                <SectionTitle>가입 설정</SectionTitle>
                <Item>
                  <label>가입 기간 설정</label>
                  <Description>설정에 따라 상단 Apply 메뉴가 열립니다.</Description>
                  <ToggleOptions>
                    <label>
                      <input type="radio" value="possible" onChange={onChangeIsSubscriptionPeriod} checked={isSubscriptionPeriod === true} />
                      가입 가능 기간
                    </label>
                    <label>
                      <input type="radio" value="impossible" onChange={onChangeIsSubscriptionPeriod} checked={isSubscriptionPeriod !== true} />
                      가입 불가 기간
                    </label>
                  </ToggleOptions>
                </Item>
                <Item>
                  <label htmlFor="applyUri">지원서 링크</label>
                  <Description>Apply 메뉴에서 이 링크로 이동됩니다.</Description>
                  <StyledInput id="applyUri" type="text" placeholder="https://example.com" value={applyUri} onChange={onChangeApplyUri} />
                </Item>
              </FormSection>
              <WideFormSection>
                <SectionTitle>이미지 관리</SectionTitle>
                <ImageGrid>
                  <Item>
                    <label>동아리방 위치 안내 이미지</label>
                    <Description>PoolC 메뉴의 동아리 소개에 반영됩니다.</Description>
                    <UploadControls>
                      <FileUploadButton onSubmit={setLocationUrl} buttonStyle={{ margin: 0 }} />
                      <FileDisplay>{getFileLabel(locationUrl)}</FileDisplay>
                    </UploadControls>
                    <ImageContainer data-image-type="location">
                      {locationUrl ? <StyledImage src={getFileUrl(locationUrl)} /> : '현재 이미지가 없습니다'}
                    </ImageContainer>
                  </Item>
                  <Item>
                    <label>메인 이미지</label>
                    <Description>권장 크기는 1000px x 200px입니다.</Description>
                    <UploadControls>
                      <FileUploadButton onSubmit={setMainImageUrl} buttonStyle={{ margin: 0 }} />
                      <FileDisplay>{getFileLabel(mainImageUrl)}</FileDisplay>
                    </UploadControls>
                    <ImageContainer data-image-type="main">
                      {mainImageUrl ? <StyledImage src={getFileUrl(mainImageUrl)} /> : '현재 이미지가 없습니다'}
                    </ImageContainer>
                  </Item>
                </ImageGrid>
              </WideFormSection>
              <WideFormSection>
                <SectionTitle>동아리 소개</SectionTitle>
                <Description>PoolC 메뉴의 동아리 소개에 반영됩니다.</Description>
                <EditorWrap>
                  <Editor initialEditType="wysiwyg" initialValue={introduction} ref={editorRef} onChange={onEditorChange} />
                </EditorWrap>
              </WideFormSection>
            </FormGrid>
            <SubmitArea>
              <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton>
            </SubmitArea>
          </StyledForm>
        </FormContent>
      </WhiteNarrowBlock>
    </>
  );
};

export default AdminInfo;
