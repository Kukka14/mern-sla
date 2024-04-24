import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/client/Home';
import SignUp from './pages/client/SignUp';
import About from './pages/client/About';
import Profile from './pages/client/Profile';
import Products from './pages/client/Products';
import Services from './pages/client/Services';
import Contact from './pages/client/Contact';
import Header from './components/Header';
import CreateSproduct from './pages/admin/CreateSproduct'; // Adjusted file path
import UpdateSproduct from './pages/admin/UpdateSproduct';
import Sproduct from './pages/admin/Sproduct';
import SproductReport from './pages/admin/SproductReport';
import Sdashboard from './pages/admin/Sdashboard';

export default function App() {
  return (
    <BrowserRouter> 
      <Header/>     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />       
        <Route path="/create-sproduct" element={<CreateSproduct />} /> {/* Adjusted import */}
        <Route path="/update-sproduct/:id" element={<UpdateSproduct />} />
        <Route path="/sproduct" element={<Sproduct />} />
        <Route path="/sproductreport" element={<SproductReport />} />
        <Route path="/sdashboard" element={<Sdashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
