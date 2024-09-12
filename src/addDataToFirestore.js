// src/addDataToFirestore.js

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { courses, categories } from './Datax'; // Import your data

// Function to add courses to Firestore
const addCoursesToFirestore = async () => {
  try {
    // Reference to the 'courses' collection
    const coursesCollectionRef = collection(db, 'courses');

    // Loop through the courses array and add each course to Firestore
    for (const course of courses) {
      await addDoc(coursesCollectionRef, course);
    }
    console.log('Courses added to Firestore successfully!');
  } catch (error) {
    console.error('Error adding courses to Firestore: ', error);
  }
};

// Function to add categories to Firestore
const addCategoriesToFirestore = async () => {
  try {
    // Reference to the 'categories' collection
    const categoriesCollectionRef = collection(db, 'categories');

    // Loop through the categories array and add each category to Firestore
    for (const category of categories) {
      await addDoc(categoriesCollectionRef, category);
    }
    console.log('Categories added to Firestore successfully!');
  } catch (error) {
    console.error('Error adding categories to Firestore: ', error);
  }
};

// Call the functions
addCoursesToFirestore();
addCategoriesToFirestore();
