import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Loader2, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState({});
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sorted);
      setFilteredBookings(sorted);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const setActionLoading = (id, type, value) => {
    setLoadingActions((prev) => ({
      ...prev,
      [`${type}_${id}`]: value,
    }));
  };

  const updateStatus = async (id, action) => {
    try {
      setActionLoading(id, action, true);
      const endpoint =
        action === "approve"
          ? `http://localhost:5000/api/bookings/${id}/approve`
          : `http://localhost:5000/api/bookings/${id}/decline`;

      await axios.put(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBookings();
    } catch (err) {
      console.error("Error updating booking status:", err);
    } finally {
      setActionLoading(id, action, false);
    }
  };

  const deleteBooking = async (id) => {
    try {
      setActionLoading(id, "delete", true);
      await axios.delete(`http://localhost:5000/api/bookings/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setFilteredBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err.response?.data?.message || err.message);
    } finally {
      setActionLoading(id, "delete", false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = bookings.filter((b) =>
      b.fullName?.toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 z-[-10] w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
      </div>

      {/* Page Content */}
      <div className="p-6 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">📋 Manage Bookings</h2>
          <Button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-green-600 text-white hover:bg-green-700 rounded-full px-4 py-2 flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Go to Dashboard
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by Name..."
            value={search}
            onChange={handleSearch}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg shadow-sm border border-white/30 bg-white/10 text-white placeholder-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Loader / Content */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-white" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <p className="text-center text-white">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((b) => {
              const isApproving = loadingActions[`approve_${b._id}`];
              const isDeclining = loadingActions[`decline_${b._id}`];
              const isDeleting = loadingActions[`delete_${b._id}`];

              return (
                <div
                  key={b._id}
                  className="relative backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-xl rounded-2xl p-5 transition-all hover:shadow-2xl"
                >
                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>

                  {/* Car Info */}
                  <div className="flex gap-4 items-center">
                    {b.car?.image && (
                      <img
                        src={b.car.image}
                        alt={b.car.model}
                        className="w-32 h-24 object-cover rounded-lg border"
                      />
                    )}
                    <div>
                      <p><strong>Car:</strong> {b.car?.model || "N/A"}</p>
                      <p><strong>Price:</strong> ₹{b.car?.pricePerDay || "N/A"}</p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="border-t border-white/30 pt-3 text-sm space-y-1">
                    <p><strong>Name:</strong> {b.fullName}</p>
                    <p><strong>Mobile:</strong> {b.mobile}</p>
                    <p><strong>Email:</strong> {b.email || b.user?.email}</p>
                    <p><strong>Location:</strong> {b.location}</p>
                    <p><strong>Username:</strong> {b.user?.username}</p>
                  </div>

                  {/* Time & Status */}
                  <div className="border-t border-white/30 pt-3 text-sm space-y-1">
                    <p><strong>Pickup:</strong> {new Date(b.pickupDateTime).toLocaleString()}</p>
                    <p><strong>Return:</strong> {new Date(b.returnDateTime).toLocaleString()}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`font-semibold capitalize ${
                        b.status === "pending"
                          ? "text-yellow-300"
                          : b.status === "approved"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                        {b.status}
                      </span>
                    </p>
                  </div>

                  {/* Approve/Decline */}
                  {b.status === "pending" && (
                    <div className="pt-4 flex gap-4">
                      <Button
                        onClick={() => updateStatus(b._id, "approve")}
                        disabled={isApproving}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                      >
                        {isApproving ? (
                          <>
                            <Loader2 className="animate-spin w-4 h-4 mr-2" />
                            Approving...
                          </>
                        ) : (
                          "✅ Approve"
                        )}
                      </Button>
                      <Button
                        onClick={() => updateStatus(b._id, "decline")}
                        disabled={isDeclining}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full"
                      >
                        {isDeclining ? (
                          <>
                            <Loader2 className="animate-spin w-4 h-4 mr-2" />
                            Declining...
                          </>
                        ) : (
                          "❌ Decline"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AdminBookings;
