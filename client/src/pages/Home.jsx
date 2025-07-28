import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarSVG from '../assets/CarSVG.svg';
import backgroundImage from '../assets/car-bg.jpg';

import Slider from "react-slick";
import {
  FaCarSide, FaWallet, FaHeadset,
  FaAmazon, FaGoogle, FaApple, FaFacebookF, FaInstagram,
  FaLongArrowAltRight
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import Car1 from "../assets/Car1b.jpg";
import Car2 from "../assets/Car2b.jpg";
import Car3 from "../assets/Car3b.jpg";
import Car4 from "../assets/Car4b.jpg";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">

      {/* === HERO SECTION === */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-black/60 w-full h-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-12 mt-10 gap-28">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col gap-6"
          >
            <div className="text-white space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug">
                Zoom into <span className="text-pink-400">Speed</span> & <span className="text-cyan-400">Style</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300">
                Discover the fastest and most elegant way to rent cars. Plan your trip with comfort and confidence.
              </p>
              <button
                onClick={() => navigate('/cars')}
                className="relative overflow-hidden group px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg hover:shadow-pink-400 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 transition-opacity opacity-0 group-hover:opacity-100 duration-500 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Explore Cars <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            <Carousel
              autoPlay
              infiniteLoop
              interval={3000}
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              stopOnHover={false}
              swipeable={true}
              emulateTouch={true}
              className="w-full"
            >
              {[Car4, Car1, Car2, Car3].map((car, index) => (
                <div key={index}>
                  <img
                    src={car}
                    alt={`Car ${index + 1}`}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          </motion.div>

          <motion.img
            src={CarSVG}
            alt="Car SVG"
            className="hidden lg:block w-[90%] max-w-md lg:w-[32%]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* === TRUSTED SECTION === */}
      <section className="bg-white text-center py-12 px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
          Trusted by <span className="text-pink-500 font-bold">10,000+</span> Happy Renters & Leading Brands
        </h2>
        <div className="flex justify-center flex-wrap gap-8 items-center text-4xl text-gray-700">
          <FaAmazon className="hover:text-yellow-600" />
          <FaGoogle className="hover:text-blue-500" />
          <FaApple className="hover:text-gray-800" />
          <FaFacebookF className="hover:text-blue-600" />
          <FaInstagram className="hover:text-pink-600" />
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="bg-[#1f2937] text-white py-16 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-pink-400">CarRent?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[FaCarSide, FaWallet, FaHeadset].map((Icon, i) => (
              <div key={i} className="bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-700 hover:scale-105 transition-all duration-300 text-center">
                <div className="mb-3 text-3xl text-cyan-400"><Icon /></div>
                <h3 className="text-xl font-semibold mb-2">{['Wide Car Selection', 'Affordable Pricing', '24/7 Support'][i]}</h3>
                <p className="text-gray-300">{
                  [
                    'Choose from a variety of well-maintained and luxury vehicles across categories for any journey.',
                    'Transparent and competitive pricing with no hidden charges ensures peace of mind.',
                    'Get round-the-clock assistance and quick responses during your rental experience.'
                  ][i]
                }</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SHARED BACKGROUND SECTION (Recent Rentals + Footer) === */}
      <div
        className="bg-cover bg-center bg-no-repeat text-white relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10">

          {/* === RECENT RENTALS === */}
          <section className="py-16 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                Recent <span className="text-blue-400">Rentals</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  {
                    img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
                    name: "BMW 3",
                    info: "Rented in Delhi • ₹2900/day"
                  },
                  {
                    img: "https://content.carlelo.com/uploads/News_img/mahindra-thar-5-door-interior-details.webp",
                    name: "Mahindra Thar",
                    info: "Rented in Mumbai • ₹2000/day"
                  },
                  {
                    img: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg",
                    name: "Toyota Tacoma",
                    info: "Rented in Bangalore • ₹3500/day"
                  }
                ].map((car, i) => (
                  <div
                    key={i}
                    className="cursor-pointer bg-white/20 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition-all duration-300"
                    onClick={() => navigate("/cars")}
                  >
                    <img src={car.img} alt={car.name} className="rounded-lg mb-4 h-48 w-full object-cover" />
                    <h3 className="text-xl font-semibold text-white">{car.name}</h3>
                    <p className="text-gray-200 text-sm">{car.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === FOOTER TESTIMONIALS === */}
          <section className="backdrop-blur-lg text-white py-12 px-6 sm:px-10 rounded-t-xl border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-10">
                What Our Customers Say
              </h2>

              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={5000}
              >
                {[{
                  img: "https://i.pravatar.cc/80?img=5",
                  name: "Ananya Sharma",
                  loc: "Pune, India",
                  stars: "⭐⭐⭐⭐⭐",
                  review: "The best car rental experience I've ever had! Super smooth booking and the car was in excellent condition.",
                  color: "text-pink-400"
                }, {
                  img: "https://i.pravatar.cc/80?img=11",
                  name: "Ravi Kumar",
                  loc: "Bhubaneswar, Odisha",
                  stars: "⭐⭐⭐⭐",
                  review: "Great service and very affordable. I’ll definitely rent again on my next trip!",
                  color: "text-cyan-400"
                }, {
                  img: "https://i.pravatar.cc/80?img=32",
                  name: "Priya Mehta",
                  loc: "Delhi, India",
                  stars: "⭐⭐⭐⭐⭐",
                  review: "Easy website, fast support, and amazing cars. Highly recommended to anyone traveling in India.",
                  color: "text-pink-400"
                }].map((user, i) => (
                  <div key={i} className="px-4">
                    <div className="bg-[#1f2937] p-6 rounded-xl shadow-lg border border-gray-700 transition-all">
                      <img src={user.img} alt={user.name} className="w-16 h-16 mx-auto rounded-full mb-4" />
                      <p className="text-gray-300 mb-4">“{user.review}”</p>
                      <div className="text-yellow-400 mb-2">{user.stars}</div>
                      <h4 className={`${user.color} font-semibold`}>{user.name}</h4>
                      <p className="text-gray-400 text-sm">{user.loc}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          {/* === COPYRIGHT === */}
          <div className="bg-black/80 text-gray-300 text-center py-5 text-sm">
            © {new Date().getFullYear()} CarRent. All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
