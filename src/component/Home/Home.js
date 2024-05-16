import HeroSection from "./HeroSection"
import FeatureProduct from './FeatureProduct'
import MetaData from "../../MetaData"
import { BRAND_NAME } from "../../constant"
import NewCollection from "./NewCollection"

function Home({setShowNavbar, showNavbar}) {
  return (
    <>
    <MetaData title={BRAND_NAME} />
      <HeroSection setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>
      <FeatureProduct productType='Featured Product' category='featuredProduct'/>  
      <NewCollection />  
    </>
  )
}

export default Home