import HeroSection from "./HeroSection"
import FeatureProduct from './FeatureProduct'
import MetaData from "../../MetaData"
import { BRAND_NAME } from "../../constant"
import NewCollection from "./NewCollection"
import { useSelector } from "react-redux";
import Loader from "../Loader"

function Home({setShowNavbar, showNavbar}) {
  const {isLoading} = useSelector((state)=> state.user)

  return (
    <>
    <MetaData title={BRAND_NAME} />
    {(isLoading) ?  <Loader /> : <> <HeroSection setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>
    <FeatureProduct productType='Featured Product' category='featuredProduct'/>  
    <NewCollection />  
    </>
    }
    </>
  )
}

export default Home