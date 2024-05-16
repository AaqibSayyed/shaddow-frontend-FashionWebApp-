import React, { useState,useRef } from "react";
import styled from "styled-components";
import { Slider } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProductPrice, updateproductSubCategory } from "../../redux/slices/productSlice/getProducts/getProductsSlice";

const Filter = styled.div`
  min-width: 23%;
  transition: all 2s ease-in;
  margin-bottom: 100px;

  .filterContainer {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    margin-left: 35px;
  }

  .mainHeading {
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 30px;
    font-weight: 900;
    border-bottom: 0.5px solid grey;
  }

  .filterOption {
    padding-top: 30px;
    padding-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 30px;
    border: none;
    background-color: unset;
    font-size: 15px;
    /* border-bottom: 0.5px solid grey; */
    &:hover {
      cursor: pointer;
    }
  }

  .productFilters,
  .arrowDown {
    display: none;
    padding-bottom: 30px;
  }

  .toggle {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .minMaxBox {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .valueBox {
    border: 0.5px solid grey;
    width: fit-content;
    padding: 7px;
    display: flex;
    gap:5px;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mainHeading{
      margin-top: 50px;
      font-size: 23px;
    }
  }
`;

function Filters() {
  const priceRangeRef = useRef();
  const productCategoriesRef = useRef();
  const productTypeArrowUpRef = useRef();
  const productTypeArrowDownRef = useRef();
  const PriceArrowUpRef = useRef();
  const PriceArrowDownRef = useRef();
  const {productPrice, productSubCategory} = useSelector((state) => state.product)
  const dipatch = useDispatch()

  const handleChange = (event, newValue) => {
    dipatch(updateProductPrice(newValue));
  };

  const categories = [
    "Hoodies",
    "Jackets",
    "Joggers",
    "Pants",
    "Shirt",
    "Sweatshirts",
    "T-shirt",
  ];

  const showPriceRange = () => {
    const priceRange = priceRangeRef.current;
    if (priceRange.style.display === "block") {
      priceRange.style.display = "none";
      PriceArrowUpRef.current.style.display = "block";
      PriceArrowDownRef.current.style.display = "none";
    } else {
      priceRange.style.display = "block";
      PriceArrowUpRef.current.style.display = "none";
      PriceArrowDownRef.current.style.display = "block";
    }
  };

  const showCategories = () => {
    const productCategories = productCategoriesRef.current;
    if (productCategories.style.display === "block") {
      productCategories.style.display = "none";
      productTypeArrowUpRef.current.style.display = "block";
      productTypeArrowDownRef.current.style.display = "none";
    } else {
      productCategories.style.display = "block";
      productTypeArrowUpRef.current.style.display = "none";
      productTypeArrowDownRef.current.style.display = "block";
    }
  };


  const handleCheckChange = (event) => {
    if(event.target.value !== "on" && event.target.checked === true){
        if (productSubCategory.length === 0){
             return dipatch(updateproductSubCategory(event.target.value))
        }
        else{
            const categoryValueCheck = new Set(productSubCategory)
            if(!categoryValueCheck.has(event.target.value)){
                return dipatch(updateproductSubCategory((event.target.value)))
            }
        }
      
    }

    if(event.target.value !== "on" && event.target.checked === false){
        let newcategoryValues;
        const categoryValueCheck = new Set(productSubCategory)
        if(categoryValueCheck.has(event.target.value)){
            newcategoryValues = productSubCategory.filter((value)=>{
                return value !== event.target.value
            })
            return dipatch(updateproductSubCategory((newcategoryValues)))
        }
    }
  };

  return (
    <Filter>
      <div className="filterContainer">
        <div className="mainHeading">Filters</div>
        <button className="filterOption filterOption1" onClick={showPriceRange}>
          <div className="toggle">
            <div>Price</div>
            <div className="arrowUp" ref={PriceArrowUpRef}>
              &#9650;
            </div>
            <div className="arrowDown" ref={PriceArrowDownRef}>
              &#9660;
            </div>
          </div>
        </button>

        <div className="productFilters" ref={priceRangeRef}>
          <Slider
            getAriaLabel={() => "Price Range"}
            min={0}
            max={3000}
            value={productPrice}
            onChange={handleChange}
            valueLabelDisplay="auto"
            color="black"
          />

          <div className="minMaxBox">
            <div className="valueBox">
              <div>₹</div>
              <div>{productPrice[0]}</div>
            </div>
            <div className="valueBox">
              <div><strong>₹</strong></div>
              <div>{productPrice[1]}</div>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: "15px" }} />
        <button className="filterOption filterOption2" onClick={showCategories}>
          <div className="toggle">
            <div>Product Type</div>
            <div className="arrowUp" ref={productTypeArrowUpRef}>
              &#9650;
            </div>
            <div className="arrowDown" ref={productTypeArrowDownRef}>
              &#9660;
            </div>
          </div>
        </button>
        <div className="productFilters" ref={productCategoriesRef}>
          {categories.map((items) => {
            return (
              <>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={items}
                    value={items}
                    onChange={handleCheckChange}
                  />
                </FormGroup>
              </>
            );
          })}
        </div>
        <hr style={{ marginTop: "15px" }} />
      </div>
    </Filter>
  );
}

export default Filters;
