import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assests/search.png";
import mailIcon from "../../assests/mail.png";
import shoppingCart from "../../assests/shopping-cart.png";
import avatar from "../../assests/avatar.png";
import menuBurger from "../../assests/menu-burger.png";
import { NavLink,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchKeyword } from "../../redux/slices/productSlice/getProducts/getProductsSlice";

const CONTAINER = styled.nav`
  /* border: 2px solid black; */
  position: ${(props) => (!props.showNavbar ? "absolute" : "relative")};
  width: 100%;
  transition: all 0.5s ease;
  z-index: 1;
  backdrop-filter: blur(0.5px);
  &:hover {
    background-color: ${({ theme, showNavbar }) =>
      !showNavbar && theme.colors.primary};
    opacity: 0.9;

    .menu-container .menu {
      color: ${({ theme, showNavbar }) =>
        !showNavbar && theme.colors.secondary};
    }

    .navlink {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.secondary};
    }
    .active {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.secondary};
     }


    .container .logo {
      &::before {
        content: ${({ showNavbar }) => !showNavbar && "SHADOW"};
        /* content: 'SHADOW'; */
        position: absolute;
        z-index: -1;
        color: ${({ theme, showNavbar }) =>
          !showNavbar && theme.colors.secondary};
        top: -3.5px;
        /* left: -1px; */
      }
    }

    .wrapper .input-search input[type="text"] {
      &::placeholder {
        color: ${({ theme, showNavbar }) =>
          !showNavbar && theme.colors.secondary};
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    hr {
      display: none;
    }

    .menu-container {
      display: none;
    }
    .wrapper {
      padding: 10px 30px;
    }

    .wrapper .search {
      order: 3;
      min-width: 100%;
      margin-top: 10px;
    }

    .wrapper .container {
      /* border: 2px solid black; */
      min-width: 50%;
    }

    .wrapper .icons {
      /* border: 2px solid red; */
      min-width: 50%;
      img {
        height: 25px;
        width: 25px;
      }
    }

    .wrapper .search {
      img {
        height: 25px;
        min-width: 25px;
      }
      .input-search input[type="text"] {
        font-size: 80%;
      }
    }

    .wrapper .container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      .logo {
        font-size: 25px;
      }

      .hamburger {
        display: flex;
        height: 25px;
        width: 25px;
      }
    }

    .navbarLine {
      display: block;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    &:hover {
      background-color: none;
    }
    .wrapper {
      /* border: 2px solid blue; */
      padding: 12px 10px;
    }

    .wrapper .search {
      margin-top: 1px;
        .searchIcon {
          height: 20px;
          min-width: 20px;
          &:hover {
            + .input-search input[type="text"] {
              display: block;
              font-size: 10px;
            }
          }
        }
        .input-search input[type="text"] {
          font-size: 10px;
        }
      /* display: none; */
    }

    .wrapper .container {
      min-width: 20%;
    }
    .wrapper .container .logo {
      font-size: 20px;
    }

    .wrapper .container .hamburger {
      height: 20px;
      width: 20px;
    }

    .wrapper .icons {
      /* border: 2px solid orange; */
      min-width: 10%;
    }

    .wrapper .icons :nth-child(1),
    .wrapper .icons :nth-child(2) {
      display: none;
    }

    .wrapper .icons :nth-child(3) {
      height: 22px;
      width: 22px;
    }

    .navbarLine {
      display: block;
    }
  }
`;
const Wrapper = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
  padding: 10px 40px;

  .search {
    /* border: 2px solid blue; */
    min-width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .search img {
    height: 30px;
    min-width: 30px;
    &:hover {
      cursor: pointer;
    }
  }

  .input-search input[type="text"] {
    min-height: 100%;
    min-width: 100%;
    border: none;
    background: transparent;
    font-size: 100%;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme, showNavbar }) =>
        !showNavbar && theme.colors.secondary};
    }
  }

  .container {
    /* border: 2px solid orange; */
    min-width: fit-content;
    .logo {
      /* border: 2px solid orange; */
      position: relative;
      z-index: 1;
      font-size: 40px;
      font-weight: 900;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
      color: ${({ theme }) => theme.colors.primary};
      transition: all 1s ease;
      a {
        text-decoration: none;
        color: inherit;
        .active {
          text-decoration: underline;
          color: inherit;
        }
      }
      &:hover {
        cursor: pointer;
        &::before {
          content: "SHADOW";
          position: absolute;
          z-index: -1;
          color: black;
          top: -3.5px;
          /* left: -1px; */
        }
      }
    }

    .hamburger {
      display: none;
      height: 30px;
      width: 30px;
      cursor: pointer;
    }
  }

  .icons {
    /* border: 2px solid orange; */
    min-width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
  .icons img {
    height: 30px;
    width: 30px;
    color: white;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;
const HR = styled.hr`
  width: 94%;
  margin: 0 auto;
`;
const MENU = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${({ theme, showNavbar }) =>
    !showNavbar ? theme.colors.primary : theme.colors.secondary};
  .menu {
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 900;
    }
  }
  .navlink {
    text-decoration: none;
    color: inherit;
  }

  .active {
    text-decoration: underline;
    color: inherit;
  }


`;

function Navbar(props) {

  const [searchKeyword, setSearchKeyword] = useState("");
  let searchFocus = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productCategory } = useSelector((state) => state.product);

  const openMenu = useCallback(() => {
    let open_menu = document.querySelector(".hamburgerOpen");
    open_menu.style.transform = "translateX(0%)";
  }, []);

  const getValue = (event) => {
    if (!event.target.value) {
       dispatch(updateSearchKeyword(""));
    }
     setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchKeyword) {
         dispatch(updateSearchKeyword(searchKeyword.trim()));
      }
      if (!productCategory && searchKeyword) {
          navigate(`/products`);
      }

      if (productCategory && searchKeyword) {
         navigate(`/products/${productCategory}`);
      }
    }
  };

  const searchIconClicked = () => {
    if (!searchKeyword) {
      searchFocus.current.focus();
    }
    if (searchKeyword) {
      dispatch(updateSearchKeyword(searchKeyword.trim()));
    }
    if (!productCategory && searchKeyword) {
      navigate(`/products`);
    }
    if (productCategory && searchKeyword) {
      navigate(`/products/${productCategory}`);
    }
  };

  const focusInputSearch = () => {
    searchFocus.current.focus();
  };

  return (
    <>
      <CONTAINER showNavbar={props.showNavbar} onClick={focusInputSearch}>
        <Wrapper className="wrapper" showNavbar={props.showNavbar}>
          <div className="search">
            <img
              src={searchIcon}
              alt="Search Icon"
              onClick={searchIconClicked}
              className="searchIcon"
            />
            <div className="input-search">
              <input
                type="text"
                placeholder="What are you looking for?"
                ref={searchFocus}
                onChange={getValue}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>

          <div className="container">
            <img
              className="hamburger"
              src={menuBurger}
              alt="hamburger-menu"
              onClick={openMenu}
            />
            <h1 className="logo">
              <NavLink to="/">SHADOW</NavLink>
            </h1>
          </div>

          <div className="icons">
            <img src={mailIcon} alt="Search Icon" id="mailIcon" />
            <img src={avatar} alt="Search Icon" id="avatar" />
            <img src={shoppingCart} alt="Search Icon" id="shoppingCart" />
          </div>
        </Wrapper>
        <HR />

        <MENU className="menu-container" showNavbar={props.showNavbar}>
          <NavLink to="/" className="navlink">
            <h4 className="menu">HOME</h4>
          </NavLink>
          <NavLink to="/products/men" className="navlink">
            <h4 className="menu">MEN</h4>
          </NavLink>
          <NavLink to="/products/women" className="navlink">
            <h4 className="menu">WOMEN</h4>
          </NavLink>
          <NavLink to="/about" className="navlink">
            <h4 className="menu">ABOUT</h4>
          </NavLink>
          <NavLink to="/touch" className="navlink">
            <h4 className="menu">GET IN TOUCH</h4>
          </NavLink>
        </MENU>
        <hr
          style={{ display: !props.showNavbar && "none" }}
          className="navbarLine"
        />
      </CONTAINER>
    </>
  );
}

export default Navbar;
