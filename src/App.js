import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/Theme.js'
import GlobalStyle from './styles/GlobalStyle.js';
import Header from './component/layout/Header.js';
import Navbar from './component/layout/Navbar.js';
import Footer from './component/layout/Footer.js';
import Home from './component/Home/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [showNavbar, setShowNavbar] = useState(true) 

  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
    <Header/>
    {showNavbar && <Navbar />}
    <Routes>
    <Route path='/' element={<Home setShowNavbar={setShowNavbar} showNavbar={showNavbar}/>} exact={true} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
