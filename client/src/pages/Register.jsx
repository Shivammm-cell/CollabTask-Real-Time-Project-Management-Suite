import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Registration ke baad login page bhejne ke liye
import API from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Backend ke /auth/register endpoint par data bhej rahe hain
      await API.post('/auth/register', formData);
      alert("Registration Successful! Ab login kijiye.");
      navigate('/login'); // Success hone par login page par bhej do
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration fail ho gaya!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border-t-4 border-green-500">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-sans">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="Shivam Thakur"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="shivam@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <span onClick={() => navigate('/login')} className="text-green-600 cursor-pointer font-bold">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;