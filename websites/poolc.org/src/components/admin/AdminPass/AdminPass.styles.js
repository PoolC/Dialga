import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const TitleRow = styled.div`
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

export const SettingsPanel = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  label {
    color: ${colors.brown[0]};
    font-size: 0.78rem;
    font-weight: 700;
  }
`;

export const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 88px;
    min-height: 36px;
    border: 1px solid rgba(76, 55, 34, 0.22);
    border-radius: 5px;
    color: ${colors.brown[1]};
    padding: 0 10px;
  }

  span {
    color: ${colors.brown[0]};
    font-size: 0.84rem;
    font-weight: 600;
  }

  button {
    margin: 0 0 0 4px;
  }
`;

export const Toolbar = styled.div`
  width: 100%;

  > div .ant-tabs-nav {
    margin-bottom: 16px;
  }
`;

export const ResultTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(76, 55, 34, 0.12);
  border-radius: 8px;
`;

export const ResultTable = styled.table`
  width: 100%;
  min-width: 840px;
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

  th:nth-of-type(1) { width: 22%; }
  th:nth-of-type(2) { width: 13%; }
  th:nth-of-type(3) { width: 18%; }
  th:nth-of-type(4) { width: 15%; }
  th:nth-of-type(5) { width: 12%; }
  th:nth-of-type(6) { width: 20%; }

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
  gap: 2px;

  strong {
    font-weight: 800;
  }

  span {
    color: ${colors.brown[0]};
    font-size: 0.74rem;
  }
`;

export const StatusChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  border-radius: 999px;
  padding: 0 9px;
  background: ${(props) => (props.type === 'AT_RISK' ? '#fff0f0' : colors.mint[0])};
  color: ${(props) => (props.type === 'AT_RISK' ? '#d95757' : colors.mint[2])};
  font-size: 0.76rem;
  font-weight: 800;
`;

export const ActionCell = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  > button {
    margin: 0;
  }

  .expelled {
    color: ${colors.brown[0]};
    font-size: 0.78rem;
    font-weight: 700;
  }
`;

export const ExpellActionButton = styled(ActionButton)`
  border: 1px solid #f2b5b5;
  background: #fff;
  color: #d95757;

  &:hover {
    background: #fff6f6;
    opacity: 1;
  }
`;

export const EmptyResult = styled.p`
  margin: 0;
  padding: 42px 20px;
  color: ${colors.brown[0]};
  font-size: 0.9rem;
  text-align: center;
`;
