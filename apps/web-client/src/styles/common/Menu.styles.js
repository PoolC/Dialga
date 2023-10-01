import styled from '@emotion/styled';

export const MenuBlock = styled.div`
  min-width: 15rem;
  width: 15rem;
  margin: 0 20px 20px 0;
  padding: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.035);
  border-radius: 50px;
  padding: 30px 30px;
  margin: 0;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const MenuItem = styled.li`
  height: 2.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;
