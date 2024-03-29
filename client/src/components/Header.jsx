import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import logo1 from '../Images/companylogo1.png';

export default function Header() {
  return (
    <header>
      <div className='bg-backgreen1'>
        <div className=' flex flex-row justify-between items-center max-w-7xl mx-auto h-9'>
          <div className='text-textcolor1 text-sm'>Welcome to Saradha Lanka Agro Products</div>
          <div className='flex flex-row justify-between'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-textcolor1 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <div className='text-textcolor1 text-sm mr-6'>+94 11 586 589 52</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-textcolor1 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <div className='text-textcolor1 text-sm'>saradhalanka@gmail.com</div>
          </div>
        </div>
      </div>
      <div className='bg-backgreen2'>
        <div className=' flex flex-row justify-between items-center max-w-7xl mx-auto h-20'>
        <Link to='/'><img src={logo1} alt="Company Logo" className='w-52 h-12'/></Link>
          <div className='text-white text-sm flex flex-row justify-between'>
            <Link to='/'><div className='mr-14'><a href='#'>Home</a></div></Link>
            <Link to='/about'><div className='mr-14'><a href='#'>About</a></div></Link>
            <Link to='/services'><div className='mr-14'><a href='#'>Services</a></div></Link>
            <Link to='/product'><div className='mr-14'><a href='#'>Product</a></div></Link>
            <Link to='/contact'><div className='mr-14'><a href='#'>Contact</a></div></Link>
          </div>
          <div className='flex flex-row justify-between'>
            <div className='bg-backgreen3 w-12 h-12 flex justify-center items-center rounded-full mr-7'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <div className='bg-backgreen4 text-white rounded-3xl font-bold flex justify-center items-center h-10 px-5'>Sign In</div>
          </div>
        </div>
      </div>
    </header>
  )
}