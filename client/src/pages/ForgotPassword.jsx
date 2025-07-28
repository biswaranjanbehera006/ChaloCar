import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      setVerified(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
      setVerified(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1950&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Form Box */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 mt-20 relative z-10">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Verify Email</h2>
          {message && <p className="mb-4 text-sm text-black-600 text-center">{message}</p>}
          <form onSubmit={handleVerify}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Verify Email
            </button>
          </form>

          {verified && (
            <a
              href={`/reset-password?email=${encodeURIComponent(email)}`}
              className="w-full inline-block mt-4 bg-gray-900 text-white py-2 rounded-lg text-center hover:bg-green-700 transition duration-300"
            >
              Proceed to reset password
            </a>
          )}
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
