import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import colors from '../../../lib/styles/colors';

export const ProjectCardBlock = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  min-height: 300px;
  margin: 0;

  &[data-variant='home'] {
    width: 260px;
    height: 260px;
    min-height: 260px;
    margin: 10px;
  }

  &[data-variant='home']:first-of-type {
    margin-left: 0;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.mint[0]};
  border-radius: 12px;
  width: 290px;
  height: 300px;
  box-shadow: 0px 0px 10px ${colors.gray[1]};
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 18px ${colors.gray[2]};
    transform: translateY(-2px);
    transition: 0.3s;
  }

  &[data-variant='home'] {
    align-items: center;
    width: 260px;
    height: 250px;
    padding: 10px 0;
    border-radius: 12px;
  }

  &[data-variant='home']:hover {
    opacity: 80%;
    box-shadow: 0px 0px 10px ${colors.gray[1]};
    transform: none;
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 270px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;

  [data-variant='home'] & {
    width: 240px;
    height: 120px;
    aspect-ratio: auto;
    border-radius: 8px;
  }
`;

export const ProjectThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  [data-variant='home'] & {
    width: 240px;
    height: 120px;
  }
`;

export const TextContent = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  padding-top: 10px;

  [data-variant='home'] & {
    width: 230px;
    height: 110px;
    flex: 0 0 auto;
    padding-top: 8px;
  }
`;

export const ProjectTitle = styled.p`
  display: -webkit-box;
  min-height: 44px;
  margin: 0 0 6px;
  overflow: hidden;
  color: ${colors.brown[1]};
  font-size: 1.03rem;
  font-weight: 600;
  line-height: 1.35;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  [data-variant='home'] & {
    display: block;
    min-height: 24px;
    margin: 0 0 4px;
    font-size: 1.2rem;
    line-height: 1.25;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
  }
`;

export const ProjectGenre = styled.p`
  display: flex;
  min-height: 18px;
  align-items: center;
  gap: 6px;
  margin: 0 0 7px;
  overflow: hidden;
  color: ${colors.brown[0]};
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;

  & > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [data-variant='home'] & {
    width: 230px;
    min-height: 18px;
    margin: 0 0 4px;
    font-size: 0.8rem;
  }
`;

export const ProjectTrack = styled.span`
  flex: 0 0 auto;
  max-width: 112px;
  overflow: hidden;
  border-radius: 6px;
  background-color: #ffffff;
  color: ${colors.mint[3]};
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.35;
  padding: 2px 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProjectDescription = styled.p`
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: ${colors.brown[1]};
  font-size: 0.75rem;
  font-weight: 300;
  word-break: keep-all;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 768px) {
    display: none;
  }

  [data-variant='home'] & {
    width: 230px;
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    -webkit-line-clamp: 2;
  }
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
