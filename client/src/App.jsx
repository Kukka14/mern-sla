import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Header from './components/Header';

export default function App() {    
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={< SignIn/>} />
        <Route path='/sign-up' element={< SignUp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/Services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />       
      </Routes>
    </BrowserRouter>
  );
}

