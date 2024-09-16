import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

const RegisterForm = () => {
  const { type } = useParams(); // Get the type from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', additionalInfo: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, `${type}Registrations`), formData);
      alert(`${type} registration successful!`);
      navigate('/'); // Navigate back to home after submission
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register for {type}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          value={formData.additionalInfo}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
