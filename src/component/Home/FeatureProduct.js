import { useEffect } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {PrevArrow, NextArrow} from './Arrow.js';
import { useDispatch, useSelector } from 'react-redux';
import featuredProduct from '../../redux/slices/productSlice/featureProductThunk.js';


const CARD = styled.div`
border: 2px solid bisque;
height: 300px;
min-width: 250px;
max-width: 250px;
`

const H3 = styled.h3`
  text-align: center;
  margin: 40px 0;
`




function FeatureProduct() {

    const dispatch = useDispatch()

    useEffect(()=>{

      dispatch(featuredProduct())

    },[])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },

      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },


    ]

  };
  

  return (
    <>
    <H3>FEATURE PRODUCT</H3>
    <div className="slider-container"  style={{textAlign: 'center', margin: '40px auto', width:'90%'}}>
      <Slider {...settings}>
        <CARD> 
          <h3>1</h3>
        </CARD>
        <CARD>
          <h3>2</h3>
        </CARD>
        <CARD>
          <h3>3</h3>
        </CARD>
        <CARD>
          <h3>4</h3>
        </CARD>
        <CARD>
          <h3>5</h3>
        </CARD>
        <CARD>
          <h3>6</h3>
        </CARD>
      </Slider>
    </div>
    </>
  );
}

export default FeatureProduct;
