import mainBanner from '~/assets/images/main-banner.png';
import { CarouselBlock, MainCarousel, MainCarouselImage } from './Carousel.styles';

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
