import styled from '@emotion/styled';
import ActionButton from '../../common/Buttons/ActionButton';
import colors from '../../../lib/styles/colors';

export const PageHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;

  @media (max-width: 768px) { align-items: stretch; flex-direction: column; }
`;

export const Title = styled.h2`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  button { margin: 0; }
`;

export const DateList = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  margin-top: 2px;
`;

export const DateGroup = styled.section`
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-radius: 8px;
`;

export const DateGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  background: white;
  border-bottom: 1px solid rgba(76, 55, 34, 0.08);
  @media (max-width: 640px) { align-items: flex-start; flex-wrap: wrap; }
`;

export const DateLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 600;
`;

export const DateInput = styled.input`
  width: 9.5rem;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d8d0c6;
  border-radius: 5px;
  background: white;
  font: inherit;
`;

export const DateGroupMeta = styled.span`
  color: ${colors.brown[0]};
  font-size: 0.85rem;
`;

export const AddSlotButton = styled(ActionButton)`
  margin: 0 0 0 auto;
  @media (max-width: 640px) { margin-left: 0; }
`;

export const SlotTableWrapper = styled.div`overflow-x: auto;`;

export const SlotTable = styled.table`
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  color: ${colors.brown[1]};
  font-size: 0.84rem;
  th, td { padding: 13px 14px; border-bottom: 1px solid rgba(76, 55, 34, 0.08); text-align: center; vertical-align: middle; }
  th { color: ${colors.brown[1]}; background: ${colors.mint[0]}; font-size: 0.8rem; font-weight: 800; }
  tbody tr:last-child td { border-bottom: 0; }
`;

export const SlotInput = styled.input`
  width: 6.5rem;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d8d0c6;
  border-radius: 5px;
  font: inherit;
  &[type='number'] { width: 3.75rem; text-align: right; }
`;

export const SlotCapacity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ 'data-tone': tone }) => (tone === 'empty' ? colors.brown[0] : tone === 'closed' ? colors.brown[0] : colors.mint[3])};
  background: ${({ 'data-tone': tone }) => (tone === 'empty' ? colors.gray[1] : tone === 'closed' ? '#f5eee7' : '#e8f8f2')};
`;

export const SlotActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  white-space: nowrap;
  button { margin: 0; }
`;

export const EmptySlotState = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${colors.brown[0]};
`;

export const DateSection = styled.div`
  padding: 14px;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-radius: 8px;
  text-align: right;
  color: ${colors.brown[0]};

  p { display: inline; margin: 0 12px 0 0; font-size: 0.85rem; }
  button { margin: 0; }
`;
