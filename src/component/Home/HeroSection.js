import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import { useState, useEffect } from 'react';
import heroSection1 from '../../assests/hero_section1.webp'
import heroSection2 from '../../assests/hero_section2.webp'
import heroSection3 from '../../assests/hero_section3.webp'


const Hero = styled.section`
  /* border: 2px solid blue; */
  position: relative;
  min-width: 100%;

  .slider-container{
    /* border: 2px solid red; */
    display: flex;
    z-index: -2;
    min-height: 100%;
  }

  .slide{
    /* border: 2px solid black; */
    min-width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .slider-tiles{
    /* border: 2px solid palegoldenrod; */
    position: absolute;
    width: 100%;
    bottom:0;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 10px;

    .tiles{
      height: 3px;
      width: 70px;
      background-color: gray;
      cursor: pointer;
    }
    #active{
      height: 100%;
      will-change: width;
      background-color: white;
      transition: width 5s ease-in;
      animation: backgroundfill 5s ease-in;
    }
  }

  @keyframes backgroundfill {
    0%{
      width: 0%;
    }
    100%{
      width: 100%;
    }
  } 

`;

const images = [heroSection1, heroSection2, heroSection3];


function HeroSection({setShowNavbar, showNavbar}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setShowNavbar(false);
    return () => setShowNavbar(true);
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);
  
  const handleIndicatorClick = (index)=>{
    setCurrentIndex(index)
  }

  return (
    <Hero className='hero-section'>
      <Navbar showNavbar={showNavbar}/>

      <div className='slider-container' style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Hero-Slider ${index + 1}`} className='slide' />
        ))}

      </div>
        
               
      <div className='slider-tiles'>
      {images.map((_,index)=>(
                <div className='tiles' key={index} onClick={()=>handleIndicatorClick(index)} >
                  <div id={(currentIndex===index)? 'active': ''}></div> 
                </div>
      )
      )}
          
      </div>
      


    </Hero>
  );
}

export default HeroSection;
