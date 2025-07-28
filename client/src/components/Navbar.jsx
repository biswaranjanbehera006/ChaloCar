import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setMenuOpen(false); // Close menu on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-white hover:text-pink-400 font-medium transition-all">Home</Link>
      <Link to="/cars" className="text-white hover:text-pink-400 font-medium transition-all">Cars</Link>
      <Link to="/about" className="text-white hover:text-pink-400 font-medium transition-all">About</Link>
      <Link to="/contact" className="text-white hover:text-pink-400 font-medium transition-all">Contact Us</Link>
      {user && (
        <Link to="/my-bookings" className="text-white hover:text-pink-400 font-medium transition-all">My Bookings</Link>
      )}
    </>
  );

  return (
<nav className="bg-black/60 backdrop-blur-md shadow-md px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
   <Link
  to="/"
  className="flex items-center space-x-2 text-2xl font-bold text-indigo-200 hover:text-indigo-400 transition-all duration-300"
>
 <img
  src="https://cdn-icons-png.flaticon.com/512/743/743920.png"
  alt="ZoomRent Logo"
  className="w-8 h-8"
/>

 <span className="text-white font-bold text-2xl">
  Chalo<span className="text-indigo-300">Cars</span>
</span>

</Link>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks />
          {!user ? (
            <>
              <Link to="/login" className="text-white hover:text-pink-400 font-medium transition-all">Login</Link>
              <Link to="/register" className="text-white hover:text-pink-400 font-medium transition-all">Register</Link>
            </>
          ) : (
            <>
              <span className="text-gray-300 font-semibold">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden text-white text-2xl">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4 text-white">
          <NavLinks />
          {!user ? (
            <>
              <Link to="/login" className="hover:text-pink-400 transition-all">Login</Link>
              <Link to="/register" className="hover:text-pink-400 transition-all">Register</Link>
            </>
          ) : (
            <>
              <span className="text-gray-300 font-semibold">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
