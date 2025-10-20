import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide from '../assets/slide';
import books from '../assets/books';
import {Link} from 'react-router-dom';
import './Home.css';

function Home() {
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // The empty array ensures this effect runs only once when the component mounts

  return (
    <div className="home-container">
      {/* Main Slider for slides */}
      <Slider {...sliderSettings}>
        {slide.map((item, index) => (
          <div key={index}>
            <img src={item.url} alt={`Slide ${index + 1}`} className="main-slide-image" />
          </div>
        ))}
      </Slider>

      {/* Product Slider */}
      <div className="product-slider-container" style={{backgroundColor:'red'}}>
        <h2 className="product-slider-title">Featured Products</h2>
        <Slider {...productSliderSettings}>
          {books.map((book) => (
            <div key={book.id} style={{ padding: '10px' }}>
              <Link to={`/productDetails/${book.id}`} style={{ textDecoration: 'none' }}>
                <div className="product-card">
                  <img src={book.image} alt={book.name} className="product-image" />
                  <p className="product-name">{book.name}</p>
                  <p style={{ fontWeight: 'bold' }}>{book.price} EGP</p>
                  <button className="buy-now-button"style={{backgroundColor:'red'}} >View Details</button>
                </div>
              </Link>
            </div>  
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Home
