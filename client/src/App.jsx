import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './pages/client/SignUp.jsx'
import SignIn from './pages/client/SignIn.jsx'
import Home from './pages/client/Home.jsx'
import Header from './components/Header.jsx';
import Profile from './pages/client/Profile.jsx';
import ContactUs from './pages/client/ContactUs.jsx';
import ReviewPage from './pages/client/ReviewPage.jsx';
import ReviewListingPage from './pages/client/ReviewListingPage.jsx';
import UpdateReviewPage from './pages/client/UpdateReviewPage.jsx';

//import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import PrivateRoute from './components/PrivateRoute';




export default function App() {
  return (
  
    <BrowserRouter>
     < Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
       
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} /> 
        <Route path='/contactus' element={<ContactUs/>} />  
        <Route path='/review' element={<ReviewPage/>} /> 
        <Route path="/reviewList" element={<ReviewListingPage />} />
        <Route path='/review/:id/update' element={<UpdateReviewPage />} />

        </Route>    
      </Routes>
    </BrowserRouter>
  );
}
