import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AdminDashboard from './dashboard/AdminDashboard';
import AddCourses from './dashboard/AddCourses';
import AllCourses from './dashboard/AllCourses';
import Students from './dashboard/Students';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';
import CoursePreview from './dashboard/CoursePreview';
import Navbar from './components/navbar'; // Adjust path as necessary
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './Authentication/AuthContext'; // Adjust path as needed
import Teach from './student/Teach'; // Import the Teach component
import BusinessForm from './student/BusinessForm';
import Aboutus from './Pages/Aboutus';
import CategoryPage from './enrollpages/CategoryPage';
import CourseDetails from './enrollpages/CourseDetails';
import StaticEnroll from './student/StaticEnroll';
import ScrollToTop from './components/ScrollToTop'; // Import the ScrollToTop component
import Cour from './Pages/Cour';
import Adminview from './admin-view/Adminview';
import Adlogin from '../src/adminmes/Adlogin'; 
import Message from './adminmes/Message';
import Contactsform from './Pages/Contactsform';
import StudentLogin from './studentpanel/StudentLogin';
import RegisterForm from './enrollpages/RegisterForm';
import StudentDashboard from './studentpanel/StudentDashboard'; // Import the StudentDashboard component

// AdminLayout component for protected admin routes
const AdminLayout = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// StudentLayout component for protected student routes
const StudentLayout = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser || currentUser.role !== 'student') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <ScrollToTop /> {/* Add ScrollToTop component here */}
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/enroll/:courseId" element={<CourseDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/enroll/:courseId" element={<StaticEnroll />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/businessForm" element={<BusinessForm />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/cour" element={<Cour />} />
          <Route path="/cour/:courseId" element={<CourseDetails />} />
          <Route path="/admin-login" element={<Adlogin />} />
          <Route path="/message" element={<Message />} />
          <Route path="/Contactsform" element={<Contactsform />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/register/:type" element={<RegisterForm />} />

          {/* Protected Admin Dashboard Routes */}
          <Route 
            path="/admin-dashboard/*" 
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          >
            <Route path="adminview" element={<Adminview />} />
            <Route path="addCourses" element={<AddCourses />} />
            <Route path="allCourses" element={<AllCourses />} />
            <Route path="course/:courseId" element={<CoursePreview />} />
            <Route path="students" element={<Students />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Protected Student Dashboard Route */}
          <Route
            path="/student-dashboard"
            element={
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
