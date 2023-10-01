import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { Link } from 'react-router-dom';

export const RecentProjectBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: 0px 0 300px 0;
  max-width: 1366px;
  @media (max-width: 576px) {
    margin-bottom: 500px;
  }

  & > .project_container_title {
    padding-left: 20px;
    width: 90%;
    font-weight: 700;
    margin-bottom: 30px;
    color: ${colors.brown[1]};
  }
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
`;

export const RecentProjectList = styled.ul`
  width: 90%;
  display: flex;
  align-items: center;
  overflow: scroll;
  scrollbar-color: none;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const PrevButton = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 52%;
  left: 3.5%;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: white;
  z-index: 10;
  text-decoration: none;
  font-size: 1rem;
  color: ${colors.brown[1]};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%);
  @media (max-width: 768px) {
    display: none;
  }
  &:hover {
    text-decoration: none;
  }
`;

export const NextButton = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 52%;
  right: 3.5%;
  border-radius: 2rem;
  background-color: white;
  z-index: 10;
  text-decoration: none;
  font-size: 1rem;
  color: ${colors.brown[1]};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%);
  @media (max-width: 768px) {
    display: none;
  }
  &:hover {
    text-decoration: none;
  }
`;
