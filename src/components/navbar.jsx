import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle, FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAd, setShowAd] = useState(false); // State to control ad popup
  const { currentUser } = useAuth();

  useEffect(() => {
    const adShown = localStorage.getItem('adShown');
    const isDesktop = window.innerWidth >= 1024; // Consider desktop view if width is 1024px or greater

    if (!adShown && isDesktop) {
      setShowAd(true);
      localStorage.setItem('adShown', 'true');
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform logout logic (clear tokens, etc.)
    // Redirect or update state as needed after logout
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const toggleAd = () => {
    setShowAd(!showAd); // Toggle the ad visibility
  };

  return (
    <nav className={`bg-${isDarkMode ? 'gray-900' : 'gray-100'} text-${isDarkMode ? 'gray-200' : 'gray-900'} px-4 py-3`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Search */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} focus:outline-none`}
          >
            Learning Destiny
          </button>
          <div className="relative text-gray-600 ml-4 hidden md:block">
            <input
              type="text"
              className={`bg-${isDarkMode ? 'gray-800' : 'gray-200'} h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-96`}
              placeholder="Search for anything"
            />
            <button
              type="submit"
              onClick={() => console.log('Search clicked')}
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <FaSearch className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <div className="md:hidden">
          {!showMenu ? (
            <button
              onClick={() => setShowMenu(true)}
              className="text-gray-400 focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
          ) : (
            <button
              onClick={closeMenu}
              className="text-gray-400 focus:outline-none"
            >
              <FaTimes className="text-2xl" />
            </button>
          )}
        </div>

        {/* Right Side Menu Items */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate('/BusinessForm')}
            className="hover:text-white focus:outline-none"
          >
            Learning Destiny Business
          </button>
          <button
            onClick={() => navigate('/teach')}
            className="hover:text-white focus:outline-none"
          >
            Teach on Learning Destiny
          </button>
          <button
            onClick={() => navigate('/')}
            className="hover:text-white focus:outline-none"
          >
            My learning
          </button>
          <FaBell className="hover:text-white cursor-pointer" onClick={toggleAd} />
          
          <button onClick={toggleTheme} className="focus:outline-none">
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
          </button>
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle className="hover:text-white cursor-pointer" />
              <FaChevronDown className="absolute right-0 top-0 mt-2 text-gray-400" />
              <ul className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                <li>
                  <button
                    onClick={() => navigate('/profile')}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white focus:outline-none"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            !currentUser && (
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-white focus:outline-none hidden md:block"
                >
                  Login
                </button>
                <span className="text-gray-400 mx-2 hidden md:block">/</span>
                <button
                  onClick={() => navigate('/signup')}
                  className="hover:text-white focus:outline-none hidden md:block"
                >
                  Sign Up
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Side Navbar for Mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-${isDarkMode ? 'gray-900' : 'gray-100'} z-50 transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button
          className="absolute top-4 right-4 text-gray-400 focus:outline-none"
          onClick={closeMenu}
        >
          <FaTimes className="text-2xl" />
        </button>
        <div className="flex flex-col items-start p-6 space-y-4 mt-8">
          <button
            onClick={() => { navigate('/BusinessForm'); closeMenu(); }}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Learning Destiny Business
          </button>
          <button
            onClick={() => { navigate('/teach'); closeMenu(); }}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Teach on Learning Destiny
          </button>
          <button
            onClick={() => { navigate('/'); closeMenu(); }}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            My learning
          </button>
          <FaBell className="text-gray-300 hover:text-white cursor-pointer mb-4" onClick={() => { toggleAd(); closeMenu(); }} />
          <FaShoppingCart className="text-gray-300 hover:text-white cursor-pointer mb-4" onClick={closeMenu} />
        </div>
      </div>

      {/* Advertisement Popup */}
      {showAd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="relative bg-cover bg-center w-full h-64 md:w-2/3 md:h-80 lg:w-1/2 lg:h-96 p-4"
            style={{ backgroundImage: `url(https://img.freepik.com/free-psd/3d-sales-discount-price-tag-composition-50-percent_314999-2100.jpg)` }}
          >
           <button
  className="absolute top-2 right-2 bg-red-600 text-white text-xl p-2 rounded focus:outline-none"
  onClick={toggleAd}
>
  <FaTimes />
</button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
