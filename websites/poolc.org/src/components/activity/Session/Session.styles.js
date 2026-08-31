import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const SessionCard = styled.li`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border-radius: 8px;
  background: ${colors.mint[0]};
  box-shadow: 0 0 10px ${colors.gray[1]};
  box-sizing: border-box;
  list-style: none;
`;

export const SessionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px 16px;
`;

export const SessionNumber = styled.h3`
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.35;
`;

export const SessionMeta = styled.p`
  margin: 0;
  color: ${colors.brown[0]};
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1.35;
`;

export const SessionDescriptionBlock = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
`;

export const Description = styled.div`
  min-width: 0;
  padding: 12px;
  border: 1px solid #eee7de;
  border-radius: 8px;
  background: #ffffff;
  color: ${colors.brown[1]};
  line-height: 1.55;
  word-break: keep-all;

  p,
  ul,
  ol {
    margin: 0.35rem 0;
    color: ${colors.brown[1]};
    font-size: 0.9rem;
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
    margin: 0.75rem 0;
    color: ${colors.brown[1]};
    line-height: normal;
  }

  hr {
    margin: 0.75rem 0;
  }

  img {
    max-width: 100%;
  }

  a {
    max-width: 100%;
    word-break: break-all;
  }

  th {
    background-color: ${colors.brown[0]};
  }
`;

export const SessionMetaGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props['data-single'] ? '1fr' : 'repeat(2, minmax(0, 1fr))')};
  gap: 12px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const SessionMetaItem = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 8px;
  background: #fbfaf8;
  box-sizing: border-box;
`;

export const SessionMetaLabel = styled.span`
  color: ${colors.brown[0]};
  font-size: 0.76rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const SessionMetaValue = styled.strong`
  color: ${colors.brown[1]};
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.3;
`;

export const AttendanceList = styled.ul`
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    list-style: none;
  }
`;

export const Attendance = styled.li`
  padding: 2px 6px;
  border: 1px solid ${colors.mint[1]};
  border-radius: 4px;
  background: #ffffff;
  color: ${colors.brown[0]};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.35;
`;

export const EmptySessionValue = styled.span`
  color: ${colors.brown[0]};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.35;
`;

export const SessionEditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -2px;

  a,
  button {
    margin: 0;
  }
`;
