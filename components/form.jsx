"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    router.push('/thankyou');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100  p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6  transform transition duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Contact Us</h2>
        
        <div>
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required 
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required 
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Message</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-400 text-white p-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-0.5 duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;
