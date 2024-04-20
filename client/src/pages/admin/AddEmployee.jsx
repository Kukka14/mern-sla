import {Link} from 'react-router-dom';
import { useState } from 'react';
import logo from './../../images/logo2.png';
import dashboard from './../../images/icons8-dashboard-layout-24.png';
import notification from './../../images/icons8-notification-50.png';
import profilepic from './../../images/219969.png';
import arrowicon from './../../images/icons8-arrow-50.png';
import whitearrowicon from './../../images/icons8-arrow-50 (1).png';

export default function AddEmployee() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
        setLoading(true);
        const res = await fetch('/api/employee/addEmployee', 
        {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if(data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);
        setError(null);
        } catch (error) {
        setLoading(false);
        setError(error.message);
        }
    }
  return (
    <div className='flex flex-row max-w-7xl mx-auto h-screen'>
      <div className='bg-sideNavBackground basis-1/4 flex flex-col '>
        <div className='flex justify-center items-center my-11'>
          <img src={logo} alt="Company Logo" className='w-60 h-16'/>
        </div>
        <div>
          <ul>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={dashboard} alt="arrowicon" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl'>DashBoard</div>
            </li>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="arrowicon" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Employees</div>
            </li>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="arrowicon" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Promotion</div>
            </li>
            <Link to='/addEmployee'><li className='flex flex-row justify-Start items-center  bg-sideNavButton  h-16 rounded-3xl mb-6 pl-10'>
              <img src={whitearrowicon} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-white text-xl '>Add Employee</div>
            </li></Link>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="arrowicon" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Add Promotion</div>
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
            <img src={notification} alt="notification" className='w-9 h-10 mx-4'/>
            <img src={profilepic} alt="profile pic" className='w-12 h-12 mx-4'/>
          </div>
        </div>
        <hr className='my-7 h-0.5 bg-searchBarBackground border-0 '/>

        <div className='p-3 '>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-20'>
                <p className='text-sideNavText text-lg'>Employee Name :</p>
                <div className='flex justify-end'>
                    <input type='text' className='border p-3 rounded-lg bg-sideNavBackground basis-5/6' id='name' onChange={handleChange} />
                </div>                
                <p className='text-sideNavText text-lg'>NIC :</p>
                <div className='flex justify-end'>
                    <input type='text' className='border p-3 rounded-lg bg-sideNavBackground basis-5/6' id='nic' onChange={handleChange} />
                </div>               
                <p className='text-sideNavText text-lg'>Email :</p>
                <div className='flex justify-end'>
                    <input type='text' className='border p-3 rounded-lg bg-sideNavBackground basis-5/6' id='email' onChange={handleChange} />
                </div>
                <p className='text-sideNavText text-lg'>Mobile :</p>
                <div className='flex justify-end'>
                    <input type='text' className='border p-3 rounded-lg bg-sideNavBackground basis-5/6' id='mobile' onChange={handleChange} />
                </div>
                <div className='flex flex-row justify-center items-center mt-10'>                    
                        <button disabled={loading} className='bg-buttonbackground text-white text-2xl rounded-2xl p-4 text-center'>
                        {
                          loading ? 'Adding...' : 'Add Category'
                        }
                        </button>                 
                </div>    
            </form>  
            {
              error && <p className='text-red-500 mt-5'>{error}</p>
            }             
           </div>
      </div>
    </div>
  )
}
