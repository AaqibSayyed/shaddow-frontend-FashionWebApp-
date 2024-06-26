import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './component/Loader.js';
import { Suspense, lazy } from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/Theme.js';
import GlobalStyle from './styles/GlobalStyle.js';

const Header = lazy(()=> import ('./component/layout/Header.js'))
const Navbar = lazy(()=> import ('./component/layout/Navbar.js'))
const Footer = lazy(()=> import ('./component/layout/Footer.js'))
const Home = lazy(()=> import ('./component/Home/Home.js'))
const ProductDetail = lazy(()=> import ('./component/product/ProductDetail.js'))
const Products = lazy(()=> import ('./component/product/Products.js'))
const Login = lazy (()=> import('./component/user/Login.js'))
const Register = lazy (()=> import('./component/user/Register.js'))
const ForgetPassword = lazy (()=> import('./component/user/ForgetPassword.js'))
const ResetPassword = lazy (()=> import('./component/user/ResetPassword.js'))


function Router() {
  const [showNavbar, setShowNavbar] = useState(true) 

  return (
    <ThemeProvider theme={theme}> 
    <GlobalStyle />
    <Suspense fallback={<Loader />}>
    <BrowserRouter>
    <Header/>
    {showNavbar && <Navbar showNavbar={showNavbar}/>}
    <Routes>

    <Route path='/' element={<Home setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>} exact={true} />
    <Route path='/product/:slug' element={<ProductDetail />}/>
    <Route path='/products/:category?' element={<Products />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/forgetpassword' element={<ForgetPassword />}/>
    <Route path='/forgetpassword/reset/:resetToken?' element={<ResetPassword />}/>

    </Routes>
    <Footer />
    </BrowserRouter>
    </Suspense>
    </ThemeProvider>
    
  );
}

export default Router;
