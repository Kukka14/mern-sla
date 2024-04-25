import { Link } from 'react-router-dom';
import logo from './../../../images/logo2.png';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from '../../../components/AdminHeader';
import {useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function ManageOrder() {
  function NavLink({ icon, text, to }) {
    return (
      <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
        <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
        <span className='text-lg font-semibold'>{text}</span>
      </Link>
    );
  }


  

  useEffect(() => {
   

   
  }, []);

  const handleChange = (e) => {
   
  };

  useEffect(() => {
    
  }, []);

 
  const downloadPdf = () => {
   
  };

  useEffect(() => {
   
  }, []);

 

  const handleDelete = async () => {
   
  };

  const handleEdit = () => {
   
  };

  const handleSearch = async () => {
    
  };
  
  return (
    <div className='flex h-screen'>
      <div className='bg-sideNavBackground w-1/5 p-4'>
        <div className='flex justify-center items-center mb-8'>
          <img src={logo} alt="Company Logo" className='w-48 h-auto'/>
        </div>
        
        {/* Separate Line */}
        <hr className="border-gray-700 my-4"/>

        {/* Navigation */}
        <div className='space-y-1'>
          <NavLink icon={dashboard} text="Order Dashboard" to="/order-dashboard" />
          <NavLink icon={dashboard} text="New Order Dashboard" to="/new-orders-dashboard" />
          <NavLink icon={dashboard} text="Manage Orders" to="/manage-orders-dashboard" />
          <NavLink icon={dashboard} text="Complete Orders" to="/complete-orders-dashboard" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className="basis-4/5 ">

        {/* Header */}
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center"><h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">Manage Orders</h1></div>


          <div className="flex justify-center mb-10  ">
            <form className="flex items-center bg-sectionBackground rounded-lg shadow-md border border-green-200 px-4 py-2">
              <input
                type="text"
                placeholder="Search by name..."
               
                className="bg-green-100 w-80 rounded-lg border border-green-300 h-10 px-4 mr-4 focus:outline-none"
              />
             
              
            </form>

            <button
              
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md ml-4 "
            >
              Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Order Id</th>
                  <th className="px-4 py-2 text-left">Cart Id</th>
                  <th className="px-4 py-2 text-left">User Id</th>
                  <th className="px-4 py-2 text-left">T_Price </th>
                  <th className="px-4 py-2 text-left">P_Price</th>
                  <th className="px-4 py-2 text-left">O_Status</th>
                  <th className="px-4 py-2 text-left">P_Status</th>
                  <th className="px-4 py-2 text-left">T_Status</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
              
                  <tr className= "bg-green-100">
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>

                    <td className="border px-4 py-2">
                      <div className="flex flex-col">
                        <button
                          
                          className="bg-red-500 text-white px-4 py-2 rounded mb-1 hover:bg-red-600 "
                        >
                          Delete
                        </button>
                        <Link to={'/'} className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600 text-center">
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
              
              </tbody>
            </table>
            
          </div>

          

        </div>
      </div>
    </div>
  )
}

// NavLink Component for sidebar navigation items
