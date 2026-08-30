import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const PageHeader = styled.header`
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${colors.gray[2]};

  h1 { margin: 0; font-size: 1.65rem; }
`;

export const HeaderSummary = styled.p`
  margin: 0.35rem 0 0;
  color: ${colors.brown[0]};
  font-size: 0.9rem;
`;

export const DateFilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.25rem 0;
`;

export const DateFilterButton = styled.button`
  padding: 0.45rem 0.7rem;
  border: 1px solid ${({ 'data-active': active }) => active ? colors.mint[2] : colors.gray[2]};
  border-radius: 4px;
  background: ${({ 'data-active': active }) => active ? colors.mint[0] : 'white'};
  color: ${({ 'data-active': active }) => active ? colors.mint[3] : colors.brown[0]};
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
  font-weight: ${({ 'data-active': active }) => active ? 600 : 400};
`;

export const InterviewTableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${colors.gray[2]};
  border-radius: 6px;
`;

export const InterviewTable = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;

  th, td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid ${colors.gray[2]};
    text-align: left;
    vertical-align: middle;
  }

  th {
    background: ${colors.mint[0]};
    color: ${colors.brown[0]};
    font-size: 0.85rem;
    font-weight: 600;
  }

  tbody tr:last-child td { border-bottom: 0; }
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

export const ExpandButton = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: ${colors.mint[3]};
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

export const ApplicantPanel = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 0.25rem 0;
`;

export const ApplicantList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid ${colors.gray[2]};
  border-radius: 4px;

  button { margin: 0; white-space: nowrap; }
`;

export const ApplicantName = styled.strong`
  display: block;
`;

export const ApplicantMeta = styled.span`
  display: block;
  margin-top: 0.2rem;
  color: ${colors.brown[0]};
  font-size: 0.85rem;
`;

export const EmptyState = styled.div`
  padding: 1rem;
  color: ${colors.brown[0]};
  text-align: center;
`;
