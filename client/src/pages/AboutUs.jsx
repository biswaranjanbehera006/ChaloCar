import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const customers = [
    {
      name: "Amit Sharma",
      review: "ChaloCars made my Goa trip seamless. Great car, great service!",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      carImg: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
    {
      name: "Neha Verma",
      review: "Easy to book, affordable rates, and reliable options. Loved it!",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      carImg: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    },
    {
      name: "Raj Patel",
      review: "Booked a ride for my parents. Smooth experience and polite support.",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      carImg: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
    {
      name: "Simran Kaur",
      review: "Loved the clean car and quick response. Highly recommend!",
      image: "https://randomuser.me/api/portraits/women/80.jpg",
      carImg: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
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
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2] hidden sm:block scale-110"
        autoPlay
        loop
        muted
        playsInline
        src="/bg-video.mp4"
      />
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[-1]" />

      <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg mb-12">About Us</h1>

      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        <motion.section {...fadeInProps} className="my-10 p-6 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white mb-4">🚗 Who We Are</h2>
          <p className="text-white text-lg leading-relaxed">
            At <span className="font-semibold text-[#60a5fa]">ChaloCars</span>, we are more than just a car rental service — we are a team of passionate travel enthusiasts, tech experts, and customer-focused professionals committed to transforming your mobility experience.
          </p>
          <ul className="list-disc list-inside mt-4 text-white space-y-2">
            <li><strong>Founded in 2023</strong> by a group of software engineers, ChaloCars began with a mission to simplify vehicle rentals across India.</li>
            <li>We specialize in offering <strong>cars on rent</strong> with real-time location tracking and direct communication between owners and customers.</li>
            <li>Our platform ensures <strong>transparency, safety, and trust</strong> by thoroughly verifying every listing and user profile.</li>
            <li>We’re committed to delivering a <strong>smooth, fast, and affordable rental experience</strong> powered by modern technology.</li>
            <li>Currently operating in over <strong>25+ cities</strong> across India and continuously expanding.</li>
          </ul>
          <p className="text-white mt-4">
            Whether you’re planning a weekend getaway, need a car for business, or looking for a temporary stay — <span className="font-semibold text-[#60a5fa]">ChaloCars</span> is here to get you there, your way.
          </p>
        </motion.section>


        <motion.section {...fadeInProps} className="my-10 p-6 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md text-white">
          <h2 className="text-2xl font-bold mb-4">📍 Address & Contact Info</h2>
          <div className="bg-white/10 p-4 rounded-xl border border-white/30 space-y-2">
            <p><strong>Address:</strong> Near Esplanade One Mall, Rasulgarh, Bhubaneswar, Odisha</p>
            <p><strong>Email:</strong> support@chalocars.in</p>
            <p><strong>Phone:</strong> +91-9876543210</p>
            <div className="mt-4">
              <iframe
                title="ChaloCars Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.2488949655956!2d85.85813041424325!3d20.296059986394796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a79e5913e4db%3A0x93900d7d62f8b9ec!2sEsplanade%20One!5e0!3m2!1sen!2sin!4v1651263693563!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl border border-white/20"
              ></iframe>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeInProps} className="relative border-l-4 border-white pl-6 space-y-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🕒 Our Journey</h2>
          {["Started as a college project to simplify rentals.", "Launched MVP using MERN stack and onboarded users.", "Expanded pan-India with 5K+ users and scaling up."].map((desc, index) => (
            <div key={index} className="relative ml-4">
              <div className="absolute -left-4 top-2 w-3 h-3 bg-white rounded-full" />
              <h4 className="text-lg font-bold text-white">{2023 + index}</h4>
              <p className="text-gray-200">{desc}</p>
            </div>
          ))}
        </motion.section>

        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">💬 Happy Customers</h2>
          <Slider
            dots={true}
            infinite={true}
            autoplay={true}
            speed={1000}
            autoplaySpeed={3000}
            slidesToShow={2}
            slidesToScroll={1}
            responsive={[{ breakpoint: 768, settings: { slidesToShow: 1 } }]}
          >
            {customers.map((customer, index) => (
              <div key={index} className="px-4">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg">
                  <img src={customer.carImg} alt="car" className="w-full h-40 object-cover rounded-md mb-3" />
                  <div className="flex items-center gap-3 mb-2">
                    <img src={customer.image} alt={customer.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="text-white font-bold">{customer.name}</h4>
                      <p className="text-gray-200 text-sm italic">Verified Customer</p>
                    </div>
                  </div>
                  <p className="text-white italic">"{customer.review}"</p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.section>

        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">📊 Growth & Market Value</h2>
          <div className="w-full bg-white/20 p-4 rounded-xl shadow-inner">
            {[40, 70, 90].map((width, i) => (
              <div key={i}>
                <div className="w-full h-4 bg-white/30 rounded-full mb-2">
                  <div style={{ width: `${width}%` }} className="h-full bg-white rounded-full transition-all duration-1000" />

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

        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">💬 What Users Say</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {["Amit Sharma", "Neha Verma"].map((user, idx) => (
              <div key={idx} className="bg-white/20 p-4 rounded-xl shadow-md border-l-4 border-white">
                <p className="text-white italic">
                  {idx === 0 ? '"ChaloCars made my Goa trip seamless. Great car, great service!"' : '"Easy to book, affordable rates, and reliable options. Loved it!"'}
                </p>
                <h4 className="mt-2 text-white font-bold">– {user}</h4>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🤝 Our Partners</h2>
          <div className="flex justify-center items-center gap-10 flex-wrap">
            {["Microsoft", "Google", "Amazon"].map((partner, idx) => (
              <img
                key={idx}
                src={`https://upload.wikimedia.org/wikipedia/commons/${idx === 0
                    ? "4/44/Microsoft_logo.svg"
                    : idx === 1
                      ? "2/2f/Google_2015_logo.svg"
                      : "6/62/Amazon.com-Logo.svg"
                  }`}
                alt={partner}
                className="w-24 h-auto transition-transform duration-300 hover:scale-110"
              />

            ))}
          </div>
        </motion.section>

        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">👥 Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="text-center space-y-3 transform transition-transform duration-300 hover:scale-105">
                <img src={member.img} alt={member.name} className="w-28 h-28 rounded-full mx-auto shadow-lg object-cover" />
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

        <motion.section {...fadeInProps} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-6">💰 Investors & Funding</h2>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <img
                src="https://dummyimage.com/100x40/4B5563/ffffff&text=VentureX"
                alt="VentureX Capital"
                className="h-12 mx-auto mb-1"
              />
              <p className="text-sm text-white">VentureX Capital</p>
            </div>

            <div className="text-center">
              <img
                src="https://dummyimage.com/100x40/6B7280/ffffff&text=NextOrbit"
                alt="NextOrbit Angels"
                className="h-12 mx-auto mb-1"
              />
              <p className="text-sm text-white">NextOrbit Angels</p>
            </div>

            <div className="text-center">
              <img
                src="https://dummyimage.com/100x40/374151/ffffff&text=Roadmap"
                alt="Roadmap Labs"
                className="h-12 mx-auto mb-1"
              />
              <p className="text-sm text-white">Roadmap Labs</p>
            </div>
          </div>


          {/* Funding Timeline */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">📈 Funding Timeline</h3>
            <ul className="space-y-3 border-l-2 border-blue-400 pl-4">
              <li>
                <span className="font-bold">Q1 2025:</span> Idea Incubation & Team Formation
              </li>
              <li>
                <span className="font-bold">Q2 2025:</span> ₹5 Lakhs from Angel Round (VentureX Capital)
              </li>
              <li>
                <span className="font-bold">Q3 2025:</span> ₹10 Lakhs Pre-Seed Investment (NextOrbit Angels)
              </li>
              <li>
                <span className="font-bold">Q4 2025:</span> Expansion planning with Roadmap Labs mentorship
              </li>
            </ul>
          </div>

          {/* Call To Action */}
          <div className="mt-6 text-center">
            <p className="text-lg mb-2">🚀 Want to be part of our journey?</p>
            <a
              href="mailto:invest@chalocars.in"
              className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-300"
            >
              Join our Investor Network
            </a>
          </div>
        </motion.section>

      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;