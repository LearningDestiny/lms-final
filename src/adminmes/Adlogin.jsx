import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adlogin = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/message');
    } catch (error) {
      setError('Failed to log in.');
      toast.error('Invalid email or password!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className={`p-8 rounded-lg shadow-xl w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Admin Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className={`block text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={`block text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded hover:from-blue-600 hover:to-teal-600 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className={`hidden md:block w-1/2 p-6 md:p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <img
          src="https://img.freepik.com/free-vector/flat-3d-isometric-design-man-sits-workplace-working-computer_1284-42638.jpg?t=st=1707105688~exp=1707106288~hmac=51ee94dd850023961942f6f78e0d309fa58051fd45173e5832185b6534a478e2" 
          alt="Admin Login"
          className="w-full h-full object-contain rounded-lg shadow-xl"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adlogin;
