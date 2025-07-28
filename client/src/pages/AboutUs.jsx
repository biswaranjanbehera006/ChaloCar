import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { FaLinkedin, FaGithub } from "react-icons/fa";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f8fafc] pt-28 px-4">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-12">About Us</h1>

      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        {/* Who We Are */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🚗 Who We Are</h2>
          <p className="text-gray-800 text-lg">
            Welcome to <strong>Qlith Car Rental</strong> – your trusted platform
            for renting cars, bikes, and even homes across India! We connect users
            with affordable and flexible rental solutions powered by modern tech.
          </p>
        </section>

        {/* Journey Timeline */}
        <section className="relative border-l-4 border-indigo-500 pl-6 space-y-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🕒 Our Journey</h2>
          {[
            { year: "2023", desc: "Started as a college project to simplify rentals." },
            { year: "2024", desc: "Launched MVP using MERN stack and onboarded users." },
            { year: "2025", desc: "Expanded pan-India with 5K+ users and scaling up." },
          ].map((item, index) => (
            <div key={index} className="relative ml-4 animate-fade-up duration-700">
              <div className="absolute -left-4 top-2 w-3 h-3 bg-indigo-600 rounded-full" />
              <h4 className="text-lg font-bold text-slate-700">{item.year}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 📈 Growth Chart */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">📊 Growth & Market Value</h2>
          <div className="w-full bg-white p-4 rounded-xl shadow-inner">
            <div className="w-full h-4 bg-indigo-100 rounded-full mb-4">
              <div className="h-full bg-indigo-600 rounded-full animate-[grow1_3s_ease-in-out_forwards] w-[40%]" />
            </div>
            <p className="text-gray-700 font-medium mb-1">2023: 100+ users</p>

            <div className="w-full h-4 bg-indigo-100 rounded-full mb-4">
              <div className="h-full bg-indigo-600 rounded-full animate-[grow2_3s_ease-in-out_forwards] w-[70%]" />
            </div>
            <p className="text-gray-700 font-medium mb-1">2024: 1000+ users</p>

            <div className="w-full h-4 bg-indigo-100 rounded-full">
              <div className="h-full bg-indigo-600 rounded-full animate-[grow3_3s_ease-in-out_forwards] w-[90%]" />
            </div>
            <p className="text-gray-700 font-medium">2025: 5000+ users | ₹50L+ market reach</p>
          </div>
        </section>

        {/* 💬 Testimonials */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">💬 What Users Say</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                user: "Amit Sharma",
                feedback: "Qlith made my Goa trip seamless. Great car, great service!",
              },
              {
                user: "Neha Verma",
                feedback: "Easy to book, affordable rates, and reliable options. Loved it!",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow-md border-l-4 border-indigo-400"
              >
                <p className="text-gray-700 italic">"{t.feedback}"</p>
                <h4 className="mt-2 text-indigo-700 font-bold">– {t.user}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* 🧩 Tech Stack */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🧩 Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"].map((tech, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-white rounded-xl shadow text-indigo-700 font-semibold"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* 🤝 Partners */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🤝 Our Partners</h2>
          <div className="flex justify-center items-center gap-10 flex-wrap">
            {[
              {
                name: "Microsoft",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              },
              {
                name: "Google",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
              },
              {
                name: "Amazon",
                logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
              },
            ].map((partner, idx) => (
              <img
                key={idx}
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-auto transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </section>

        {/* 👥 Team */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">👥 Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="text-center space-y-3 transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto shadow-lg object-cover"
                />
                <h4 className="text-lg font-semibold text-slate-700">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center gap-4 text-indigo-600 text-xl">
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
        </section>

        {/* 💰 Funding Info */}
        <section className="bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">💰 Investors & Funding</h2>
          <p className="text-gray-800 text-lg">
            We're backed by early-stage angel investors and industry mentors, with
            an initial seed funding of ₹10 Lakhs aimed at expanding reach and building infrastructure.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
