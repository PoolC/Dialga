import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const CarouselBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  max-width: 1366px;
  max-height: 400px;
  margin: 0px 0 40px 0;
`;

export const MainCarousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  border-radius: 50px;
  box-shadow: ${colors.gray[1]};
  height: 50vh;
  overflow: hidden;
  max-height: 400px;
`;

export const MainCarouselImage = styled.img`
  height: 50vh;
  max-width: 1366px;
  max-height: 400px;
  border-radius: 50px;
`;

export const CarouselButton = styled.button`
  position: relative;
  font-size: 1rem;
  color: ${colors.brown[1]};
  opacity: 50%;
  transition: 0.3s;
  &:hover {
    opacity: 100%;
    transition: 0.3s;
  }
  &.carousel_prev {
    left: 30px;
  }
  &.carousel_next {
    right: 30px;
  }
`;
