import { Link } from 'react-router-dom';
import logo from '../../../images/logo2.png';
import dashboard from '../../../images/icons8-arrow-50 (1).png';
import { FaSortAmountDown } from 'react-icons/fa';
import AdminHeader from '../../../components/AdminHeader';


export default function MainDashboard() {
  return (
    <div className='flex h-screen'>

      {/* Sidebar */}
      <div className='bg-sideNavBackground w-1/5 p-4'>

        {/* Logo */}
        <div className='flex justify-center items-center mb-8'>
          <img src={logo} alt="Company Logo" className='w-48 h-auto'/>
        </div>
        
        {/* Separate Line */}
        <hr className="border-gray-700 my-4"/>

        {/* Navigation */}
        <div className='space-y-1'>
          <NavLink icon={dashboard} text="Main Dashboard" to="/product-admin-dashboard" />
          <NavLink icon={dashboard} text="Create Listing" to="/product-listing" />
          <NavLink icon={dashboard} text="View Products" to="/product-view" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>

        {/* Header */}
        <AdminHeader />

        {/* Main Content Area */}
        <div className='p-8'>
          {/* Your main content goes here */}
        </div>
      </div>
    </div>
  )
}

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}
