import {useCallback, useRef} from "react";
import styled from "styled-components";
import searchIcon from "../../assests/search.png";
import mailIcon from "../../assests/mail.png";
import shoppingCart from "../../assests/shopping-cart.png";
import avatar from "../../assests/avatar.png";
import menuBurger from "../../assests/menu-burger.png";

const CONTAINER = styled.nav`
      /* border: 2px solid black; */
      position: ${(props)=> !props.showNabar? 'absolute': 'relative'};
      width: 100%;
      transition: all .5s ease;
      z-index: 1;
      &:hover{  
        background-color: ${({theme})=>theme.colors.primary};
        opacity: 0.9;

        .menu-container .menu{
          color:${({theme})=>theme.colors.secondary};
        }

        .container .logo {&::before{
        content: 'SHADDOW';
        position: absolute;
        z-index:-1;
        color:black;
        top: -3.5px;
        /* left: -1px; */
        }}

        .wrapper .input-search input[type="text"]{
        &::placeholder{
          color:${({theme})=>theme.colors.secondary};

        }
        }
      }

      @media (max-width: ${({theme}) => theme.media.tab}){
      .menu-container{
        display:none; 
      }  
      .wrapper{
        padding: 10px 30px;
      }

      .wrapper .search{
        order:3;
        min-width: 100%;
        margin-top: 10px;
      }

      .wrapper .container{
        /* border: 2px solid black; */
        min-width: 50%;
      }

      .wrapper .icons{
        /* border: 2px solid red; */
        min-width: 50%;
      }

      .wrapper .container{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        gap:10px;
        .logo{
          font-size: 35px;
        }

        .hamburger{
          display:flex;
        }
      }
      
      @media (max-width: ${({theme}) => theme.media.mobile}){
        .wrapper{
          padding: 10px 15px;

        }

        .wrapper .search{
          img{
            height: 22px;
            min-width: 22px;
          }
          .input-search input[type="text"]{
          font-size: 80%;

        }
        } 


        .wrapper .container{
          min-width: 20%;
        }
        .wrapper .container .logo{
          font-size: 25px;

        }

        .wrapper .container .hamburger{
            height:22px;
            width:22px;
          }

          .wrapper .icons{
              /* border: 2px solid orange; */
              min-width: 10%;}

        .wrapper .icons :nth-child(1),.wrapper .icons :nth-child(2){
          display:none
        }

        .wrapper .icons :nth-child(3){
            height:22px;
            width:22px;
        }



      }
  }
`
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
    &::placeholder{
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .container {
    /* border: 2px solid orange; */
    min-width: 30%;
    .logo{
    /* border: 2px solid orange; */
    position: relative;
    z-index:1;
    font-size: 40px;
    font-weight: 900;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.colors.primary};
    transition: all 1s ease;
    &:hover{
      cursor: pointer;
      &::before{
        content: 'SHADDOW';
        position: absolute;
        z-index:-1;
        color:black;
        top: -3.5px;
        /* left: -1px; */
        }
      }
    }



    .hamburger{
      display:none;
      height:30px;
      width:30px;
      cursor:pointer;
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
    transition: all .5s ease;
    &:hover {
      cursor: pointer;
      transform: scale(1.1)
    }
  }

`
const HR = styled.hr`
  width: 94%;
  margin: 0 auto;
`
const MENU = styled.div`
    display:flex;
    flex-wrap: wrap;
    padding: 20px;
    align-items: center;
    justify-content:center;
    gap:20px;
    color: ${({ theme }) => theme.colors.primary};
    .menu{
      cursor: pointer;
      transition: all .5s ease;
      &:hover{
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 900;
    }
    }


`


function Navbar({showNabar}) {
  let searchFocus = useRef()

  const focus = useCallback(() =>{
    searchFocus.current.focus()
  },[])

  const openMenu = useCallback(() =>{
    let open_menu= document.querySelector('.hamburgerOpen')
    open_menu.style.transform = 'translateX(0%)'
  },[])

  return (

    <>
    <CONTAINER>
      <Wrapper className='wrapper'>
        <div className="search">
          <img src={searchIcon} alt="Search Icon" onClick={focus}/>
          <div className="input-search">
            <input type="text" placeholder="What are you looking for?" ref={searchFocus}/>
          </div>
        </div>

        <div className="container">
          <img className="hamburger" src={menuBurger} alt='hamburger-menu' onClick = {openMenu}/>
          <h1 className="logo">SHADDOW</h1>
        </div>

        <div className="icons">
          <img src={mailIcon} alt="Search Icon" id='mailIcon'/>
          <img src={avatar} alt="Search Icon" id='avatar'/>
          <img src={shoppingCart} alt="Search Icon" id='shoppingCart'/>
        </div>
      </Wrapper>
      <HR />

      <MENU className='menu-container'>
        <h4 className='menu'>HOME</h4>
        <h4 className='menu'>PRODUCTS</h4>
        <h4 className='menu'>MEN</h4>
        <h4 className='menu'>WOMEN</h4>
        <h4 className='menu'>ABOUT</h4>
        <h4 className='menu'>GET IN TOUCH</h4>
      </MENU>
    </CONTAINER>
    </>
  );
}

export default Navbar;
