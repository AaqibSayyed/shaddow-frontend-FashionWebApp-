import HeroSection from "./HeroSection"
import FeatureProduct from './FeatureProduct'

function Home({setShowNavbar, showNavbar}) {
  return (
    <>
      <HeroSection setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>
      <FeatureProduct />
    </>
  )
}

export default Home