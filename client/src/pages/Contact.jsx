import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../components/Footer";

const ContactUs = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ltshinm",
        "template_izzdkhs",
        formRef.current,
        "wCNyXQw-8vmyqhi6y"
      )
      .then(
        () => {
          setDone(true);
          formRef.current.reset();
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  return (
    <div className="relative min-h-screen pt-28 pb-10 px-4 scroll-mt-24 overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Darker Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12 drop-shadow-lg">
        Contact Us
      </h1>

      {/* Grid Layout */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        
        {/* Contact Info */}
        <div className="bg-white/15 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 drop-shadow">
            📞 Get in Touch
          </h2>
          <div className="space-y-4 sm:space-y-6 text-base">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-200" />
              <span className="text-sm sm:text-base drop-shadow">
                eleenajena2002@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-indigo-200" />
              <span className="text-sm sm:text-base drop-shadow">
                +91 8926145029
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-200" />
              <span className="text-sm sm:text-base drop-shadow">
                Bhubaneswar, Odisha, India
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="mt-6 sm:mt-8 w-full h-52 sm:h-64 rounded-xl overflow-hidden shadow-lg border border-white/10">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.0432466953385!2d85.81969889635192!3d20.296058399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909c5de2f9c1d%3A0xa6e8775a6a8e3a4!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1688234567890"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-white/15 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 sm:space-y-6 text-white"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 drop-shadow">
            📬 Send a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
          >
            Send Message
          </button>

          {done && (
            <p className="text-green-200 font-medium mt-2 sm:mt-3">
              Message sent successfully! ✅
            </p>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="mt-10 sm:mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;