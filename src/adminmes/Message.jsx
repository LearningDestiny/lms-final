import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Import Firestore instance
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Message = () => {
  const [teachers, setTeachers] = useState([]);
  const [businessForms, setBusinessForms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    rating: 0,
    ratingCount: 0,
    price: '',
    imageUrl: '',
    lastUpdated: '',
    duration: '',
    lectureCount: 0,
    description: '',
    highlights: '',
    months: 1, // Track the number of months for the roadmap
    roadmap: []
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
    };

    fetchData();
  }, []);

  // Add or update course in Firestore
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const formattedCourse = {
      ...newCourse,
      highlights: newCourse.highlights.split(','), // Assume highlights are comma-separated
      roadmap: newCourse.roadmap
    };

    try {
      if (editingCourse) {
        // Update course if editing
        await updateDoc(doc(firestore, 'courses', editingCourse.id), formattedCourse);
        alert("Course updated successfully!");
      } else {
        // Add new course
        await addDoc(collection(firestore, 'courses'), formattedCourse);
        alert("Course added successfully!");
      }

      // Fetch updated courses
      const coursesSnapshot = await getDocs(collection(firestore, 'courses'));
      const fetchedCourses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(fetchedCourses);

      // Reset the form
      setNewCourse({
        title: '',
        instructor: '',
        rating: 0,
        ratingCount: 0,
        price: '',
        imageUrl: '',
        lastUpdated: '',
        duration: '',
        lectureCount: 0,
        description: '',
        highlights: '',
        months: 1,
        roadmap: []
      });
      setEditingCourse(null);
    } catch (error) {
      console.error("Error saving course: ", error);
    }
  };

  // Delete course from Firestore
  const handleDeleteCourse = async (id) => {
    await deleteDoc(doc(firestore, 'courses', id));
    setCourses(courses.filter(course => course.id !== id));
  };

  // Handle course edit
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      instructor: course.instructor,
      rating: course.rating,
      ratingCount: course.ratingCount,
      price: course.price,
      imageUrl: course.imageUrl,
      lastUpdated: course.lastUpdated,
      duration: course.duration,
      lectureCount: course.lectureCount,
      description: course.description,
      highlights: course.highlights.join(', '),
      months: course.roadmap.length,
      roadmap: course.roadmap
    });
  };

  // Handle number of months change
  const handleMonthChange = (e) => {
    const months = parseInt(e.target.value);
    setNewCourse({
      ...newCourse,
      months,
      roadmap: Array(months).fill({ month: '', weeks: [] }) // Initialize roadmap for each month
    });
  };

  // Handle roadmap change (for week titles and topics)
  const handleRoadmapChange = (monthIndex, weekIndex, field, value) => {
    const updatedRoadmap = [...newCourse.roadmap];
    updatedRoadmap[monthIndex].weeks[weekIndex][field] = value;
    setNewCourse({ ...newCourse, roadmap: updatedRoadmap });
  };

  // Add a week to the month in the roadmap
  const addWeek = (monthIndex) => {
    const updatedRoadmap = [...newCourse.roadmap];
    updatedRoadmap[monthIndex].weeks.push({ week: '', topics: [] });
    setNewCourse({ ...newCourse, roadmap: updatedRoadmap });
  };

  // Handle image URL input
  const handleImageUpload = (e) => {
    setNewCourse({ ...newCourse, imageUrl: e.target.value });
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
            businessForms.map((form) => (
              <div key={form.id} className="p-4 bg-green-100 rounded-lg shadow">
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
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="p-4 bg-yellow-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {enrollment.name}</p>
                <p className="text-lg text-black">WhatsApp Number: {enrollment.whatsappNumber}</p>
                <p className="text-lg text-black">Course Title: {enrollment.courseTitle}</p>
                <p className="text-lg text-black">
                  Timestamp: {new Date(enrollment.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No enrollments found.</p>
          )}
        </div>
      </section>

      {/* Section for Courses */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <div className="space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Title: {course.title}</p>
                <p className="text-lg text-black">Instructor: {course.instructor}</p>
                <p className="text-lg text-black">Price: {course.price}</p>
                <button onClick={() => handleEditCourse(course)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </section>

      {/* Form to Add or Edit Course */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={handleCourseSubmit}>
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="border p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCourse.imageUrl}
            onChange={handleImageUpload}
            className="border p-2 mb-4"
          />
          <input
            type="number"
            placeholder="Months (Roadmap Duration)"
            value={newCourse.months}
            onChange={handleMonthChange}
            className="border p-2 mb-4"
          />
          <div>
            {Array.from({ length: newCourse.months }).map((_, monthIndex) => (
              <div key={monthIndex} className="mb-4">
                <h4 className="text-xl font-bold">Month {monthIndex + 1}</h4>
                {newCourse.roadmap[monthIndex]?.weeks?.map((week, weekIndex) => (
                  <div key={weekIndex}>
                    <input
                      type="text"
                      placeholder="Week Title"
                      value={week.week}
                      onChange={(e) => handleRoadmapChange(monthIndex, weekIndex, 'week', e.target.value)}
                      className="border p-2 mb-2"
                    />
                    <textarea
                      placeholder="Topics (comma separated)"
                      value={week.topics.join(', ')}
                      onChange={(e) => handleRoadmapChange(monthIndex, weekIndex, 'topics', e.target.value.split(','))}
                      className="border p-2 mb-2"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addWeek(monthIndex)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  Add Week
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="py-3 px-6 bg-blue-500 text-white rounded-lg">
            {editingCourse ? 'Update Course' : 'Add Course'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Message;
