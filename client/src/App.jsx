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
import CartPopup from './components/CartPopup.jsx';
import ShippingAddress from './pages/client/ShippingAddress.jsx';
import Ordersummary from './pages/client/Ordersummary.jsx';
import ProductDetail from './pages/client/ProductDetail.jsx';
import ProductView from './pages/client/ProductView.jsx';
import OrderDashboard from './pages/admin/OrderManagement/OrderDashboard.jsx';
import NewOrders from './pages/admin/OrderManagement/NewOrders.jsx';
import CompleteOrder from './pages/admin/OrderManagement/CompleteOrder.jsx';
import ManageOrder from './pages/admin/OrderManagement/ManageOrder.jsx';

import Sproduct from './pages/admin/Sproduct';
import SproductReport from './pages/admin/SproductReport';
import Sdashboard from './pages/admin/Sdashboard';
import CreateSproduct from './pages/admin/CreateSproduct.jsx';
import UpdateSproduct from './pages/admin/UpdateSproduct.jsx';
export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.isAdmin; // Check if user is admin

  return (
    <BrowserRouter>
      {isAdmin ? null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/product-view-client" element={<ProductView/>} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/sproduct" element={<Sproduct />} />
          <Route path="/sproductreport" element={<SproductReport />} />
          <Route path="/sdashboard" element={<Sdashboard />} />
          <Route path="/create-sproduct" element={<CreateSproduct />} />
          <Route path="/update-sproduct/:id" element={<UpdateSproduct />} />
        

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/mainDashboard' element={<MainDashboard />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
          <Route path='review' element={<ReviewPage/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='/reviewlisting' element={<ReviewListingPage/>} />
          <Route path='/review/:id/update' element={<UpdateReviewPage />} />
          <Route path="/customer-management" element={<CustomerManagement />} /> 
          <Route path='/cartpop' element={<CartPopup/>} />
          <Route path="/shipping-address" element={<ShippingAddress />} />
          <Route path='/product-listing' element={<ProductListing/>} />
          <Route path='/product-admin-dashboard' element={<ProductAdminDashboard />} />
          <Route path='/product-view' element={<ShowProductListing/>} />
          <Route path='/update-product/:id' element={<UpdateProductListing/>} />
          <Route path='/order-summary/:orderId' element={<Ordersummary/>} />
          <Route path="/order-dashboard" element={<OrderDashboard />} />
          <Route path="/new-orders-dashboard" element={<NewOrders />} />
          <Route path="/complete-orders-dashboard" element={<CompleteOrder />} />
          <Route path="/manage-orders-dashboard" element={<ManageOrder />} />
          
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}