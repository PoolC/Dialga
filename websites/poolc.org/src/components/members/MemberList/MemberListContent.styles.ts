import styled from '@emotion/styled';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';
import { PageContent } from '~/components/common/PageLayout/PageLayout';
import colors from '~/lib/styles/colors';

export const MemberContent = styled(PageContent)`
  max-width: 1210px;
`;

export const MemberListBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 0;
`;

export const MemberListToolbar = styled.div`
  width: 306px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MemberSearchForm = styled.form`
  display: flex;
  width: 100%;
  gap: 8px;

  .ant-input {
    height: 36px;
    border: 1px solid #d8d0c3;
    border-radius: 6px;
    color: ${colors.brown[1]};
    font-size: 14px;
    box-shadow: none;
  }

  .ant-input::placeholder {
    color: #9b8d7b;
  }

  .ant-input:focus {
    border-color: ${colors.mint[3]};
    box-shadow: 0 0 0 3px rgb(0 168 137 / 16%);
  }

  .ant-btn {
    width: 55px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: ${colors.mint[3]};
    font-weight: 700;
    box-shadow: none;
  }

  .ant-btn:hover,
  .ant-btn:focus {
    background: ${colors.mint[3]} !important;
    opacity: 0.88;
  }
`;

export const MemberCardGrid = styled(CardGrid)`
  max-width: 1210px;
  justify-content: flex-start;
`;
