import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { HorizontalScrollArea } from '../../common/HorizontalScrollArea/HorizontalScrollArea';

export const PageHeader = styled.header`
  width: 100%;
  margin-bottom: 18px;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const InterviewTableWrapper = styled(HorizontalScrollArea)`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-radius: 8px;

  &.date-slot-table {
    border-radius: 0 0 8px 8px;
  }
`;

export const DateTables = styled.div`
  display: grid;
  width: 100%;
  gap: 24px;

  > section {
    min-width: 0;
  }
`;

export const InterviewTable = styled.table`
  width: 100%;
  min-width: 1100px;
  border-collapse: collapse;
  color: ${colors.brown[1]};
  font-size: 0.84rem;

  th, td {
    padding: 13px 14px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
    text-align: center;
    vertical-align: middle;
  }

  th {
    background: ${colors.mint[0]};
    color: ${colors.brown[1]};
    font-size: 0.8rem;
    font-weight: 800;
  }

  th:nth-of-type(1) { width: 13%; }
  th:nth-of-type(2) { width: 11%; }
  th:nth-of-type(3) { width: 9%; }
  th:nth-of-type(4) { width: 10%; }
  th:nth-of-type(5) { width: 12%; }
  th:nth-of-type(6) { width: 17%; }
  th:nth-of-type(7) { width: 16%; }
  th:nth-of-type(8) { width: 12%; }

  tbody tr:last-child td { border-bottom: 0; }

  .slot-group-start td {
    border-top: 1px solid rgba(76, 55, 34, 0.14);
  }

  td[rowspan] {
    background: rgba(229, 240, 237, 0.24);
    font-weight: 600;
  }
`;

export const DateGroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 11px 14px;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: ${colors.mint[0]};
`;

export const DateGroupTitle = styled.strong`
  color: ${colors.brown[1]};
  font-size: 1.15rem;
  font-weight: 800;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  color: ${({ 'data-tone': tone }) => tone === 'open' ? colors.mint[3] : colors.brown[0]};
  background: ${({ 'data-tone': tone }) => tone === 'open' ? '#e8f8f2' : tone === 'closed' ? '#f5eee7' : colors.gray[1]};
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ApplicantName = styled.strong`
  font-weight: 800;
`;

export const EmptyState = styled.div`
  padding: 1rem;
  color: ${colors.brown[0]};
  text-align: center;
`;
