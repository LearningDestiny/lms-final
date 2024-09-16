import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes, FaUserCircle, FaSearch } from 'react-icons/fa';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cour?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className={`bg-${isDarkMode ? 'gray-900' : 'white'} text-${isDarkMode ? 'gray-200' : 'black'} p-4 shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-blue-500">
          Learning Destiny
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block w-full max-w-md mx-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-${isDarkMode ? 'gray-800' : 'gray-200'} text-${isDarkMode ? 'gray-200' : 'black'}`}
              placeholder="Search for courses"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-gray-400"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/aboutus" className="hover:text-blue-500">
            About Us
          </Link>
          <Link to="/teach" className="hover:text-blue-500">
            Teach
          </Link>
          <Link to="/businessForm" className="hover:text-blue-500">
            Business
          </Link>
          <Link to="/cour" className="hover:text-blue-500">
            Courses
          </Link>
         
        
          <Link to="/admin-login" className="flex items-center space-x-2 hover:text-blue-500">
            <FaUserCircle />
            <span> Login</span>
          </Link>
          <button onClick={toggleTheme} className="focus:outline-none">
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden bg-${isDarkMode ? 'gray-900' : 'white'} text-${isDarkMode ? 'gray-200' : 'black'} p-4`}>
          <div className="relative mb-4">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-${isDarkMode ? 'gray-800' : 'gray-200'} text-${isDarkMode ? 'gray-200' : 'black'}`}
                placeholder="Search for courses"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-gray-400"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <Link to="/aboutus" className="block py-2 hover:text-blue-500" onClick={toggleMenu}>
            About Us
          </Link>
          <Link to="/teach" className="block py-2 hover:text-blue-500" onClick={toggleMenu}>
            Teach
          </Link>
          <Link to="/businessForm" className="block py-2 hover:text-blue-500" onClick={toggleMenu}>
            Business
          </Link>
          <Link to="/cour" className="block py-2 hover:text-blue-500" onClick={toggleMenu}>
            Courses
          </Link>
          <Link to="/admin-login" className="block py-2 hover:text-blue-500" onClick={toggleMenu}>
            Admin Login
          </Link>
          <button onClick={toggleTheme} className="w-full text-left py-2 focus:outline-none">
            {isDarkMode ? (
              <div className="flex items-center">
                <FaSun className="text-yellow-500 mr-2" /> Light Mode
              </div>
            ) : (
              <div className="flex items-center">
                <FaMoon className="text-gray-800 mr-2" /> Dark Mode
              </div>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
