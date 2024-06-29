import { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import searchIcon from "../../assests/search.png";
import shoppingCart from "../../assests/shopping-cart.png";
import avatar from "../../assests/avatar.png";
import menuBurger from "../../assests/menu-burger.png";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchKeyword } from "../../redux/slices/productSlice/getProducts/getProductsSlice";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLogout } from "../../redux/slices/userSlice/userThunk";
import { toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import { updateUserLocation } from "../../redux/slices/userSlice/userSlice";

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
  .css-7dv1rb-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab {
    height: auto;
    width: fit-content;
    padding: 5px;
    background: transparent;
    border-radius: 5px;
    color: black;
    border: none;
    box-shadow: unset;
    text-transform: unset;
    &:hover {
      background: unset;
    }
  }
  .css-vudeem-MuiSpeedDial-root{
    -webkit-flex-direction: unset;
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
        height: 20px;
        width: 20px;
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

    .css-7dv1rb-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab {
      font-size: 12px;
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
    .wrapper .icons :nth-child(2),
    .user-login-info,
    .avtar-login {
      display: none;
    }

    .wrapper .icons :nth-child(3) {
      display: none;
    }

    .wrapper .icons .shooping-cart-small-devices {
      display: block;
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
    font-size: 90%;
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
    height: 25px;
    width: 25px;
    color: white;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }

  .icons .shooping-cart-small-devices {
    display: none;
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
  const location = useLocation()
  
  const { productCategory } = useSelector((state) => state.product);
  const {
    user,
    isAuthenticated,
    isErrorLogout,
    errorMessage,
    userLoagOut,
    userLogOutMessage,
    userCurrentLocation
  } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

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

  const logout = () => {
    dispatch(userLogout());
      toast.success('Logged Out Successfully');
      navigate("/");
  };

  useEffect(() => {
    if (isErrorLogout) {
      toast.error(errorMessage);
    }
  }, [isErrorLogout]);

  useEffect(() => {
    dispatch(updateUserLocation(location.pathname))
  }, [location.pathname, dispatch]);


  
  return (
    <>
      <CONTAINER showNavbar={props.showNavbar}>
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
            {isAuthenticated ? (
              <div
                className="user-login-info"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: '7px'
                }}
              >
                <Backdrop open={open} style={{ zIndex: "10", height: '100vh' }} />
                <SpeedDial
                  ariaLabel="User SpeedDial"
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  direction="down"
                  style={{ zIndex: "11" }}
                  icon={
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p style={{fontStyle: 'italic'}}>Hello, {user.name}</p>
                      <p>&#9660;</p>
                    </div>
                  }
                  sx={{position:'relative',  alignItems: "center", justifyContent: "center"}}
                >
                  <SpeedDialAction
                    icon={<LogoutIcon />}
                    tooltipTitle="Logout"
                    onClick={logout}
                    sx={{position:'absolute', right:0, top: 20}}
                  />
                </SpeedDial>
                <img src={shoppingCart} alt="Search Icon" id="shoppingCart" />
              </div>
            ) : (
              <div
                className="avtar-login"
                style={{ display: "flex", gap: "7px" }}
              >
                <NavLink to="login">
                  <img src={avatar} alt="Search Icon" id="avatar" />
                </NavLink>
                <img src={shoppingCart} alt="Search Icon" id="shoppingCart" />
              </div>
            )}

            <img
              src={shoppingCart}
              alt="Search Icon"
              id="shoppingCart"
              className="shooping-cart-small-devices"
            />
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
