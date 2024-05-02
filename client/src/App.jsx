
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './pages/client/SignUp.jsx';
import SignIn from './pages/client/SignIn.jsx';
import Home from './pages/client/Home.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/client/Profile.jsx';
import CustomerManagement from './pages/admin/MProfile.jsx';
import PrivateRoute from './components/PrivateRoute';

import AddEmployee from './pages/admin/AddEmployee.jsx';
import MainDashboard from './pages/admin/MainDashboard.jsx';
import ContactUs from './pages/client/ContactUs.jsx';
import ReviewPage from './pages/client/ReviewPage.jsx';
import ReviewListingPage from './pages/client/ReviewListingPage.jsx';
import UpdateReviewPage from './pages/client/UpdateReviewPage.jsx';



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
import AddCategory from './pages/admin/categoryAndPromotion/AddCategory.jsx';
import CategoryAdminDashboard from './pages/admin/categoryAndPromotion/CategoryAdminDashboard.jsx';
import ViewCategory from './pages/admin/categoryAndPromotion/ViewCategory.jsx';
import AddDiscount from './pages/admin/categoryAndPromotion/AddDiscount.jsx';
import UpdateCategory from './pages/admin/categoryAndPromotion/UpdateCategory.jsx';
import CouponAdd from './pages/admin/categoryAndPromotion/CouponAdd.jsx';
import ViewDiscount from './pages/admin/categoryAndPromotion/ViewDiscount.jsx';
import CouponCodeView from './pages/admin/categoryAndPromotion/CouponCodeView.jsx';
import ManageCoupon from './pages/admin/categoryAndPromotion/ManageCoupon.jsx';
import ProductAdminDashboard from './pages/admin/ProductManagement/ProductAdminDashboard.jsx';
import ProductListing from './pages/admin/ProductManagement/ProductListing.jsx';
import ShowProductListing from './pages/admin/ProductManagement/ShowProductListing.jsx';
import UpdateProductListing from './pages/admin/ProductManagement/UpdateProductListing.jsx';

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
          
         
         
         
          <Route path='/order-summary/:orderId' element={<Ordersummary/>} />
          <Route path="/order-dashboard" element={<OrderDashboard />} />
          <Route path="/new-orders-dashboard" element={<NewOrders />} />
          <Route path="/complete-orders-dashboard" element={<CompleteOrder />} />
          <Route path="/manage-orders-dashboard" element={<ManageOrder />} />
          <Route path='/addcategories' element={<AddCategory />} />
          <Route path='/viewcategories' element={<ViewCategory />} />
          <Route path='/category-admin-dashboard' element={<CategoryAdminDashboard />} />
          <Route path='/adddiscount' element={<AddDiscount />} />
          <Route path='/updatecategory/:id' element={<UpdateCategory />} />
          <Route path='/couponadd' element={<CouponAdd />} />

          <Route path='/viewdiscount' element={<ViewDiscount />} />
          <Route path='/couponcodeview' element={<CouponCodeView />} />
          <Route path='/managecoupon/:id' element={<ManageCoupon />} />




          <Route path='/product-admin-dashboard' element={<ProductAdminDashboard />} />
          <Route path='/product-listing' element={<ProductListing/>} />
          <Route path='/product-view' element={<ShowProductListing/>} />
          <Route path='/update-product/:id' element={<UpdateProductListing/>} />




          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
