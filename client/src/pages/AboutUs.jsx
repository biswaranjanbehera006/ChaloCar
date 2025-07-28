import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Eleena Jena",
      role: "Full Stack Developer",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      github: "https://github.com/eleenajena19",
      linkedin: "https://www.linkedin.com/in/eleena-jena",
    },
    {
      name: "Biswa Ranjan Behera",
      role: "Full Stack Developer",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Krishna Nayak",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Subhranshu Pal",
      role: "Backend Specialist",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
    },
  ];

  const fadeInProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.1 },
    viewport: { once: true },
  };

  return (
    <div className="relative min-h-screen pt-28 px-4 overflow-hidden">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2] hidden sm:block scale-110"
        autoPlay
        loop
        muted
        playsInline
        src="/bg-video.mp4"
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[-1]" />

      <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg mb-12">About Us</h1>

      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        {/* Who We Are */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🚗 Who We Are</h2>
          <p className="text-gray-100 text-lg drop-shadow-sm">
            Welcome to <strong>ChaloCars Rental</strong> – your trusted platform for renting cars, bikes, and even homes across India! We connect users with affordable and flexible rental solutions powered by modern tech.
          </p>
        </motion.section>

        {/* Journey Timeline */}
        <motion.section {...fadeInProps} className="relative border-l-4 border-white pl-6 space-y-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🕒 Our Journey</h2>
          {[
            "Started as a college project to simplify rentals.",
            "Launched MVP using MERN stack and onboarded users.",
            "Expanded pan-India with 5K+ users and scaling up."
          ].map((desc, index) => (
            <div key={index} className="relative ml-4">
              <div className="absolute -left-4 top-2 w-3 h-3 bg-white rounded-full" />
              <h4 className="text-lg font-bold text-white">{2023 + index}</h4>
              <p className="text-gray-200">{desc}</p>
            </div>
          ))}
        </motion.section>

        {/* Growth Chart */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">📊 Growth & Market Value</h2>
          <div className="w-full bg-white/20 p-4 rounded-xl shadow-inner">
            {[40, 70, 90].map((width, i) => (
              <div key={i}>
                <div className="w-full h-4 bg-white/30 rounded-full mb-2">
                  <div
                    style={{ width: width }}
                    className="h-full bg-white rounded-full transition-all duration-1000"
                  />
                </div>
                <p className="text-white font-medium mb-1">
                  {i === 0 && "2023: 100+ users"}
                  {i === 1 && "2024: 1000+ users"}
                  {i === 2 && "2025: 5000+ users | ₹50L+ market reach"}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">💬 What Users Say</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {["Amit Sharma", "Neha Verma"].map((user, idx) => (
              <div key={idx} className="bg-white/20 p-4 rounded-xl shadow-md border-l-4 border-white">
                <p className="text-white italic">
                  {idx === 0
                    ? '"ChaloCars made my Goa trip seamless. Great car, great service!"'
                    : '"Easy to book, affordable rates, and reliable options. Loved it!"'}
                </p>
                <h4 className="mt-2 text-white font-bold">– {user}</h4>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🧩 Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"].map((tech, i) => (
              <div key={i} className="px-4 py-2 bg-white/20 rounded-xl shadow text-white font-semibold">
                {tech}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Partners */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🤝 Our Partners</h2>
          <div className="flex justify-center items-center gap-10 flex-wrap">
            {["Microsoft", "Google", "Amazon"].map((partner, idx) => (
              <img
                key={idx}
                src={`https://upload.wikimedia.org/wikipedia/commons/${idx === 0 ? "4/44/Microsoft_logo.svg" : idx === 1 ? "2/2f/Google_2015_logo.svg" : "6/62/Amazon.com-Logo.svg"
                  }`}
                alt={partner}
                className="w-24 h-auto transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">👥 Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="text-center space-y-3 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto shadow-lg object-cover"
                />
                <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                <p className="text-gray-300">{member.role}</p>
                <div className="flex justify-center gap-4 text-white text-xl">
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Funding Info */}
        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">💰 Investors & Funding</h2>
          <p className="text-gray-100 text-lg">
            We're backed by early-stage angel investors and industry mentors, with an initial seed funding of ₹10 Lakhs aimed at expanding reach and building infrastructure.
          </p>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;