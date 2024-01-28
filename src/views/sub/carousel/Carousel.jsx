import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types'

function Carousel(props) {
  const { companyPhoto } = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <Slider {...settings}>
      {companyPhoto && companyPhoto.map((photo, index) => {
        console.log('photo', photo)
        return (
          <div key={index}>
            <img src={photo} alt={`Slide ${index + 1}`} />
          </div>
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
