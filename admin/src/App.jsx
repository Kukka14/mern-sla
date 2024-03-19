import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDashboard from './MainDashboard';
import CusCareDashBoard from './customerCareManagement/CusCareDashBoard';
import CustomerDashBoard from './customerManagement/CustomerDashBoard';
import EmployeeDashboard from './EmployeeManagement/EmployeeDashboard';
import OrderDashboard from './orderManagement/OrderDashboard';
import PaymentDashboard from './paymentManagement/PaymentDashboard';
import ProductDashboard from './productManagement/ProductDashboard';
import PromotionDashboard from './promotionManagement/PromotionDashboard';
import SupplierDashboard from './supplierManagement/SupplierDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainDashboard />} />
        <Route path='/cusCareDashBoard' element={<CusCareDashBoard />} />
        <Route path='/customerDashBoard' element={<CustomerDashBoard />} />
        <Route path='/employeeDashboard' element={<EmployeeDashboard />} />
        <Route path='/orderDashboard' element={<OrderDashboard />} />
        <Route path='/paymentDashboard' element={<PaymentDashboard />} />
        <Route path='/productDashboard' element={<ProductDashboard />} />
        <Route path='/promotionDashboard' element={<PromotionDashboard />} />
        <Route path='/supplierDashboard' element={<SupplierDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
