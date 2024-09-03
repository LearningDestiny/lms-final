import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Adjust the path as necessary
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Message = () => {
  const [teachers, setTeachers] = useState([]);
  const [businessForms, setBusinessForms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});

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
    };

    fetchData();
  }, []);

  const handleDelete = async (collectionName, id) => {
    await deleteDoc(doc(firestore, collectionName, id));
    setTeachers(teachers.filter(item => item.id !== id));
    setBusinessForms(businessForms.filter(item => item.id !== id));
    setEnrollments(enrollments.filter(item => item.id !== id));
  };

  const handleEdit = (collectionName, item) => {
    setEditMode({ collectionName, id: item.id });
    setEditData(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { collectionName, id } = editMode;
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, editData);
    setEditMode(null);

    // Re-fetch data to reflect changes
    const fetchData = async () => {
      const snapshot = await getDocs(collection(firestore, collectionName));
      const updatedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (collectionName === 'teachers') setTeachers(updatedData);
      if (collectionName === 'businessForms') setBusinessForms(updatedData);
      if (collectionName === 'enrollments') setEnrollments(updatedData);
    };

    fetchData();
  };

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
                {editMode && editMode.id === teacher.id ? (
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      className="text-lg text-black mb-2"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    {/* Add other fields as necessary for editing */}
                    <button type="submit" className="text-green-500">Save</button>
                    <button onClick={() => setEditMode(null)} className="text-red-500 ml-2">Cancel</button>
                  </form>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-black">Name: {teacher.name}</p>
                    <p className="text-lg text-black">Email: {teacher.email}</p>
                    <p className="text-lg text-black">Phone: {teacher.phone}</p>
                    <p className="text-lg text-black">Subject: {teacher.subject}</p>
                    <p className="text-lg text-black">Experience: {teacher.experience} years</p>
                    <p className="text-lg text-black">Qualifications: {teacher.qualifications}</p>
                    <p className="text-lg text-black">Referral Code: {teacher.referralCode || 'N/A'}</p>
                    <button onClick={() => handleEdit('teachers', teacher)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDelete('teachers', teacher.id)} className="text-red-500 ml-2">Delete</button>
                  </>
                )}
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
            businessForms.map((form) => (
              <div key={form.id} className="p-4 bg-green-100 rounded-lg shadow">
                {editMode && editMode.id === form.id ? (
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      className="text-lg text-black mb-2"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    {/* Add other fields as necessary for editing */}
                    <button type="submit" className="text-green-500">Save</button>
                    <button onClick={() => setEditMode(null)} className="text-red-500 ml-2">Cancel</button>
                  </form>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-black">Name: {form.name}</p>
                    <p className="text-lg text-black">Age: {form.age}</p>
                    <p className="text-lg text-black">Gender: {form.gender}</p>
                    <p className="text-lg text-black">Email: {form.email}</p>
                    <p className="text-lg text-black">Message: {form.message}</p>
                    <button onClick={() => handleEdit('businessForms', form)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDelete('businessForms', form.id)} className="text-red-500 ml-2">Delete</button>
                  </>
                )}
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
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="p-4 bg-yellow-100 rounded-lg shadow">
                {editMode && editMode.id === enrollment.id ? (
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      className="text-lg text-black mb-2"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    {/* Add other fields as necessary for editing */}
                    <button type="submit" className="text-green-500">Save</button>
                    <button onClick={() => setEditMode(null)} className="text-red-500 ml-2">Cancel</button>
                  </form>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-black">Name: {enrollment.name}</p>
                    <p className="text-lg text-black">WhatsApp Number: {enrollment.whatsappNumber}</p>
                    <p className="text-lg text-black">Course Title: {enrollment.courseTitle}</p>
                    <p className="text-lg text-black">Timestamp: {new Date(enrollment.timestamp.seconds * 1000).toLocaleString()}</p>
                    <button onClick={() => handleEdit('enrollments', enrollment)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDelete('enrollments', enrollment.id)} className="text-red-500 ml-2">Delete</button>
                  </>
                )}
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
