import {Link} from 'react-router-dom';
import logo from './../../images/logo2.png';
import dashboard from './../../images/icons8-dashboard-layout-24 (1).png';
import notification from './../../images/icons8-notification-50.png';
import profilepic from './../../images/219969.png';
import profilIcon from './../../images/icons8-admin-settings-male-48.png';
import Order from './../../images/icons8-create-order-50.png';
import product from './../../images/icons8-product-50.png';
import supplier from './../../images/icons8-supplies-50.png';
import customer from './../../images/icons8-customers-50.png';
import customerCare from './../../images/icons8-customer-support-50.png';
import payment from './../../images/icons8-payment-50.png';
import employee from './../../images/icons8-employee-50.png';
import promotion from './../../images/icons8-promotion-50.png';



export default function MainDashboard() {
  return (
    <div className='flex flex-row max-w-7xl mx-auto h-screen'>
      <div className='bg-sideNavBackground basis-1/4 flex flex-col '>
        <div className='flex justify-center items-center my-11'>
          <img src={logo} alt="Company Logo" className='w-60 h-16'/>
        </div>
        <div>
          <ul>
            <li className='flex flex-row justify-center items-center bg-sideNavButton  h-16 rounded-3xl mb-6'>
              <img src={dashboard} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-white text-xl font-bold'>Main DashBoard</div>
            </li>
            <li className='flex flex-row justify-center items-center mb-6'>
              <img src={profilIcon} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Profile</div>
            </li>
          </ul>
        </div>
      </div>
      <div className='basis-3/4 ml-8'>
        <div className='flex flex-row justify-between mt-9'>
          <form>
            <input type="text" placeholder='Search...' className='bg-searchBarBackground w-80 rounded-2xl border h-11 pl-6'/>
          </form> 
          <div className='flex flex-row justify-between items-center'>
            <img src={notification} alt="Company Logo" className='w-9 h-10 mx-4'/>
            <img src={profilepic} alt="Company Logo" className='w-12 h-12 mx-4'/>
          </div>
        </div>
        <hr className='my-7 h-0.5 bg-searchBarBackground border-0 '/>

        <div className='flex flex-col gap-10'>
          <div className='flex flex-row justify-center items-center gap-7'>
            <Link to='/orderDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={Order} alt="Order Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Order Management</p>
            </div></Link>
            <Link to='/productDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={product} alt="Product Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Product Management</p>
            </div></Link>
            <Link to='/supplierDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={supplier} alt="Supplier Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Supplier Management</p>
            </div></Link>
            <Link to='/customerDashBoard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={customer} alt="Customer Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Customer Management</p>
            </div></Link>
          </div>
          <div className='flex flex-row justify-center items-center gap-7'>
            <Link to='/cusCareDashBoard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={customerCare} alt="Customer Care Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext text-center'>Customer Care Management</p>
            </div></Link>
            <Link to='/paymentDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={payment} alt="Payment Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Payment Management</p>
            </div></Link>
            <Link to='/employeeDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={employee} alt="Employee Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Employee Management</p>
            </div></Link>
            <Link to='/promotionDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={promotion} alt="Category & Promotion Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext text-center'>Category & Promotion Management</p>
            </div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
