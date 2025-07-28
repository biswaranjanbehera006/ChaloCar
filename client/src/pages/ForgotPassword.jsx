import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Forgot Password | ChaloCar';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('https://chalocar.onrender.com/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'Verification link sent');
      setVerified(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

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

          {message && (
            <p
              className={`mb-4 text-sm text-center font-medium ${
                verified ? 'text-green-700' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleVerify}>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          {verified && (
            <a
              href={`/reset-password?email=${encodeURIComponent(email)}`}
              className="w-full inline-block mt-4 bg-green-700 text-white py-2 rounded-lg text-center hover:bg-green-800 transition duration-300"
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
