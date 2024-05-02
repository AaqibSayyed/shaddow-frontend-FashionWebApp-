import { useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./Arrow.js";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../../redux/slices/productSlice/getProducts/getProductsThunk.js";
import { API } from "../../constant.js";
// import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const CARD = styled.div`
  /* border: 2px solid bisque; */
  max-width: 250px;
  /* min-width: 250px; */
  max-height: 320px;
  transition: all 0.5s ease;
  overflow: hidden;
  &:hover {
    border: 0.5px solid black;
    cursor: pointer;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  .image-container {
    width: 100%;
    height: 75%;
    overflow: hidden;
  }
  .image-container img {
    /* border: 2px solid black; */
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .card-details {
    /* border: 2px solid bisque; */
    width: 100%;
    min-height: 25%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
    overflow: hidden;

  }

  .product-link{
      text-decoration: none;
      color: inherit;
    }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* border: 2px solid black; */
    max-width: 200px;
    max-height: 400px;
    border: 0.5px solid black;
    cursor: pointer;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    .card-details {
      p,
      span {
        font-size: 15px;
      }
    }
  }

`;

const H3 = styled.h3`
  /* border: 2px solid tomato; */
  text-align: center;
  width: fit-content;
  margin: 30px auto;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: 25px auto;
    margin-bottom: 0;
    font-size: 16px;
  }
`;



function FeatureProduct() {
  const dispatch = useDispatch();
  const {isLoading, products: featuredProduct , isError, errorMessage } = useSelector((state) => state.product);

  useEffect( () => {
   
    const queryParams = { category: "featuredProduct" };
    const queryString = new URLSearchParams(queryParams).toString(); //this will convert queryParams javascript object into query string format that can be send to the server
    dispatch(getProducts(`${API}/products?${queryString}`));

  }, [dispatch]);

  useEffect(()=>{
    if(isError){
       toast.error(errorMessage)
    }
  },[isError])


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },

      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },

      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
        },
      },

      
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1.2
        },
      },


    ],
  };

  return (
    <>
      <H3>
        FEATURED PRODUCTS
      </H3>
      <div
        className="slider-container"
        style={{
          textAlign: "center",
          margin: "0 auto",
          width: "90%",
          padding: "20px 10px",
        }}
      >
        <Slider {...settings} style={{padding: '20px'}} className='slider'>
         
          {featuredProduct && featuredProduct.map((elem) => (
            <CARD key={elem._id}>
              <Link className='product-link' to={`/product/${elem._id}`} key={elem._id}>
              <div className="image-container">
                <img src={elem.images[0].url} alt={elem.name} />
              </div>
              <div className="card-details">
                <p>{elem.name}</p>
                <div>
                  <span>{`${elem.ratings} `}</span>
                  <span>{` (${elem.ratings} Reviews)`}</span>
                </div>
                <p>{`₹${elem.price}`}</p>
              </div>
            </Link>
            </CARD>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default FeatureProduct;
