import {
  CarouselBlock,
  MainCarousel,
  MainCarouselImage,
} from './Carousel.styles';
import mainBanner from '~/assets/main-banner.png';

const Carousel = () => {
  return (
    <CarouselBlock>
      <MainCarousel>
        <MainCarouselImage src={mainBanner} alt="main_carousel_image" />
      </MainCarousel>
    </CarouselBlock>
  );
};

export default Carousel;
