import { Link } from "react-router-dom";
import logo from "./../../images/logo2.png";
import dashboard from "./../../images/icons8-dashboard-layout-24 (1).png";
import Order from "./../../images/icons8-create-order-50.png";
import product from "./../../images/icons8-product-50.png";
import supplier from "./../../images/icons8-supplies-50.png";
import customer from "./../../images/icons8-customers-50.png";
import customerCare from "./../../images/icons8-customer-support-50.png";
import payment from "./../../images/icons8-payment-50.png";
import employee from "./../../images/icons8-employee-50.png";
import promotion from "./../../images/icons8-promotion-50.png"
import AdminHeader from "../../components/AdminHeader";

export default function MainDashboard() {
  return (
    <div className="flex flex-row max-w-full mx-auto h-screen">
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <img src={logo} alt="Company Logo" className="w-48 h-auto" />
        </div>


        {/* Separate Line */}
        <hr className="border-gray-700 my-3" />

        {/* Navigation */}
        <div className="space-y-1">
          <NavLink
            icon={dashboard}
            text="Main Dashboard"
            to="/mainDashboard"
          />
          <NavLink
            icon={dashboard}
            text="Profile"
            to="/profile"
          />
          
         
        </div>
      </div>

      <div className="basis-4/5 ">
        <AdminHeader />
        
        <div className='flex flex-col gap-10 mt-36'>
          <div className='flex flex-row justify-center items-center gap-7'>
            <Link to='/orderDashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={Order} alt="Order Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Order Management</p>
            </div></Link>
            <Link to='/product-admin-dashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
              <img src={product} alt="Product Management" className='w-16 h-15 mx-4 my-2'/>
              <hr className='mt-3 mb-2 w-40 h-px bg-sectionhr border-0 '/>
              <p className='text-sectiontext'>Product Management</p>
            </div></Link>
            <Link to='/sdashboard'><div className='flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900'>
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
          <div className="flex flex-row justify-center items-center gap-7">
            <Link to="/cusCareDashBoard">
              <div className="flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900">
                <img
                  src={customerCare}
                  alt="Customer Care Management"
                  className="w-16 h-15 mx-4 my-2"
                />
                <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0 " />
                <p className="text-sectiontext text-center">
                  Customer Care Management
                </p>
              </div>
            </Link>
            <Link to="/paymentDashboard">
              <div className="flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900">
                <img
                  src={payment}
                  alt="Payment Management"
                  className="w-16 h-15 mx-4 my-2"
                />
                <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0 " />
                <p className="text-sectiontext">Payment Management</p>
              </div>
            </Link>
            <Link to="/employeeDashboard">
              <div className="flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900">
                <img
                  src={employee}
                  alt="Employee Management"
                  className="w-16 h-15 mx-4 my-2"
                />
                <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0 " />
                <p className="text-sectiontext">Employee Management</p>
              </div>
            </Link>
            <Link to="/category-admin-dashboard">
              <div className="flex flex-col justify-center items-center bg-sectionBackground w-48 h-40 rounded-2xl border-2 border-green-900">
                <img
                  src={promotion}
                  alt="Category & Promotion Management"
                  className="w-16 h-15 mx-4 my-2"
                />
                <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0 " />
                <p className="text-sectiontext text-center">
                  Category & Promotion Management
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}