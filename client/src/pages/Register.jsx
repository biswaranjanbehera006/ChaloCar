import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('https://chalocar.onrender.com/api/auth/register', formData);
      console.log('Registered:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Register Error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start pt-24 p-4 overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1950&q=80')`,
        }}
      />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm -z-10" />

      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="w-[200px] h-[120px] bg-white/10 rounded-xl backdrop-blur-sm shadow-lg animate-float-slow absolute top-20 left-10 rotate-[15deg]" />
        <div className="w-[160px] h-[100px] bg-white/10 rounded-xl backdrop-blur-sm shadow-lg animate-float-fast absolute bottom-20 right-20 rotate-[-10deg]" />
        <div className="w-[180px] h-[110px] bg-white/10 rounded-xl backdrop-blur-sm shadow-lg animate-float-mid absolute top-[60%] left-[45%] rotate-[5deg]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600 blur-lg opacity-40 animate-pulse z-0" />
        <div className="relative z-10 bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl w-full p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-md">Create Account</h2>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/50 placeholder-gray-600 text-gray-800"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/50 placeholder-gray-600 text-gray-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/50 placeholder-gray-600 text-gray-800"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/50 placeholder-gray-600 text-gray-800"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin mr-2 text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              ) : (
                'Register'
              )}
            </button>
          </form>
          <p className="text-center text-sm mt-4 text-gray-700">
            Already have an account?{' '}
            <span
              className="text-gray-900 hover:underline cursor-pointer font-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <footer className="mt-20 w-screen py-10 px-8 bg-black/70 backdrop-blur-md text-sm text-white flex flex-col md:flex-row items-start justify-between gap-8 border-t border-white/10">
        <div className="space-y-2">
          <h3 className="text-xl font-bold drop-shadow">ChaloCars</h3>
          <p className="drop-shadow-sm text-white">Drive the future with style and comfort.</p>
          <p className="text-xs text-white/70 drop-shadow-sm">© 2025 Built by <span className="font-semibold">Eleena Jena</span></p>
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
              className="p-2 px-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-400"
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

export default Register;