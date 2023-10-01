import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { Link } from 'react-router-dom';

export const ProjectCardBlock = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 210px;

  &:first-of-type {
    margin-left: 0;
  }

  /*&:last-child {
    margin-right: 100px;
  } */
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.mint[0]};
  border-radius: 20px;
  width: 260px;
  height: 200px;
  box-shadow: 0px 0px 10px ${colors.gray[1]};
  padding: 10px 0px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 80%;
    transition: 0.3s;
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 240px;
  height: 120px;
  overflow: hidden;
  border-radius: 10px;
`;

export const ProjectThumbnail = styled.img`
  width: 240px;
  height: 120px;
  flex: 5;
  object-fit: cover;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
`;

export const ProjectTitle = styled.p`
  display: flex;
  align-items: center;
  width: 230px;
  flex: 2;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const ProjectGenre = styled.p`
  display: flex;
  flex: 1;
  width: 230px;
  font-size: 0.8rem;
`;

export const ProjectDescription = styled.p`
  display: flex;
  flex: 2;
  width: 230px;
  font-size: 0.7rem;
  font-weight: 300;
  word-break: keep-all;
  line-height: 1rem;
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
