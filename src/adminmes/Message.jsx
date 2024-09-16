import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import EnrollmentForm from '../enrollpages/EnrollmentForm';

const Message = () => {
  const [teachers, setTeachers] = useState([]);
  const [businessForms, setBusinessForms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [workshopRegistrations, setWorkshopRegistrations] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [internshipRegistrations, setInternshipRegistrations] = useState([]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingBusinessForm, setEditingBusinessForm] = useState(null);
  
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    experience: '',
    qualifications: '',
    referralCode: '',
  });

  const [newBusinessForm, setNewBusinessForm] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch teachers
      const teachersSnapshot = await getDocs(collection(firestore, 'teachers'));
      const fetchedTeachers = teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(fetchedTeachers);

      // Fetch business forms
      const businessFormsSnapshot = await getDocs(collection(firestore, 'businessForms'));
      const fetchedBusinessForms = businessFormsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBusinessForms(fetchedBusinessForms);

      // Fetch enrollments
      const enrollmentsSnapshot = await getDocs(collection(firestore, 'enrollments'));
      const fetchedEnrollments = enrollmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnrollments(fetchedEnrollments);

      // Fetch courses
      const coursesSnapshot = await getDocs(collection(firestore, 'courses'));
      const fetchedCourses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(fetchedCourses);

      // Fetch workshop registrations
      const workshopSnapshot = await getDocs(collection(firestore, 'workshopRegistrations'));
      const fetchedWorkshops = workshopSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkshopRegistrations(fetchedWorkshops);

      // Fetch event registrations
      const eventSnapshot = await getDocs(collection(firestore, 'eventRegistrations'));
      const fetchedEvents = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEventRegistrations(fetchedEvents);

      // Fetch internship registrations
      const internshipSnapshot = await getDocs(collection(firestore, 'internshipRegistrations'));
      const fetchedInternships = internshipSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInternshipRegistrations(fetchedInternships);
    };

    fetchData();
  }, []);

  // Show enrollment form for a specific course
  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  // Close enrollment form
  const handleCloseEnrollmentForm = () => {
    setShowEnrollmentForm(false);
    setSelectedCourse(null);
    setEditingEnrollment(null);
  };

  // Functions for editing and deleting other data have been omitted for brevity

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Messages Overview</h1>

      {/* Section for Teachers */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Teachers</h2>
        <div className="space-y-4">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <div key={teacher.id} className="p-4 bg-blue-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {teacher.name}</p>
                <p className="text-lg text-black">Email: {teacher.email}</p>
                <p className="text-lg text-black">Phone: {teacher.phone}</p>
                <p className="text-lg text-black">Subject: {teacher.subject}</p>
                <p className="text-lg text-black">Experience: {teacher.experience} years</p>
                <p className="text-lg text-black">Qualifications: {teacher.qualifications}</p>
                <p className="text-lg text-black">Referral Code: {teacher.referralCode || 'N/A'}</p>
                <button onClick={() => handleEditTeacher(teacher)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteTeacher(teacher.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))
          ) : (
            <p>No teachers found.</p>
          )}
        </div>
        {/* Add or Edit Teacher Form */}
      </section>

      {/* Section for Business Forms */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Business Forms</h2>
        <div className="space-y-4">
          {businessForms.length > 0 ? (
            businessForms.map((form) => (
              <div key={form.id} className="p-4 bg-green-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {form.name}</p>
                <p className="text-lg text-black">Age: {form.age}</p>
                <p className="text-lg text-black">Gender: {form.gender}</p>
                <p className="text-lg text-black">Email: {form.email}</p>
                <p className="text-lg text-black">Message: {form.message}</p>
                <button onClick={() => handleEditBusinessForm(form)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteBusinessForm(form.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))
          ) : (
            <p>No business forms found.</p>
          )}
        </div>
        {/* Add or Edit Business Form */}
      </section>

      {/* Section for Workshop Registrations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Workshop Registrations</h2>
        <div className="space-y-4">
          {workshopRegistrations.length > 0 ? (
            workshopRegistrations.map((registration) => (
              <div key={registration.id} className="p-4 bg-purple-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {registration.name}</p>
                <p className="text-lg text-black">Phone: {registration.phone}</p>
                <p className="text-lg text-black">Email: {registration.email}</p>
                <p className="text-lg text-black">Additional Info: {registration.additionalInfo}</p>
              </div>
            ))
          ) : (
            <p>No workshop registrations found.</p>
          )}
        </div>
      </section>

      {/* Section for Event Registrations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Event Registrations</h2>
        <div className="space-y-4">
          {eventRegistrations.length > 0 ? (
            eventRegistrations.map((registration) => (
              <div key={registration.id} className="p-4 bg-green-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {registration.name}</p>
                <p className="text-lg text-black">Phone: {registration.phone}</p>
                <p className="text-lg text-black">Email: {registration.email}</p>
                <p className="text-lg text-black">Additional Info: {registration.additionalInfo}</p>
              </div>
            ))
          ) : (
            <p>No event registrations found.</p>
          )}
        </div>
      </section>

      {/* Section for Internship Registrations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Internship Registrations</h2>
        <div className="space-y-4">
          {internshipRegistrations.length > 0 ? (
            internshipRegistrations.map((registration) => (
              <div key={registration.id} className="p-4 bg-yellow-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {registration.name}</p>
                <p className="text-lg text-black">Phone: {registration.phone}</p>
                <p className="text-lg text-black">Email: {registration.email}</p>
                <p className="text-lg text-black">Additional Info: {registration.additionalInfo}</p>
              </div>
            ))
          ) : (
            <p>No internship registrations found.</p>
          )}
        </div>
      </section>

      {/* Existing Sections for Enrollments and Courses */}
      
      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <EnrollmentForm 
          course={selectedCourse} 
          onClose={handleCloseEnrollmentForm} 
          enrollment={editingEnrollment}
        />
      )}
    </div>
  );
};

export default Message;
