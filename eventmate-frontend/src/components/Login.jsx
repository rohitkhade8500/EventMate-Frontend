import React, { useState } from 'react';
import axios from 'axios';

const LOGIN_URL = \${import.meta.env.VITE_API_BASE_URL}/api/auth/login`;`

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('creator1@example.com'); 
  const [password, setPassword] = useState('mypassword123'); 
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      // If login is successful
      const token = response.data.token;
      onLoginSuccess(token); // Send the token back up to App.jsx
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}


export default Login;

