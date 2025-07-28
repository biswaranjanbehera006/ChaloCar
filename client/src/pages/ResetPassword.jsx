import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    if (!email) {
      setError('Invalid or missing email. Please verify your email again.');
    }
  }, [email]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center mt-20 px-4 py-16">
        <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Reset Password</h2>

          {error && (
            <div className="mb-4 text-sm text-center text-red-500 bg-red-100 bg-opacity-80 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 text-sm text-center text-green-600 bg-green-100 bg-opacity-80 px-4 py-2 rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-5 py-3 bg-white bg-opacity-90 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="New password"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 bg-white bg-opacity-90 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B1120] hover:bg-[#1F2937] text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default ResetPassword;
