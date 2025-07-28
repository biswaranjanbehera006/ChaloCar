import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; // adjust path if needed


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://chalocar.onrender.com/api/users', {

        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to fetch users');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://chalocar.onrender.com/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('User deleted successfully');
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } catch (err) {
        toast.error('Error deleting user');
        console.error(err);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Main Content */}
      <div className="relative z-10 p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">User Management</h2>
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white/20 backdrop-blur-md p-5 shadow-md rounded-lg relative text-black border border-white/30"
            >
              <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
              <p><span className="font-medium">Username:</span> {user.username}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Role:</span> {user.role}</p>
              <button
                onClick={() => handleDelete(user._id)}
                className="absolute top-3 right-3 text-red-300 hover:text-red-500 transition"
                title="Delete user"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
       <Footer />
    </div>
    
  );
};

export default AdminUsers;
