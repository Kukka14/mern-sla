import {Link} from 'react-router-dom';
import logo from '../Images/logo2.png';
import dashboard from '../Images/icons8-dashboard-layout-24 (1).png';
import notification from '../Images/icons8-notification-50.png';
import profilepic from '../Images/219969.png';
import arrowicon from '../Images/icons8-arrow-50.png';

export default function PromotionDashboard() {
  return (
    <div className='flex flex-row max-w-7xl mx-auto h-screen'>
      <div className='bg-sideNavBackground basis-1/4 flex flex-col '>
        <div className='flex justify-center items-center my-11'>
          <img src={logo} alt="Company Logo" className='w-60 h-16'/>
        </div>
        <div>
          <ul>
            <li className='flex flex-row justify-Start items-center bg-sideNavButton  h-16 rounded-3xl mb-6 pl-10'>
              <img src={dashboard} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-white text-xl font-bold'>DashBoard</div>
            </li>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Categories</div>
            </li>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Promotion</div>
            </li>
            <Link to='/addNewCategory'><li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Add Category</div>
            </li></Link>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="Company Logo" className='w-6 h-6 mx-4'/>
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
            <img src={notification} alt="Company Logo" className='w-9 h-10 mx-4'/>
            <img src={profilepic} alt="Company Logo" className='w-12 h-12 mx-4'/>
          </div>
        </div>
        <hr className='my-7 h-0.5 bg-searchBarBackground border-0 '/>

        <div className='flex flex-col gap-10'>
          
        </div>
      </div>
    </div>
  )
}
