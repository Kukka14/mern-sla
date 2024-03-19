import {Link} from 'react-router-dom';
import logo from '../Images/logo2.png';
import dashboard from '../Images/icons8-dashboard-layout-24.png';
import notification from '../Images/icons8-notification-50.png';
import profilepic from '../Images/219969.png';
import arrowicon from '../Images/icons8-arrow-50.png';
import whitearrowicon from '../Images/icons8-arrow-50 (1).png';
import plusIcon from '../Images/icons8-plus-50.png';

export default function AddNewCategory() {
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
              <div className='text-sideNavText text-xl '>Categories</div>
            </li>
            <li className='flex flex-row justify-Start items-center mb-6 pl-10'>
              <img src={arrowicon} alt="arrowicon" className='w-6 h-6 mx-4'/>
              <div className='text-sideNavText text-xl '>Promotion</div>
            </li>
            <Link to='/addNewCategory'><li className='flex flex-row justify-Start items-center  bg-sideNavButton  h-16 rounded-3xl mb-6 pl-10'>
              <img src={whitearrowicon} alt="Company Logo" className='w-6 h-6 mx-4'/>
              <div className='text-white text-xl '>Add Category</div>
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
            <form  className='flex flex-col gap-4 mx-20'>
                <p className='text-sideNavText text-lg'>Category Name :</p>
                <div className='flex justify-end'>
                    <input type='text' className='border p-3 rounded-lg bg-sideNavBackground basis-5/6' id='categoryname' />
                </div>                
                <p className='text-sideNavText text-lg'>Description :</p>
                <div className='flex justify-end'>
                    <input type='text' className='border p-3 rounded-lg bg-sideNavBackground basis-5/6 h-40' id='description' />
                </div>
                <div className='flex flex-row justify-center items-center mt-10'>
                    <div className='flex flex-row bg-buttonbackground p-2 rounded-xl'>
                        <img src={plusIcon} alt="plus Icon" className='w-12 h-12 mx-4'/>
                        <button className='bg-buttonbackground text-white text-2xl rounded-2xl pr-4'>
                        Add
                        </button>  
                    </div>
                    
                </div>    
            </form>      
            
            </div>
      </div>
    </div>
  )
}
