import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';
import { media } from '../../../styles/responsive';

export const DetailContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 904px;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;

  &[data-has-register-action='true'] {
    ${media.compact} {
      padding-bottom: calc(76px + env(safe-area-inset-bottom));
    }
  }
`;

export const SummaryCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  padding: 22px 24px;
  border-radius: 8px;
  background: ${colors.mint[0]};
  box-shadow: 0 0 10px ${colors.gray[1]};
  box-sizing: border-box;
`;

export const SummaryHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const SummaryType = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: ${(props) => (props['data-muted'] ? colors.gray[0] : '#ffffff')};
  color: ${(props) => (props['data-muted'] ? colors.brown[0] : colors.mint[3])};
  font-size: 0.75rem;
  font-weight: 800;
`;

export const SummaryBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.55fr);
  align-items: end;
  gap: 18px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1.28;
  word-break: keep-all;

  @media (max-width: 767px) {
    font-size: 1.55rem;
  }
`;

export const SummaryMeta = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
  color: ${colors.brown[0]};
  font-size: 0.86rem;
  line-height: 1.45;

  &[data-overview] {
    width: 100%;
  }
`;

export const MetaRow = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin: 0;

  &[data-overview] {
    justify-content: flex-start;
  }

  & > span + span::before {
    content: '·';
    margin-right: 8px;
    color: ${colors.brown[0]};
  }

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

export const CapacityText = styled.span`
  color: ${colors.brown[1]};
  font-weight: 700;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 36px;
  margin-top: -4px;

  ${media.compact} {
    display: none;
  }
`;

export const StyledButton = styled(ActionButton)`
  width: auto;
  min-width: 92px;
  margin: 0;
`;

export const ActivityFloatingRegisterButton = styled.div`
  display: none;

  ${media.compact} {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    display: block;
    padding-bottom: env(safe-area-inset-bottom);
    background: ${colors.mint[2]};

    & > button {
      width: 100%;
      min-height: 64px;
      padding: 0 20px;
      border-radius: 0;
      box-shadow: none;
      font-size: 1rem;
    }
  }
`;

export const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 18px;
  border: 1px solid #eee7de;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.35;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 7px;
  padding: 12px;
  border-radius: 8px;
  background: #fbfaf8;
  box-sizing: border-box;

  @media (max-width: 767px) {
    gap: 5px;
    padding: 10px;

    &[data-wide] {
      grid-column: 1 / -1;
    }
  }
`;

export const DetailLabel = styled.span`
  color: ${colors.brown[0]};
  font-size: 0.76rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const DetailValue = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  min-height: 24px;
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.35;
  word-break: keep-all;
`;

export const PlanContainer = styled(DetailSection)``;

export const PlanContents = styled.div`
  width: 100%;
  min-height: 128px;
  padding: 18px;
  border: 1px solid #eee7de;
  border-radius: 8px;
  word-break: keep-all;
  line-height: 1.65;
  box-sizing: border-box;

  p,
  ul,
  ol {
    color: ${colors.brown[1]};
    font-size: 0.92rem;
    font-weight: 500;
  }
  ul,
  ol {
    padding-left: 1rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0;
    color: ${colors.brown[1]};
    line-height: normal;
  }
  hr {
    margin: 1rem 0;
  }
  a {
    word-break: break-all;
  }
  img {
    max-width: 100%;
  }
`;

export const PlanFileMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: #fbfaf8;
  box-sizing: border-box;
`;

export const PlanFileList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const PlanFileItem = styled.li`
  min-width: 0;
  padding: 9px 12px;
  border: 1px solid #eee7de;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;

  a {
    color: ${colors.brown[0]};
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.35;
    word-break: break-all;
    text-decoration: none;

    &:hover {
      color: ${colors.mint[3]};
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`;

export const EmptyFileState = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid #eee7de;
  border-radius: 8px;
  background: #fbfaf8;
  color: ${colors.brown[0]};
  font-size: 0.84rem;
  font-weight: 500;
  text-align: center;
  box-sizing: border-box;
`;

export const MemberContainer = styled(DetailSection)``;

export const Member = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 292px));
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, minmax(0, 292px));
  }

  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 292px);
  }
`;

export const SessionBlock = styled(DetailSection)``;

export const Sessions = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin: 0;
  padding: 0;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  max-height: ${(props) => (props['data-compact'] ? 'none' : '42px')};
  min-height: ${(props) => (props['data-compact'] ? '24px' : '42px')};
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const TagCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 2px 5px;
  border: 1px solid ${colors.mint[1]};
  border-radius: 4px;
  background-color: ${colors.gray[0]};
  color: ${colors.brown[0]};
  font-size: 0.75rem;
  font-weight: 500;
  word-break: keep-all;
`;
