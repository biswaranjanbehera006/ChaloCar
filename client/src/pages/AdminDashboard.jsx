import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Car,
  Users,
  CalendarDays,
  Bell,
  LogOut,
  Home,
  Info,
  X,
  Menu,
  LayoutDashboard,
  PlusCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.role === 'admin') {
        setAdminName(user.username || user.name || 'Admin');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const actions = [
    {
      label: 'Manage Cars',
      icon: <Car className="w-10 h-10 text-sky-600 mb-2" />,
      path: '/admin/cars',
      description: 'Add, edit, or delete car listings',
    },
    {
      label: 'Manage Bookings',
      icon: <CalendarDays className="w-10 h-10 text-emerald-600 mb-2" />,
      path: '/admin/bookings',
      description: 'View and update all bookings',
    },
    {
      label: 'User Details',
      icon: <Users className="w-10 h-10 text-amber-500 mb-2" />,
      path: '/admin/users',
      description: 'View users and their rental history',
    },
    {
      label: 'Send Notifications',
      icon: <Bell className="w-10 h-10 text-rose-600 mb-2" />,
      path: '/admin/notifications',
      description: 'Notify users about rental updates',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white/20 backdrop-blur-md border-b border-white/30 px-6 py-4 text-white shadow-md sticky top-0 z-50">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide">ChaloCars Admin</h2>

            {/* Hamburger Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(prev => !prev)}
                className="text-white focus:outline-none"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 items-center text-sm">
              {/* <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1 hover:text-blue-300 transition"
              >
                <Home className="w-4 h-4" /> Home
              </button>
              <button
                onClick={() => navigate('/about')}
                className="flex items-center gap-1 hover:text-blue-300 transition"
              >
                <Info className="w-4 h-4" /> About Us
              </button> */}
              {/* <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-1 hover:text-blue-300 transition"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button> */}
              <button
                onClick={() => navigate('/admin/cars/new')}
                className="flex items-center gap-1 hover:text-blue-300 transition"
              >
                <PlusCircle className="w-4 h-4" /> Add Car
              </button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="flex flex-col gap-3 mt-4 md:hidden animate-slide-down text-white">
              <button
                onClick={() => {
                  navigate('/');
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 hover:text-blue-300 px-2"
              >
                <Home className="w-4 h-4" /> Home
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 hover:text-blue-300 px-2"
              >
                <Info className="w-4 h-4" /> About Us
              </button>
              <button
                onClick={() => {
                  navigate('/admin/dashboard');
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 hover:text-blue-300 px-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>
              <button
                onClick={() => {
                  navigate('/admin/cars');
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 hover:text-blue-300 px-2"
              >
                <PlusCircle className="w-4 h-4" /> Add Car
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 hover:text-red-400 px-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </nav>

        {/* Dashboard Header */}
        <main className="flex-grow px-6 py-12 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-2">
              Welcome, {adminName} 👋
            </h1>
            <p className="text-slate-200 text-lg">
              Here's your admin dashboard overview
            </p>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                <Card className="bg-white/30 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl">
                  <CardContent className="p-8 text-center flex flex-col items-center">
                    {action.icon}
                    <h3 className="text-2xl font-semibold mt-3 text-gray-900">
                      {action.label}
                    </h3>
                    <p className="text-sm text-gray-700 mb-6">
                      {action.description}
                    </p>
                    <button
                      onClick={() => navigate(action.path)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm shadow transition"
                    >
                      Go to {action.label}
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
