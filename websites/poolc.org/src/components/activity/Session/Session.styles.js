import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const SessionCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 20px 0 10px 0;
  list-style: none;
  min-width: 200px;
`;

export const SessionDivider = styled.div`
  margin-top: 30px;
  width: 50px;
  height: 1px;
  background-color: ${colors.mint[1]};
`;

export const SessionNumber = styled.p`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Date = styled.p`
  font-weight: 300;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const Description = styled.div`
  border: 1px solid ${colors.gray[2]};
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  word-break: break-all;
  line-height: 1.5rem;
  min-width: 90%;
  max-width: 90%;
  overflow: auto;
  color: ${colors.brown[1]};
  p,
  ul,
  ol {
    font-weight: 400;
    font-size: 0.9rem;
    color: ${colors.brown[1]};
  }
  ul,
  ol {
    padding-left: 1.5rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0;
    line-height: 2.5rem;
    color: ${colors.brown[1]};
  }
  hr {
    margin: 1rem 0;
  }
  img {
    max-width: 600px;
    margin: 1rem 0;
  }
  p {
    margin: 0.5rem 0;
  }
  a {
    max-width: 100%;
    word-break: break-all;
  }
  th {
    background-color: ${colors.brown[0]};
  }
  img {
    max-width: 90%;
  }
`;

export const AttendanceList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  h5 {
    font-size: 0.9rem;
    margin: 10px 0;
    font-weight: 500;
  }
`;

export const Attendance = styled.li`
  font-size: 0.8rem;
  margin: 2px;
  font-weight: 300;
  list-style: none;
`;
