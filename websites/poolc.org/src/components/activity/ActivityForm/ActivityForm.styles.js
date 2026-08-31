import styled from '@emotion/styled';
import { Input } from 'antd';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';
import { media } from '../../../styles/responsive';

export const FormContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1210px;
  flex-direction: column;
  align-items: stretch;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 0 0 28px 0;

  ${media.mobile} {
    align-items: center;
  }
`;

export const Title = styled.h2`
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
  margin: 0;

  ${media.mobile} {
    font-size: 2rem;
    text-align: center;
  }
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
  align-items: start;
  gap: 16px 20px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const FormSection = styled.section`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 14px;
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
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.35;
`;

export const ItemContainer = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  label {
    margin-bottom: 8px;
    color: ${colors.brown[1]};
    font-size: 0.9rem;
    font-weight: 800;
  }
  textarea {
    outline: 0;
  }
  & > input,
  & > .ant-input {
    width: 100%;
    max-width: none;
  }
  & > p {
    color: ${colors.brown[0]};
    font-size: 0.82rem;
    font-weight: 500;
    margin-bottom: 10px;
    word-break: keep-all;
    text-align: left;
    line-height: 1.45;
  }
`;

export const Plan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e5e0d7;
  border-radius: 8px;
  overflow: hidden;
  & > div {
    width: 100%;
  }
`;

export const StyledInput = styled(Input)`
  outline: 0;
  border: 1px solid #d8d0c3;
  height: 38px;
  border-radius: 6px;
  width: 100%;
  max-width: none;
  outline: ${colors.gray[1]};
  &.capacity {
    width: 5rem;
    margin-right: 10px;
  }
  &.startDate {
    width: 10rem;
  }
`;

export const Tag = styled.div`
  color: ${colors.mint[3]};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid ${colors.mint[1]};
  padding: 3px 8px;
  border-radius: 6px;
  &:hover {
    opacity: 0.5;
  }
`;

export const TagListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  margin-top: 10px;
`;

export const TagInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  & > input {
    flex: 1;
    min-width: 0;
  }
  & > button {
    flex: 0 0 auto;
    margin: 0;
  }
`;

export const TagListHeader = styled.header`
  margin: 16px 0 4px 0;
  color: ${colors.brown[1]};
  font-size: 0.86rem;
  font-weight: 800;
`;

export const HourContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-bottom: 0.7rem;
  & > .hour {
    width: 3rem;
  }
  & > input {
    margin-right: 0;
  }
  & > span {
    flex: 0 0 auto;
    color: ${colors.brown[1]};
    font-weight: 600;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  & > button {
    margin: 0;
  }
`;

export const CapacityContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & > input {
    width: 8rem;
    max-width: 8rem;
  }
  & > span {
    margin-left: 0.5rem;
    color: ${colors.brown[1]};
    font-weight: 600;
  }
`;

export const TypeOptions = styled.div`
  display: flex;
  gap: 14px;

  ${media.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

export const RadioOption = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 !important;
  font-weight: 600 !important;
`;

export const AttachmentSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const AttachmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  ${media.mobile} {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const EmptyFileState = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px dashed #d8d0c3;
  border-radius: 8px;
  color: ${colors.brown[0]};
  font-size: 0.86rem;
  font-weight: 500;
  text-align: center;
  box-sizing: border-box;
`;

export const SubmitArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 4px;
`;
