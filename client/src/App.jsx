import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './pages/client/SignUp.jsx';
import SignIn from './pages/client/SignIn.jsx';
import Home from './pages/client/Home.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/client/Profile.jsx';
import ManageProfileReport from './pages/admin/customerManagement/ManageProfileReport.jsx';
import PrivateRoute from './components/PrivateRoute';


import MainDashboard from './pages/admin/MainDashboard.jsx';
import ContactUs from './pages/client/ContactUs.jsx';
import ReviewPage from './pages/client/ReviewPage.jsx';
import ReviewListingPage from './pages/admin/customercareManagement/ReviewListingPage.jsx';
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


import Sproduct from './pages/admin/supplierManagement/Sproduct.jsx';
import SproductReport from './pages/admin/supplierManagement/SproductReport.jsx';



import AddSuppler from './pages/admin/supplierManagement/AddSupplier.jsx';
import Supplier from './pages/admin/supplierManagement/Supplier.jsx';
import UpdateSupplier from './pages/admin/supplierManagement/UpdateSupplier.jsx'

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

import CustomerDashboard from './pages/admin/customerManagement/CustomerDashboard.jsx';
import ManageProfile from './pages/admin/customerManagement/ManageProfile.jsx';

import PaymentSuccessPage from './pages/client/PaymentSuccessPage.jsx';
import OrderHistory from './pages/client/OrderHistory.jsx';
import OrderDetails from './pages/client/OrderDetails.jsx';
import Footer from './components/Footer.jsx';
import ProductByCategory from './pages/admin/ProductManagement/ProductByCategory.jsx';
import SupplierAdminDashboard from './pages/admin/supplierManagement/SupplierAdminDashboard.jsx';
import CreateSproduct from './pages/admin/supplierManagement/CreateSproduct.jsx';
import UpdateSproduct from './pages/admin/supplierManagement/UpdateSproduct.jsx';
import ViewStocks from './pages/admin/ProductManagement/ViewStocks.jsx';

import AdminResponses from './pages/admin/customercareManagement/AdminResponses.jsx';
import ReviewAdminDashboard from './pages/admin/customercareManagement/ReviewAdminDashboard.jsx';
import ReviewReport from './pages/admin/customercareManagement/ReviewReport.jsx';
import MyReview from './pages/client/MyReview.jsx';
import ViewOrder from './pages/admin/OrderManagement/ViewOrder.jsx';




import ViewPaymentDetails from './pages/admin/PaymentManagement/ViewPaymentDetails.jsx'
import PaymentHistory from './pages/client/PaymentHistory.jsx';

import EmployeeDashboard from './pages/admin/EmployeeManagement/EmployeeDashboard.jsx';
import EmployeeList from './pages/admin/EmployeeManagement/EmployeeList.jsx';
import EmployeePayment from './pages/admin/EmployeeManagement/EmployeePayment.jsx';
import EmployeeUpdate from './pages/admin/EmployeeManagement/EmployeeUpdate.jsx';
import AddEmployee from './pages/admin/EmployeeManagement/AddEmployee.jsx';
import About from './pages/client/About.jsx';

import PaymentDashboard from './pages/admin/PaymentManagement/PaymentDashboard.jsx';



export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.isAdmin; // Check if user is admin

  return (
    <BrowserRouter>
      {isAdmin ? null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/product-view-client" element={<ProductView/>} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />

        <Route path="/sproduct" element={<Sproduct />} />
          <Route path="/sproductreport" element={<SproductReport />} />
          <Route path="/sdashboard" element={<SupplierAdminDashboard />} />
          <Route path="/create-sproduct" element={<CreateSproduct />} />
          <Route path="/update-sproduct/:id" element={<UpdateSproduct />} />
          <Route path="/add-supplier" element={<AddSuppler />} />
          <Route path="/view-suppliers" element={<Supplier/>} />
          <Route path="/update-supplier/:id" element={<UpdateSupplier/>} />
          <Route path="/about" element={<About/>} />
          
      
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          

          <Route path='/mainDashboard' element={<MainDashboard />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
          <Route path='review' element={<ReviewPage/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='/reviewlisting' element={<ReviewListingPage/>} />
          <Route path='/review/:id/update' element={<UpdateReviewPage />} />

         
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
          <Route path='/ViewOrder/:orderId' element={<ViewOrder />} />




          <Route path='/product-admin-dashboard' element={<ProductAdminDashboard />} />
          <Route path='/product-listing' element={<ProductListing/>} />
          <Route path='/product-view' element={<ShowProductListing/>} />
          <Route path='/update-product/:id' element={<UpdateProductListing/>} />
          <Route path="/products/:categoryName" element={<ProductByCategory/>} />
          <Route path="/view-stocks" element={<ViewStocks/>} />

          <Route path="/payment-dashboard" element={<PaymentDashboard/>} />
         
          





          


          <Route path="/manage-orders-dashboard" element={<ManageOrder/>}/>
          <Route path="/customer-report" element={<ManageProfileReport />} />
          <Route path="/customer-management" element={<ManageProfile />} />
        
          <Route path="/customerDashBoard" element={<CustomerDashboard />} />
          <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order_details/:orderId" element={<OrderDetails />} />


          <Route path="/paymentdetails" element={<ViewPaymentDetails/>} />
          <Route path="/payment-history" element={<PaymentHistory />} />
           <Route path='/reviewadmin' element={<ReviewAdminDashboard/>} />
          <Route path='/my-reviews/:userId' element={<MyReview />} />
          <Route path='/admin-responses' element={<AdminResponses />} />
          <Route path='/reviewreport' element={<ReviewReport />} />

          <Route path="/empDashboard" element={<EmployeeDashboard />} />
          <Route path="/addEmployee" element={<AddEmployee/>} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/paymentList" element={<EmployeePayment />} />
          <Route path="/emloyee-update/:id" element={<EmployeeUpdate />} />

        </Route>
      </Routes>
      {isAdmin ? null : <Footer />}
    </BrowserRouter>
  );
}