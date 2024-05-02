import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getProductDetail from "../../redux/slices/productSlice/productDetails/productDetailsThunk";
import { API } from "../../constant";
import { toast } from "react-toastify";
import styled from "styled-components";
import Stars from "../ratingStar/Stars";
import { FaMinus, FaPlus } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import MetaData from "../../MetaData";
import ReviewCard from "./ReviewCard";

const HomeLink = styled.div`
  margin: 10px;
  .link {
    text-decoration: none;
    color: inherit;
    font-weight: 900;
  }
  .slash {
    margin: 4px;
  }

  span {
    text-transform: uppercase;
    font-size: 14px;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-bottom: 20px;
    .link,
    span {
      font-size: 12px;
    }
  }
`;
const ProducDetail = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    flex-direction: column;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: 0;
    * {
      font-size: 15px;
    }
  }
`;

const ProductImage = styled.div`
  /* border: 2px solid black; */
  min-width: 50%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  .leftthumbnail,
  .bottomthumbnail {
    /* border: 2px solid red; */
    width: 95%;
    height: 100%;
  }

  .bottomthumbnail {
    display: none;
  }


  .image-gallery-image {
    /* border: 2px solid black; */
    width: 90%;
    min-height: 450px;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    min-height: 300px;
    .bottomthumbnail {
      display: unset;
    }
    .leftthumbnail {
      display: none;
    }
    .image-gallery-image {
      width: 70%;
      min-height: 650px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    min-height: 300px;
    .image-gallery-image {
      width: 85%;
      min-height: 300px;
    }
  }
`;
const ProductDescription = styled.div`
  /* border: 2px solid black; */
  min-width: 40%;
  min-height: 500px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    justify-content: unset;
    margin-top: 10px;
    margin-bottom: 40px;
    min-height: auto;
  }
`;

const ProductName = styled.h2`
  white-space: nowrap;
`;

const Wrapper = styled.div`
  /* border: 2px solid black; */
  width: 70%;
  min-height: 80%;
  line-height: 2;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 85%;
  }
`;

const Description = styled.div`
  /* border: 2px solid black; */
  color: #666;
  font-size: 16px;
  line-height: 1.5;
`;

const Price = styled.p`
  color: #333;
  font-size: 20px;
  font-weight: bold;
  span {
    font-size: 15px;
    color: #666;
  }
`;

const Rating = styled.span`
  color: #ffd700; /* gold */
`;

const Reviews = styled.span`
  margin-left: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 17px 20px;
  margin-top: 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 70%;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 12px;
    width: 60%;
  }
`;

const Quantity = styled.span`
  display: flex;
  margin-top: 10px;
  border: 0.5px solid black;
  width: 100px;
  justify-content: space-around;
  border-radius: 5px;
  p {
    &:hover {
      cursor: pointer;
    }
  }
`;

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [cartAmount, setCartAmount] = useState(1);
  const { isLoading, productDetail, isError, errorMessage } = useSelector(
    (state) => state.productDetail
  );

  const images = [
    {
      original: productDetail.images && productDetail.images[0].url,
      thumbnail: productDetail.images && productDetail.images[0].url,
    },

    {
      original: productDetail.images && productDetail.images[0].url,
      thumbnail: productDetail.images && productDetail.images[0].url,
    },

    {
      original: productDetail.images && productDetail.images[0].url,
      thumbnail: productDetail.images && productDetail.images[0].url,
    },
  ];

  function setDecreaseCount() {
    setCartAmount(cartAmount > 1 ? cartAmount - 1 : 1);
  }

  function setIncreaseCount() {
    setCartAmount(
      cartAmount < productDetail.stock ? cartAmount + 1 : productDetail.stock
    );
  }

  useEffect(() => {
    dispatch(getProductDetail(`${API}/product/${slug}`));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isError]);

  return (
    // <>
    //   {isLoading ?
    //     <Loader />
    //    :
    //           }
    // </>

    <>
      <MetaData title={`SHADDOW - ${productDetail.name}`} />
      <HomeLink>
        <Link to="/" className="link">
          HOME
        </Link>
        <span className="slash">/</span>
        <span>{productDetail.name}</span>
      </HomeLink>
      <ProducDetail>
        <ProductImage>
          <div className="leftthumbnail">
            <ImageGallery
              items={images}
              thumbnailPosition="left"
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
            />
          </div>

          <div className="bottomthumbnail">
            <ImageGallery
              items={images}
              thumbnailPosition="bottom"
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
            />
          </div>
        </ProductImage>

        <ProductDescription>
          <Wrapper>
            <i>SHADDOW CLOTHING</i>
            <ProductName>{productDetail.name}</ProductName>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut
              lectus mauris. Proin nec risus consequat, ultrices nulla vel,
              eleifend lorem. Vivamus dignissim efficitur velit, sit amet
              tincidunt nisi pulvinar id.
            </Description>
            <Price>
              {`₹${productDetail.price}.00`} <span>MRP</span>
            </Price>
            <Stars stars={3.5} />
            <Reviews>{`(${productDetail.numOfReviews} Reviews)`}</Reviews>

            <p style={{ fontWeight: 900 }}>Quantity:</p>
            <Quantity>
              <p
                onClick={() => {
                  setDecreaseCount();
                }}
              >
                <FaMinus />
              </p>
              <div>{cartAmount}</div>
              <p
                onClick={() => {
                  setIncreaseCount();
                }}
              >
                <FaPlus />
              </p>
            </Quantity>

            <div>
              <Button>Add to Cart</Button>
            </div>

            <div>
              <Button>Proceed to Buy</Button>
            </div>
          </Wrapper>
        </ProductDescription>
      </ProducDetail>

      <ReviewCard reviews={productDetail.reviews} />
    </>
  );
};

export default ProductDetail;
