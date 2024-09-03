import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

const Message = () => {
  const [teachers, setTeachers] = useState([]);
  const [businessForms, setBusinessForms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch teachers
      const teachersSnapshot = await getDocs(collection(firestore, 'teachers'));
      const fetchedTeachers = teachersSnapshot.docs.map(doc => doc.data());
      setTeachers(fetchedTeachers);

      // Fetch business forms
      const businessFormsSnapshot = await getDocs(collection(firestore, 'businessForms'));
      const fetchedBusinessForms = businessFormsSnapshot.docs.map(doc => doc.data());
      setBusinessForms(fetchedBusinessForms);

      // Fetch enrollments
      const enrollmentsSnapshot = await getDocs(collection(firestore, 'enrollments'));
      const fetchedEnrollments = enrollmentsSnapshot.docs.map(doc => doc.data());
      setEnrollments(fetchedEnrollments);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Messages Overview</h1>

      {/* Section for Teachers */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Teachers</h2>
        <div className="space-y-4">
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <div key={index} className="p-4 bg-blue-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {teacher.name}</p>
                <p className="text-lg text-black">Email: {teacher.email}</p>
                <p className="text-lg text-black">Phone: {teacher.phone}</p>
                <p className="text-lg text-black">Subject: {teacher.subject}</p>
                <p className="text-lg text-black">Experience: {teacher.experience} years</p>
                <p className="text-lg text-black">Qualifications: {teacher.qualifications}</p>
                <p className="text-lg text-black">Referral Code: {teacher.referralCode || 'N/A'}</p>
              </div>
            ))
          ) : (
            <p>No teachers found.</p>
          )}
        </div>
      </section>

      {/* Section for Business Forms */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Business Forms</h2>
        <div className="space-y-4">
          {businessForms.length > 0 ? (
            businessForms.map((form, index) => (
              <div key={index} className="p-4 bg-green-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {form.name}</p>
                <p className="text-lg text-black">Age: {form.age}</p>
                <p className="text-lg text-black">Gender: {form.gender}</p>
                <p className="text-lg text-black">Email: {form.email}</p>
                <p className="text-lg text-black">Message: {form.message}</p>
              </div>
            ))
          ) : (
            <p>No business forms found.</p>
          )}
        </div>
      </section>

      {/* Section for Enrollments */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Enrollments</h2>
        <div className="space-y-4">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment, index) => (
              <div key={index} className="p-4 bg-yellow-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {enrollment.name}</p>
                <p className="text-lg text-black">WhatsApp Number: {enrollment.whatsappNumber}</p>
                <p className="text-lg text-black">Course Title: {enrollment.courseTitle}</p>
                <p className="text-lg text-black">Timestamp: {new Date(enrollment.timestamp.seconds * 1000).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No enrollments found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Message;
