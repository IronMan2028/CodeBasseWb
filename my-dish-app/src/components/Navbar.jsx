// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   return (
//     <nav className="bg-gray-800 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold">
//               My App
//             </Link>
//           </div>
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link to="/home" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
//               <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
//               <div className="relative">
//                 <button onClick={toggleDropdown} className="hover:bg-gray-700 px-3 py-2 rounded-md">
//                   Login/Register
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link
//                       to="/login"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={closeDropdown}
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/signup"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={closeDropdown}
//                     >
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link to="/home" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
//             <Link to="/contact" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
//             <Link to="/login" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
//             <Link to="/signup" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const access_token = useSelector(state => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              My App
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {access_token ? (
                <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded-md">Dashboard</Link>
              ) : (
                <Link to="/home" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
              )}
              <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
              {!access_token && (
                <div className="relative">
                  <button onClick={toggleDropdown} className="hover:bg-gray-700 px-3 py-2 rounded-md">
                    Login/Register
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
              {access_token && (
                <button onClick={() => {/* Add logout logic here */}} className="hover:bg-gray-700 px-3 py-2 rounded-md">
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {access_token ? (
              <Link to="/dashboard" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Dashboard</Link>
            ) : (
              <Link to="/home" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
            )}
            <Link to="/contact" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
            {!access_token && (
              <>
                <Link to="/login" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
                <Link to="/signup" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
              </>
            )}
            {access_token && (
              <button onClick={() => {/* Add logout logic here */}} className="block hover:bg-gray-700 px-3 py-2 rounded-md w-full text-left">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
