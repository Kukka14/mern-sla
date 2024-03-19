import React from 'react'
import logo from './Images/logo2.png';
import dashboard from './Images/icons8-dashboard-layout-24 (1).png';
import notification from './Images/icons8-notification-50.png';
import profilepic from './Images/219969.png';
import profilIcon from './Images/icons8-admin-settings-male-48.png';
import Order from './Images/icons8-create-order-50.png';
import product from './Images/icons8-product-50.png';
import supplier from './Images/icons8-supplies-50.png';
import customer from './Images/icons8-customers-50.png';
import customerCare from './Images/icons8-customer-support-50.png';
import payment from './Images/icons8-payment-50.png';
import employee from './Images/icons8-employee-50.png';
import promotion from './Images/icons8-promotion-50.png';



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
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={Order} alt="Order Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Order Management</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={product} alt="Product Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Product Management</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={supplier} alt="Supplier Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Supplier Management</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={customer} alt="Customer Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Customer Management</p>
            </div>
          </div>
          <div className='flex flex-row justify-center items-center gap-7'>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={customerCare} alt="Customer Care Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext text-center'>Customer Care Management</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={payment} alt="Payment Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Payment Management</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={employee} alt="Employee Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Employee Management</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={promotion} alt="Category & Promotion Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext text-center'>Category & Promotion Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
