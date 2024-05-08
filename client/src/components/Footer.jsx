

export default function Footer() {
  return (
    <div className="bg-green-800 text-white font-sans">
      <div className="w-full bg-backgreen2 text-white py-10 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
            
          </div>
          <div className="flex">
            <input type="email" placeholder="Email Address" className="p-2 rounded-l-lg focus:outline-none" />
            <button className="bg-green-700 p-2 rounded-r-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168L17 12 14.752 12.831l1.048 1.169-2 3.347L11.501 15l-.75 1.347-.75-1.347L5 17.347l2-3.347 1.048-1.169L7.248 12l2.248-.831L7.248 9.999 9.296 8.83l2.955 3.348L11 12l.501-.75L14.752 9l2 3.347-1.048 1.169z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          <div>
            <h2 className="font-bold text-xl mb-3 text-green-200">SaradhaLankaAgro</h2>
            <p className="text-white mb-2">"Your partner in Agricultural Excellence"</p>
            <div className="flex space-x-4">
              <a href="#"><img src="" alt="facebook" /></a>
              <a href="#"><img src="" alt="whatsapp" /></a>
              <a href="#"><img src="" alt="phone" /></a>
              <a href="#"><img src="" alt="email" /></a>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-3 text-green-200">Explore</h2>
            <ul>
              <li><a href="#" className="text-slate-300 hover:text-green-300">About Company</a></li>
              <li><a href="#" className="text-slate-300 hover:text-green-300">Our Services</a></li>
              <li><a href="#" className="text-slate-300 hover:text-green-300">New Products</a></li>
              <li><a href="#" className="text-slate-300 hover:text-green-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-3 text-green-200">Contact</h2>
            <p className="text-slate-300">221/B Ambepussa</p>
            <p className="text-slate-300">Warakapola</p>
            <p className="text-slate-300">+94718138313</p>
            <a href="mailto:saradhalankaagro@gmail.com" className="text-slate-300 hover:text-green-300">saradhalankaagro@gmail.com</a>
          </div>
        </div>
        <div className="text-center text-green-400 text-sm py-4 border-t border-green-700">
          © Copyright 2024 by DulinaSH | <a href="#" className="hover:text-green-300">Terms & Conditions</a> | <a href="#" className="hover:text-green-300">Privacy Policy</a> | <a href="#" className="hover:text-green-300">Support</a>
        </div>
      </div>
    </div>
  );
}
