import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [showCar, setShowCar] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setShowCar(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide car after scroll finishes
    setTimeout(() => {
      setShowCar(false);
    }, 1000);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 rounded text-sm text-white bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300">
          Back to Top
        </div>

<button
  onClick={scrollToTop}
  className="relative p-4 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 text-white shadow-lg hover:shadow-2xl transition-transform hover:scale-110 group animate-bounceSide"
>
  {/* 🚗 Car Icon */}
  <span className="text-2xl">🚗</span>

  {/* 🛞 Animated Tire Spin (left & right wheels) */}
  <span className="absolute -bottom-1 left-1 w-2 h-2 bg-white rounded-full blur-[1px] opacity-80 animate-tireSpin"></span>
  <span className="absolute -bottom-1 right-1 w-2 h-2 bg-white rounded-full blur-[1px] opacity-80 animate-tireSpin"></span>

  {/* 🔥 Animated Trail Effect */}
  <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-2 bg-white/30 blur-xl rounded-full animate-pulseTrail" />
</button>

      </div>
    </div>
  );
};

export default BackToTopButton;
