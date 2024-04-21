
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './pages/client/SignUp.jsx';
import SignIn from './pages/client/SignIn.jsx';
import Home from './pages/client/Home.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/client/Profile.jsx';
import CustomerManagement from './pages/admin/MProfile.jsx';
import PrivateRoute from './components/PrivateRoute';
import ProductListing from './pages/admin/ProductListing.jsx';
import AddEmployee from './pages/admin/AddEmployee.jsx';
import MainDashboard from './pages/admin/MainDashboard.jsx';
import ContactUs from './pages/client/ContactUs.jsx';
import ReviewPage from './pages/client/ReviewPage.jsx';
import ReviewListingPage from './pages/client/ReviewListingPage.jsx';
import UpdateReviewPage from './pages/client/UpdateReviewPage.jsx';
import ProductAdminDashboard from './pages/admin/ProductAdminDashboard.jsx';
import ShowProductListing from './pages/admin/ShowProductListing.jsx';
import UpdateProductListing from './pages/admin/UpdateProductListing.jsx';
import Cart from './pages/client/Cart.jsx';
import AddCategory from './pages/admin/categoryAndPromotion/AddCategory.jsx';
import Product from './pages/client/Product.jsx';

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.isAdmin; // Check if user is admin

  return (
    <BrowserRouter>
      {isAdmin ? null : <Header />}
      <Routes>
        <Route path='/' element={<Home/>} />        
        <Route path='contactus' element={<ContactUs/>} />        
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/product' element={<Product />} />
        
        
        
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/mainDashboard' element={<MainDashboard />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
          <Route path='/review' element={<ReviewPage/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/reviewlisting' element={<ReviewListingPage/>} />
          <Route path='/review/:id/update' element={<UpdateReviewPage />} />
          <Route path="/customer-management" element={<CustomerManagement />} /> 
          <Route path='/product-listing' element={<ProductListing/>} />
          <Route path='/product-admin-dashboard' element={<ProductAdminDashboard />} />
          <Route path='/product-view' element={<ShowProductListing/>} />
          <Route path='/update-product/:id' element={<UpdateProductListing/>} />
          <Route path='/addcategory/' element={<AddCategory/>} />

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}