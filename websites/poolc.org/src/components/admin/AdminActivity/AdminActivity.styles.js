import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const PageHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;

  @media (max-width: 767px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
`;

export const ActivityTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-radius: 8px;
`;

export const ActivityTable = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  color: ${colors.brown[1]};
  font-size: 0.84rem;

  th,
  td {
    padding: 14px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
    text-align: center;
    vertical-align: middle;
  }

  th:nth-of-type(1) { width: 28%; }
  th:nth-of-type(2) { width: 10%; }
  th:nth-of-type(3) { width: 14%; }
  th:nth-of-type(4) { width: 16%; }
  th:nth-of-type(5) { width: 14%; }
  th:nth-of-type(6) { width: 18%; }

  td:first-of-type strong {
    font-weight: 800;
  }

  tbody tr:last-of-type td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: rgba(229, 240, 237, 0.45);
  }
`;

export const TableHead = styled.tr`
  background: ${colors.mint[0]};

  th {
    color: ${colors.brown[1]};
    font-size: 0.8rem;
    font-weight: 800;
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 999px;
  background: ${({ $available }) => ($available ? '#e3f8f0' : '#f3f1ee')};
  color: ${({ $available }) => ($available ? '#36a985' : '#867e75')};
  font-size: 0.76rem;
  font-weight: 800;
`;

export const AccountActions = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  > button {
    margin: 0;
  }
`;

export const AccountActionButton = styled.button`
  min-width: 56px;
  min-height: 36px;
  padding: 7px 10px;
  border: 1px solid #f2b5b5;
  border-radius: 5px;
  background: #fff;
  color: #d95757;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 800;
`;

export const EmptyResult = styled.p`
  margin: 0;
  padding: 42px 20px;
  color: ${colors.brown[0]};
  font-size: 0.9rem;
  text-align: center;
`;
