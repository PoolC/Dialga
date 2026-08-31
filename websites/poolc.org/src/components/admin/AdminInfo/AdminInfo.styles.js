import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const FormContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 18px;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const StyledInput = styled.input`
  border: 1px solid ${colors.brown[0]};
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border-radius: 6px;
  box-sizing: border-box;
  outline: ${colors.gray[1]};
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 28px;
`;

export const StyledActionButton = styled(ActionButton)`
  width: 160px;
  margin: 0;
`;

export const FormGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 16px 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const FormSection = styled.section`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 18px;
  padding: 18px;
  border: 1px solid #eee7de;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;
`;

export const WideFormSection = styled(FormSection)`
  grid-column: 1 / -1;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.35;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SectionSummary = styled.p`
  margin: 0;
  color: ${colors.brown[0]};
  font-size: 0.8rem;
  line-height: 1.4;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;

  > label {
    margin-bottom: 8px;
    color: ${colors.brown[1]};
    font-size: 0.9rem;
    font-weight: 800;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 14px;
  overflow: hidden;
  border: 1px solid #e5e0d7;
  border-radius: 6px;
  background: #faf9f7;
  color: ${colors.brown[0]};
  font-size: 0.82rem;

  &[data-image-type='location'] {
    aspect-ratio: 16 / 9;
  }

  &[data-image-type='main'] {
    aspect-ratio: 5 / 1;
  }
`;

export const ImageContainerHeader = styled.header`
  margin: 0 0 12px;
  color: ${colors.brown[1]};
  font-size: 0.9rem;
  font-weight: 700;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Description = styled.p`
  color: ${colors.brown[0]};
  font-size: 0.82rem;
  font-weight: 500;
  margin: 0 0 10px;
  word-break: keep-all;
  text-align: left;
  line-height: 1.45;
`;

export const EditorWrap = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid #e5e0d7;
  border-radius: 8px;

  & > div {
    width: 100%;
  }
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const FileDisplay = styled.div`
  color: ${colors.brown[0]};
  font-size: 0.78rem;
  overflow-wrap: anywhere;
`;

export const UploadControls = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;

  > button {
    flex: 0 0 auto;
  }
`;

export const ToggleOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${colors.brown[1]};
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const SubmitArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
