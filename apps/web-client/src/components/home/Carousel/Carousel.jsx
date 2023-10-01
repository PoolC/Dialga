import {
  CarouselBlock,
  // CarouselButton,
  MainCarousel,
  MainCarouselImage,
} from './Carousel.styles';

const Carousel = () => {
  return (
    <CarouselBlock>
      <MainCarousel>
        <MainCarouselImage
          src={'/images/main-carousel-image.png'}
          alt="main_carousel_image"
        />
      </MainCarousel>
    </CarouselBlock>
  );
};

export default Carousel;
