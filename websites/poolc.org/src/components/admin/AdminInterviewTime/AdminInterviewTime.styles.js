import styled from '@emotion/styled';
import ActionButton from '../../common/Buttons/ActionButton';
import colors from '../../../lib/styles/colors';

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${colors.gray[2]};

  h1 { margin: 0; font-size: 1.65rem; }
  @media (max-width: 640px) { align-items: flex-start; flex-direction: column; }
`;

export const HeaderSummary = styled.p`
  margin: 0.35rem 0 0;
  color: ${colors.brown[0]};
  font-size: 0.9rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  button { margin: 0; }
`;

export const DateList = styled.div`
  display: grid;
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

export const DateGroup = styled.section`
  overflow: hidden;
  border: 1px solid ${colors.gray[2]};
  border-radius: 6px;
`;

export const DateGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: ${colors.gray[0]};
  border-bottom: 1px solid ${colors.gray[2]};
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
  padding: 0.45rem 0.55rem;
  border: 1px solid ${colors.gray[2]};
  border-radius: 4px;
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
  min-width: 720px;
  border-collapse: collapse;
  text-align: left;
  th, td { padding: 0.8rem 1rem; border-bottom: 1px solid ${colors.gray[2]}; vertical-align: middle; }
  th { color: ${colors.brown[0]}; background: ${colors.mint[0]}; font-size: 0.85rem; font-weight: 600; }
  tbody tr:last-child td { border-bottom: 0; }
`;

export const SlotInput = styled.input`
  width: 6.5rem;
  padding: 0.42rem 0.5rem;
  border: 1px solid ${colors.gray[2]};
  border-radius: 4px;
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
  padding: 2.5rem 1rem;
  border: 1px dashed ${colors.gray[2]};
  border-radius: 6px;
  text-align: center;
  color: ${colors.brown[0]};

  p { margin: 0 0 0.85rem; }
  button { margin: 0; }
`;
