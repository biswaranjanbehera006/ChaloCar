import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const AdminNotifications = () => {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const send = async () => {
    if (!email || !text) {
      toast.warning('⚠ Please fill in both email and message');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/test/email', { email, message: text });
      toast.success('✅ Reminder email sent successfully!');
      setEmail('');
      setText('');
    } catch (err) {
      console.error('❌ Email send failed:', err);
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-10 py-10">
        
        {/* Dashboard Button */}
        <div className="absolute top-4 right-4">
          <Button
            onClick={() => navigate('/admin-dashboard')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full shadow-lg"
          >
            Go to Dashboard
          </Button>
        </div>

        {/* Notification Card */}
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 mt-16 sm:mt-24 border border-white/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Send Reminder Email</h2>
          <p className="text-center text-gray-200 mb-8 text-sm sm:text-base">
            Use this form to send a reminder email to users (e.g., pending bookings or overdue returns).
          </p>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block mb-2 font-medium text-white">User Email</label>
              <input
                type="email"
                placeholder="e.g. user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block mb-2 font-medium text-white">Message</label>
              <textarea
                rows={5}
                placeholder="Write your reminder message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              ></textarea>
            </div>

            {/* Send Button */}
            <div>
              <Button
                onClick={send}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reminder'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminNotifications;
