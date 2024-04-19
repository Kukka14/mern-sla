import { Link } from 'react-router-dom';
import logo1 from '../images/logo2.png';
import { useSelector } from 'react-redux';
import notification from './../images/icons8-notification-50.png';

export default function AdminHeader() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <header>
            
      <div className='bg-sideNavBackground'>
        <div className='flex flex-row justify-between items-center max-w-full mx-8 h-20'>
          <Link to='/'><img src={logo1} alt="Company Logo" className='w-60 h-16'/></Link>
          
          <div className='flex flex-row justify-between'>
            <div className='w-12 h-12 flex justify-center items-center rounded-full mr-7'>
            <img src={notification} alt="Company Logo" className='w-9 h-10 mx-4'/>
            </div>
            
              <Link to='/profile'>
                <img className='rounded-full h-12 w-12' src={currentUser.avatar} alt='Profile' />
              </Link>
           
          </div>
        </div>
      </div>
    </header>
  )
}
