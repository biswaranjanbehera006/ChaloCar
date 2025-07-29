import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // ✅ Set loading

    try {
      const res = await axios.post('https://chalocar.onrender.com/api/auth/login', {
        username,
        password,
      });

      const user = res.data?.user;
      const token = res.data?.token;

      if (!user || !token) {
        throw new Error('Invalid response from server');
      }

      login(user);
      localStorage.setItem('token', token);

      const role = user?.role?.toLowerCase();

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start pt-24 p-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: url('https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1950&q=80'),
        }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md -z-10" />

      {/* Floating cards */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="w-[200px] h-[120px] bg-white/10 rounded-xl backdrop-blur-sm shadow-lg animate-float-slow absolute top-20 left-10 rotate-[15deg]" />
        <div className="w-[160px] h-[100px] bg-white/10 rounded-xl backdrop-blur-sm shadow-lg animate-float-fast absolute bottom-20 right-20 rotate-[-10deg]" />
        <div className="w-[180px] h-[110px] bg-white/10 rounded-xl backdrop-blur-sm shadow-lg animate-float-mid absolute top-[60%] left-[45%] rotate-[5deg]" />
      </div>

      {/* Login Box */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600 blur-lg opacity-40 animate-pulse z-0" />
        <div className="relative z-10 bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl w-full p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-md">
            Login to Your Account
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 placeholder-gray-600 text-gray-800"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/50 placeholder-gray-600 text-gray-800"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg ${
                loading ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            Don't have an account?{' '}
            <Link to="/register" className="text-gray-900 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 w-screen py-10 px-8 bg-black/60 backdrop-blur-md text-sm text-white flex flex-col md:flex-row items-start justify-between gap-8 border-t border-white/10">
        <div className="space-y-2">
          <h3 className="text-xl font-bold drop-shadow">ChaloCars</h3>
          <p className="drop-shadow-sm text-white">Drive the future with style and comfort.</p>
          <p className="text-xs text-white/70 drop-shadow-sm">
            © 2025 Built by <span className="font-semibold">Eleena Jena</span>
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold drop-shadow">Quick Links</h4>
          <ul className="space-y-1 text-white">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/cars" className="hover:underline">Cars</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-2 w-full md:w-auto">
          <h4 className="font-semibold drop-shadow">Subscribe to our newsletter</h4>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 px-3 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition shadow-md">
              Subscribe
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold drop-shadow">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://github.com/eleenajena19" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-6 h-6 hover:scale-110 transition" />
            </a>
            <a href="https://www.linkedin.com/in/eleenajena/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" className="w-6 h-6 hover:scale-110 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/fluency/48/instagram-new.png" className="w-6 h-6 hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Login;