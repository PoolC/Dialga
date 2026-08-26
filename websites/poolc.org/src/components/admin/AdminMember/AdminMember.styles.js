import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const PageHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;

  @media (max-width: 768px) {
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

export const TitleMeta = styled.p`
  margin: 8px 0 0;
  color: ${colors.brown[0]};
  font-size: 0.9rem;
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const FilterControl = styled.select`
  height: 38px;
  padding: 0 30px 0 10px;
  border: 1px solid #d8d0c6;
  border-radius: 6px;
  background: #fff;
  color: ${colors.brown[1]};
  font-size: 0.875rem;
`;

export const TabFilterRow = styled.div`
  position: relative;
  width: 100%;

  > div {
    width: 100%;

    .ant-tabs-nav {
      padding-right: 210px;
    }
  }

  > select {
    position: absolute;
    top: 6px;
    right: 0;
  }
`;

export const MemberTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-radius: 8px;
`;

export const MemberTable = styled.table`
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  color: ${colors.brown[1]};
  font-size: 0.84rem;

  th,
  td {
    padding: 13px 14px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
    text-align: center;
    vertical-align: middle;
  }

  th:nth-of-type(1) { width: 20%; }
  th:nth-of-type(2) { width: 15%; }
  th:nth-of-type(3) { width: 13%; }
  th:nth-of-type(4) { width: 18%; }
  th:nth-of-type(5) { width: 18%; }
  th:nth-of-type(6) { width: 16%; }

  tbody tr:last-of-type td {
    border-bottom: 0;
  }
`;

export const TableHead = styled.tr`
  background: ${colors.mint[0]};

  th {
    color: ${colors.brown[1]};
    font-size: 0.8rem;
    font-weight: 800;
    text-align: center;
  }
`;

export const MemberListRow = styled.tr`
  cursor: pointer;

  &:hover {
    background: rgba(229, 240, 237, 0.45);
  }

`;

export const MemberIdentity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  strong {
    font-weight: 800;
  }

  span {
    color: ${colors.brown[0]};
    font-size: 0.76rem;
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  padding: 4px 7px;
  border-radius: 999px;
  background: #f3f4f5;
  color: ${colors.brown[0]};
  font-size: 0.75rem;
  font-weight: 800;
`;

export const RoleSelect = styled.select`
  min-width: 96px;
  height: 32px;
  padding: 0 6px;
  border: 1px solid #d8d0c6;
  border-radius: 5px;
  background: #fff;
  color: ${colors.brown[1]};
  font-size: 0.78rem;
`;

export const RoleActionButton = styled.button`
  min-height: 32px;
  padding: 0 9px;
  border: 1px solid ${({ $active }) => ($active ? colors.mint[2] : '#b7ded1')};
  border-radius: 5px;
  background: ${({ $active }) => ($active ? colors.mint[0] : '#fff')};
  color: ${colors.mint[3]};
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 800;

  &:disabled {
    border-color: #e1e1e1;
    color: #9b9b9b;
    cursor: default;
  }
`;

export const AccountActionButton = styled.button`
  min-width: 78px;
  padding: 7px 10px;
  border: 1px solid #f2b5b5;
  border-radius: 5px;
  background: #fff;
  color: #d95757;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
`;

export const AccountActions = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const EmptyResult = styled.p`
  margin: 0;
  padding: 42px 20px;
  color: ${colors.brown[0]};
  font-size: 0.9rem;
  text-align: center;
`;
