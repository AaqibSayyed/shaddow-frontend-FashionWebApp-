import { useState, useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styled from "styled-components";
import closeIcon from "../../assests/close.png";
import avatar from "../../assests/avatar.png";
import { NavLink,useLocation } from "react-router-dom";

const Wrapper = styled.header`
  /* border: 2px solid black; */
  padding: 7px;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  transition: all 1s ease-in-out;

  .arrows {
    font-size: 30px;
    cursor: pointer;
  }

  .policy-display {
    /* border: 2px solid blue; */
    width: 53%;
    text-align: center;
  }

  @media (max-width: ${({theme}) => theme.media.tab}) {
    .policy-display{
      font-size: 15px;
    }
    .arrows{
      font-size: 23px;
    }
  }

  @media (max-width: ${({theme}) => theme.media.mobile}) {
    .policy-display{
      font-size: 12px;
    }
    .arrows{
      font-size: 15px;
    }
  }


`;

const HAMBURGER = styled.div`
  border: 2px solid black;
  position: fixed;
  height: 100vh;
  width: 60vw;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  backdrop-filter: blur(2px);
  overflow: auto;
  transition: all 0.5s ease;
  transform: translateX(-100%);

  img {
    height: 22px;
    width: 22px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .menu {
    padding: 20px 5px;
    border-bottom: 0.1px solid black;
    overflow: hidden;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
      /* border-radius: 5px; */
      overflow: hidden;
    }
  }

  .account {
    /* border:2px solid olive; */
    display: flex;
    padding: 10px 0;
    gap: 13px;
    border-top: 0.1px solid black;
  }

  .navlink {
    text-decoration: none;
    color: inherit; 
  }

  .active {
    text-decoration: underline;
    color: inherit; 
  }



  @media (max-width: ${({theme}) => theme.media.tab}) {
    img {
    height: 17px;
    width: 17px;
  }
  .menu{
    font-size: 15px;
  }

  }

  @media (max-width: ${({theme}) => theme.media.mobile}) {
    img {
    height: 19px;
    width: 19px;
  }
  .menu{
    font-size: 12px;
  }
  .account h4{
    font-size: 16px;
  }

  }


`;

const MenuContainer = styled.div `

  display: flex;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 20px;

  .navlink {
    text-decoration: none;
    color: inherit; 
  }

  .active {
    text-decoration: underline;
    color: inherit; 
  }


`
const Header = () => {

  const newPolicy = [
    "Prepaid Shipping Within 48 Hours!",
    "End Of Season Sale Now Live - Upto 50% OFF",
    "Our Exchange Policy has been discontinued from 1st January 2024. Please read our policy page for more info",
  ];

  const container = useRef();
  const hamburgerOpen = useRef(null)

  const [newPolicyslide, setNewPolicyslide] = useState(0);

  const previousPolicy = useCallback(() => {
    setNewPolicyslide((prevSlide) =>
      prevSlide === 0 ? newPolicy.length - 1 : prevSlide - 1
    );
  }, [newPolicyslide]);

  const nextPolicy = useCallback(() => {
    setNewPolicyslide((prevSlide) =>
      prevSlide === newPolicy.length - 1 ? 0 : prevSlide + 1
    );
  }, [newPolicyslide]);

  useGSAP(
    () => {
      gsap.from(".policy-display", {
        y: 20,
        duration: 1.3,
        opacity: 0,
        ease: "power3.inOut",
      });
    },
    { dependencies: [newPolicyslide], scope: container, revertOnUpdate: true }
  );

  useEffect(() => {
    let interval = setInterval(() => {
      setNewPolicyslide((prevSlide) =>
        prevSlide === newPolicy.length - 1 ? 0 : prevSlide + 1
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [newPolicyslide]);

  const closeMenu = useCallback(() => {
    // let close_menu = document.querySelector(".hamburgerOpen");
    hamburgerOpen.current.style.transform = "translateX(-100%)";
  }, []);




  return (
    <>
      <HAMBURGER className="hamburgerOpen" ref={hamburgerOpen}>
        <img src={closeIcon} alt="close menu" onClick={closeMenu} style={{position: 'absolute', top: '20px', right: '20px' }}/>
        
        <MenuContainer>
          <div className='main-menu'>
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
          </div>

        <NavLink to='login' className='navlink'>
        <div className="account">
         <img src={avatar} alt="avatar" />
          <h4>Account</h4>
        </div>
        </NavLink>
        </MenuContainer>
      </HAMBURGER>

      <Wrapper ref={container}>
        <div className="arrows" onClick={previousPolicy}>
          &larr;
        </div>

        <div className="policy-display">{newPolicy[newPolicyslide]}</div>

        <div className="arrows" onClick={nextPolicy}>
          &rarr;
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
