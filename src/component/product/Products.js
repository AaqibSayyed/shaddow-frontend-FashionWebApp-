import React from "react";
import MetaData from "../../MetaData";
import { BRAND_NAME, API } from "../../constant";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import getProducts from "../../redux/slices/productSlice/getProducts/getProductsThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  updateCategory,
  updateSearchKeyword,
} from "../../redux/slices/productSlice/getProducts/getProductsSlice";
import Pagination from "./Pagination";
import {
  updatePageRequested,
  updateProductPrice,
  updateproductSubCategory,
} from "../../redux/slices/productSlice/getProducts/getProductsSlice";
import Filters from "./Filters";
import filterIcon from '../../assests/icons8-filter-50.png'
import closeIcon from "../../assests/close.png";
import Stars from '../ratingStar/Stars'

const ProductPageContainer = styled.div`
      @media (max-width: ${({ theme }) => theme.media.tab}) {
      
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    p,span{
        font-size: 15px;
      }
  }


`


const HomeLink = styled.div`
  margin-left: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
  .link {
    text-decoration: none;
    color: inherit;
    font-weight: 900;
  }
  .slash {
    margin: 4px;
    text-transform: upperCase;
    font-size: 14px;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    margin-left: 15px;

  }
`;



const ProductsConainer = styled.div`
  /* border: 2px solid black; */
  display: flex;
  .filterForlaptops{
    min-width: 23%;
}
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .filterForlaptops{
      display: none;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .filterForlaptops{
      display: none;
    } 
  }
`;

const ProductsList = styled.div`
  /* border: 2px solid red; */
  min-width: 75%;
  padding: 30px;
  /* align-items: center; */
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  position: relative;

  .product-link {
    text-decoration: none;
    color: inherit;
  }

  .card-container {
    /* border: 2px solid blueviolet; */
    width: 30%;
    transition: all 0.3s ease-in;
    overflow: hidden;
    &:hover {
      /* border: 0.5px solid black; */
      cursor: pointer;
      box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.9);
      border-radius: 10px;
      transform: scale(1.01);
    }
  }

  .image-container {
    img {
      object-fit: cover;
      height: 350px;
      width: 100%;
      border-radius: 10px;
    }
  }
  .card-details {
    display: flex;
    gap: 5px;
    flex-direction: column;
    margin-top: 4px;
    text-align: center;
    padding: 7px;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    padding-left: 0;
    padding-right: 0;
    gap: 10px;
    .card-container {
      /* border: 2px solid palegreen; */
      width: 30%;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding-left: 0;
    padding-right: 0;
    .card-container {
      /* border: 2px solid red; */
      width: 85%;
    }
  }
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 15px;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-transform: uppercase;
  }
`;

const TabMobileFilterSection = styled.div`
  display: none;
  overflow: auto;
  .filterBox{
    border: 1px solid black; 
    display: flex; 
    gap : 10px;
    justify-content: center;
    padding: 5px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 5px;

    &:hover{
      cursor: pointer
    }
  }

  .filterBox >img{
      height: 25px;
      width: 25px;
  }
  .filterBox >span{
    font-size: 22px;
  }

  .filterOptions{
    border: 2px solid black;
    transition: all 0.5s ease;
    position: fixed;
    top:0;
    height: 100vh;
    width: 60vw;
    padding-right: 30px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 2;
    backdrop-filter: blur(2px);
    transform: translateX(-100%);
    .closeIcon{
    position: absolute;
    top: 15px;
    right: 15px;
    height: 18px;
    width: 18px;
    margin-bottom: 20px;
    cursor: pointer;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
      display: block;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
      display: block;
      .filterBox{
        position: absolute;
        z-index: 100;
        border: none;
        width: fit-content;
        gap : 5px;
        margin-top: -7px;
        right: 0px;
        
      }
      .filterBox >img{

      height: 21px;
      width: 21px;
      margin-bottom:-10px;
  }
  .filterBox >span{
    font-size: 18px;
  }
     
  }

`
const ProductsCount = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
        position: absolute;
        left:30px;
      }
