import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './pages/client/SignUp.jsx'
import SignIn from './pages/client/SignIn.jsx'
import Home from './pages/client/Home.jsx'
import Header from './components/Header.jsx';
import Profile from './pages/client/Profile.jsx';
import CustomerManagement from './pages/admin/MProfile.jsx'
import PrivateRoute from './components/PrivateRoute';




export default function App() {
  return (
  
    <BrowserRouter>
     < Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
         <Route path="/customer-management" element={<CustomerManagement />} /> 
       
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} /> 
        
        </Route>    
      </Routes>
    </BrowserRouter>
  );
}
