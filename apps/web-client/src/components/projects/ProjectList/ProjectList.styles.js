import styled from '@emotion/styled';

export const Project = styled.ul`
  width: 90%;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  max-width: 1200px;
  @media (max-width: 576px) {
    flex-flow: column;
  }
`;
