import { useState, useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styled from "styled-components";
import closeIcon from "../../assests/close.png";
import avatar from "../../assests/avatar.png";

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
`;

const HAMBURGER = styled.div`
  border: 2px solid black;
  position: fixed;
  height: 100vh;
  width: 70vw;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  backdrop-filter: blur(2px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 35px 20px;
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
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
      border-radius: 5px;
    }
  }

  .account {
    /* border:2px solid olive; */
    display: flex;
    position: fixed;
    width: calc(100% - 50px);
    bottom: 0;
    left: 0;
    padding: 10px 0;
    margin: 0 25px;
    gap: 15px;
    border-top: 0.1px solid black;
  }
`;
const Header = () => {
  const newPolicy = [
    "Prepaid Shipping Within 48 Hours!",
    "End Of Season Sale Now Live - Upto 50% OFF",
    "Our Exchange Policy has been discontinued from 1st January 2024. Please read our policy page for more info",
  ];

  const container = useRef();

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
    let close_menu = document.querySelector(".hamburgerOpen");
    close_menu.style.transform = "translateX(-100%)";
  }, []);

  return (
    <>
      <HAMBURGER className="hamburgerOpen">
        <img src={closeIcon} alt="close menu" onClick={closeMenu} />

        <h4 className="menu">HOME</h4>
        <h4 className="menu">PRODUCTS</h4>
        <h4 className="menu">MEN</h4>
        <h4 className="menu">WOMEN</h4>
        <h4 className="menu">ABOUT</h4>
        <h4 className="menu">GET IN TOUCH</h4>

        <div className="account">
          <img src={avatar} alt="avatar" />
          <h4>Account</h4>
        </div>
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