`

function Products() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const tabMobileFilterSection = useRef()

  const handleFilterClose = () =>{
    tabMobileFilterSection.current.style.transform =  'translateX(-100%)'
  }

  const handleFilterOpen = () =>{
    tabMobileFilterSection.current.style.transform =  'translateX(0%)'
  }

  const {
    isLoading,
    products,
    isError,
    errorMessage,
    productSearchKeyword,
    pageRequested,
    filteredSearchCount,
    productPrice,
    productSubCategory,
  } = useSelector((state) => state.product);

  useEffect(() => {
    let queryParams;
    if (category) {
      dispatch(updateCategory(category));
    }

    queryParams = {
      category: "featuredProduct",
      keyword: productSearchKeyword,
      page: pageRequested,
      "price[gte]": productPrice[0],
      "price[lte]": productPrice[1],
    }; //later will change category

    if (productSubCategory.length !== 0) {
      queryParams = {
        category: "featuredProduct",
        keyword: productSearchKeyword,
        page: pageRequested,
        "price[gte]": productPrice[0],
        "price[lte]": productPrice[1],
        "subCategory[in]": productSubCategory,
      };
    }
    const queryString = new URLSearchParams(queryParams).toString();

    dispatch(getProducts(`${API}/products?${queryString}`));
  }, [
    dispatch,
    category,
    productSearchKeyword,
    pageRequested,
    productPrice,
    productSubCategory,
  ]);

  useEffect(() => {
    return () => {
      dispatch(updateCategory(""));
      dispatch(updateSearchKeyword(""));
      dispatch(updatePageRequested(1));
      dispatch(updateProductPrice([0, 3000]));
      dispatch(updateproductSubCategory([]));
    };
  }, [dispatch, category]);

  useEffect(() => {
    if (productSubCategory.length !== 0) {
      dispatch(updateSearchKeyword(""));
    }
  }, [dispatch, productSubCategory]);

  useEffect(() => {
    if (productSearchKeyword) {
      dispatch(updateproductSubCategory([]));
    }
    return () => {
      dispatch(updatePageRequested(1));
      dispatch(updateProductPrice([0, 3000]));
    };
  }, [dispatch, category, productSearchKeyword]);

  useEffect(() => {
    return () => {
      dispatch(updatePageRequested(1));
    };
  }, [dispatch, productPrice]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isError, errorMessage]);

  return (
    <ProductPageContainer>
      <MetaData
        title={`${BRAND_NAME} ${
          category ? category.toUpperCase() : `PRODUCTS`
        }`}
      />
      <HomeLink>
        <Link to="/" className="link">
          <span>HOME</span>
        </Link>
        <span className="slash">{`/ ${
          category === "men" || category === "women" ? category : "ALL PRODUCTS"
        }`}</span>
      </HomeLink>
      <Title>
        {category && productSearchKeyword
          ? <span>{`SHOWING RESULTS FOR ${productSearchKeyword} in ${category}`}</span>
          : category === "men" || category === "women"
          ? category
          : productSearchKeyword
          ? <span>{`SHOWING RESULTS FOR ${productSearchKeyword}`}</span>
          : "SHOP ALL"}
      </Title>
      <TabMobileFilterSection >
          <div className='filterBox' onClick={handleFilterOpen}>
          <img src={filterIcon} alt='filter-icon' ></img> <span>Filters</span>
          </div>

          <div className='filterOptions' ref={tabMobileFilterSection}>
          <img src={closeIcon} alt='closeIcon' className='closeIcon' onClick={handleFilterClose}/>
          <Filters/>
          </div>
      </TabMobileFilterSection>
      <ProductsCount>
            <p>{` ${filteredSearchCount} Products`}</p>
          </ProductsCount>
      <ProductsConainer>
        <div className='filterForlaptops'>
        <Filters/>
        </div>
        <ProductsList>
          {products &&
            products.map((elem) => (
              <div className="card-container">
                <Link
                  className="product-link"
                  to={`/product/${elem._id}`}
                  key={elem._id}
                >
                  <div className="image-container">
                    <img src={elem.images[0].url} alt={elem.name} />
                  </div>
                  <div className="card-details">
                    <p><strong>{elem.name}</strong></p>
                    <div>
                      <span><Stars stars={elem.ratings} /></span>
                      <span>{`(${elem.ratings} Reviews)`}</span>
                    </div>
                    <p><strong>₹</strong>{`${elem.price}.00`}</p>
                  </div>
                </Link>
              </div>
            ))}
        </ProductsList>
      </ProductsConainer>
      <Pagination productCategory={category} productPrice={productPrice} />
    </ProductPageContainer>
  );
}

export default Products;
