import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="mt-20 w-screen py-10 px-8 bg-black/70 backdrop-blur-md text-sm text-white flex flex-col md:flex-row items-start justify-between gap-8 border-t border-white/10">
        {/* Branding Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold drop-shadow">ChaloCars</h3>
          <p className="drop-shadow-sm text-white">Drive the future with style and comfort.</p>
          <p className="text-xs text-white/70 drop-shadow-sm">
            © 2025 Built by <span className="font-semibold">Eleena Jena</span>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <h4 className="font-semibold drop-shadow">Quick Links</h4>
          <ul className="space-y-1 text-white">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/cars" className="hover:underline">Cars</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-2 w-full md:w-auto">
          <h4 className="font-semibold drop-shadow">Subscribe to our newsletter</h4>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 px-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-md glow-button">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Media */}
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Footer;
