import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/client/Home';
import SignUp from './pages/client/SignUp';
import About from './pages/client/About';
import Profile from './pages/client/Profile';
import Products from './pages/client/Products';
import Services from './pages/client/Services';
import Contact from './pages/client/Contact';
import Supplier from './pages/client/Supplier';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter> 
      <Header/>     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-up' element={< SignUp/>} />
        <Route path='/about' element={< About/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />       
        <Route path='/supplier' element={<Supplier/>} />       
      </Routes>
    </BrowserRouter>
  );
}




