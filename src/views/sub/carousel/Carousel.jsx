import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload';

function Carousel(props) {
  const { companyPhoto } = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    m:3,
  }

  return (
    <Slider {...settings}>
      {companyPhoto && companyPhoto.map((photo, index) => {
        return (
            <img src={photo} alt={`Slide ${index + 1}`} key={index}/>
        )
      })}
    </Slider>
  );
}

Carousel.propTypes = {
    companyPhoto: PropTypes.array,
}

Carousel.defaultProps = {
    companyPhoto: [],
}
export default Carousel;
