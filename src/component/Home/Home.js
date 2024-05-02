import HeroSection from "./HeroSection"
import FeatureProduct from './FeatureProduct'
import MetaData from "../../MetaData"

function Home({setShowNavbar, showNavbar}) {
  return (
    <>
    <MetaData title='SHADDOW' />
      <HeroSection setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>
      <FeatureProduct />    
    </>
  )
}

export default Home