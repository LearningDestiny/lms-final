import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle, FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform logout logic (clear tokens, etc.)
    // Redirect or update state as needed after logout
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={`bg-gradient-to-r from-${isDarkMode ? 'gray-900' : 'blue-500'} via-${isDarkMode ? 'gray-800' : 'blue-600'} to-${isDarkMode ? 'gray-700' : 'blue-700'} text-${isDarkMode ? 'gray-200' : 'white'} px-4 py-4 shadow-md transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Search */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className={`text-2xl font-bold focus:outline-none text-${isDarkMode ? 'white' : 'gray-900'} transition-colors duration-300`}
          >
            Learning Destiny
          </button>
          <div className="relative ml-4 hidden md:block">
            <input
              type="text"
              className={`bg-${isDarkMode ? 'gray-800' : 'white'} h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-96 shadow-inner text-${isDarkMode ? 'white' : 'gray-900'} transition-colors duration-300 border border-${isDarkMode ? 'gray-700' : 'gray-300'}`}
              placeholder="Search for anything"
            />
            <button
              type="submit"
              onClick={() => console.log('Search clicked')}
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <FaSearch className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <div className="md:hidden">
          {!showMenu ? (
            <button
              onClick={() => setShowMenu(true)}
              className={`focus:outline-none text-${isDarkMode ? 'gray-200' : 'gray-800'} transition-colors duration-300`}
            >
              <FaBars className="text-2xl" />
            </button>
          ) : (
            <button
              onClick={closeMenu}
              className={`focus:outline-none text-${isDarkMode ? 'gray-200' : 'gray-800'} transition-colors duration-300`}
            >
              <FaTimes className="text-2xl" />
            </button>
          )}
        </div>

        {/* Right Side Menu Items */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate('/BusinessForm')}
            className={`hover:text-yellow-400 focus:outline-none transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-900'} transition-colors duration-300`}
          >
            Learning Destiny Business
          </button>
          <button
            onClick={() => navigate('/teach')}
            className={`hover:text-yellow-400 focus:outline-none transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-900'} transition-colors duration-300`}
          >
            Teach on Learning Destiny
          </button>
          <button
            onClick={() => navigate('/')}
            className={`hover:text-yellow-400 focus:outline-none transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-900'} transition-colors duration-300`}
          >
            My learning
          </button>
          <FaBell className={`hover:text-yellow-400 cursor-pointer transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-800'} transition-colors duration-300`} />
          <FaShoppingCart className={`hover:text-yellow-400 cursor-pointer transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-800'} transition-colors duration-300`} />
          <button onClick={toggleTheme} className="focus:outline-none">
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
          </button>
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle className={`hover:text-yellow-400 cursor-pointer transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-800'} transition-colors duration-300`} />
              <FaChevronDown className={`absolute right-0 top-0 mt-2 text-${isDarkMode ? 'gray-400' : 'gray-600'} transition-colors duration-300`} />
              <ul className={`absolute right-0 mt-2 w-48 bg-${isDarkMode ? 'gray-800' : 'white'} rounded-md shadow-lg py-1 text-${isDarkMode ? 'gray-200' : 'gray-800'} border border-${isDarkMode ? 'gray-700' : 'gray-300'} transition-colors duration-300`}>
                <li>
                  <button
                    onClick={() => navigate('/profile')}
                    className={`block px-4 py-2 text-sm hover:bg-${isDarkMode ? 'gray-700' : 'gray-100'} focus:outline-none transition-colors duration-300`}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`block px-4 py-2 text-sm hover:bg-${isDarkMode ? 'gray-700' : 'gray-100'} focus:outline-none transition-colors duration-300`}
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
                  className={`hover:text-yellow-400 focus:outline-none transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-900'} transition-colors duration-300`}
                >
                  Login
                </button>
                <span className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} mx-2 transition-colors duration-300`}>/</span>
                <button
                  onClick={() => navigate('/signup')}
                  className={`hover:text-yellow-400 focus:outline-none transition duration-200 text-${isDarkMode ? 'gray-200' : 'gray-900'} transition-colors duration-300`}
                >
                  Sign Up
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 right-0 bg-${isDarkMode ? 'gray-900' : 'blue-600'} z-50 md:hidden ${showMenu ? 'block' : 'hidden'} shadow-lg transition-colors duration-300`}>
        <div className="flex flex-col items-center py-4">
          <button
            onClick={() => navigate('/')}
            className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 focus:outline-none mb-4 transition duration-200`}
          >
            Learning Destiny Business
          </button>
          <button
            onClick={() => navigate('/teach')}
            className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 focus:outline-none mb-4 transition duration-200`}
          >
            Teach on Learning Destiny
          </button>
          <button
            onClick={() => navigate('/')}
            className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 focus:outline-none mb-4 transition duration-200`}
          >
            My learning
          </button>
          <FaBell className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 cursor-pointer mb-4 transition duration-200`} />
          <FaShoppingCart className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 cursor-pointer mb-4 transition duration-200`} />
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 cursor-pointer mb-4 transition duration-200`} />
              <FaChevronDown className="absolute right-0 top-0 mt-2 text-gray-400" />
              <ul className={`absolute right-0 mt-2 w-48 bg-${isDarkMode ? 'gray-800' : 'white'} rounded-md shadow-lg py-1 text-${isDarkMode ? 'gray-200' : 'gray-800'} border border-${isDarkMode ? 'gray-700' : 'gray-300'} transition-colors duration-300`}>
                <li>
                  <button
                    onClick={() => navigate('/profile')}
                    className={`block px-4 py-2 text-sm hover:bg-${isDarkMode ? 'gray-700' : 'gray-100'} focus:outline-none transition-colors duration-300`}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`block px-4 py-2 text-sm hover:bg-${isDarkMode ? 'gray-700' : 'gray-100'} focus:outline-none transition-colors duration-300`}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => navigate('/login')}
                className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 focus:outline-none transition duration-200`}
              >
                Login
              </button>
              <span className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} mx-2`}>/</span>
              <button
                onClick={() => navigate('/signup')}
                className={`text-${isDarkMode ? 'gray-300' : 'white'} hover:text-yellow-400 focus:outline-none transition duration-200`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
