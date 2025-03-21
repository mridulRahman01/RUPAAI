import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Loader Styles
const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="loader"></div>
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch challenges data from JSON
  useEffect(() => {
    fetch("/src/data/challenges.json")
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Failed to load challenges:", err));
  }, []);

  // Navigate with Loader
  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/problems");
    }, 1500);
  };

  return (
    <div className="bg-green-500 min-h-screen relative">
      {loading && <Loader />}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
        <div className="md:w-1/2 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            CODE, SOLVE & FUN
          </h1>
          <p className="mt-4 text-lg">
            Hello Kids! Every Game, App, And Website You Love Started With
            Someone Just Like You— Imagine What You Can Create.
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="bg-white text-green-500 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100">
              Get Started
            </button>
            <button
              onClick={handleNavigate}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-300"
            >
              Explore Challenges
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/src/assets/mergeimg2.png"
            alt="Kids Programming"
            className="w-80 md:w-full"
          />
        </div>
      </div>

      {/* Challenges Section - Centered */}
      <div className="mt-16 px-12 relative flex justify-center items-center">
        {/* Left Decorative Image */}
        <img
          src="/src/assets/undefined_image__14_-removebg-preview.png"
          alt="Left Decoration"
          className="absolute left-0 bottom-0 h-72 hidden md:block"
        />

        {/* Right Decorative Image */}
        <img
          src="/src/assets/undefined_image__3_-removebg-preview.png"
          alt="Right Decoration"
          className="absolute right-0 bottom-0 h-72 hidden md:block"
        />

        {/* Swiper Container */}
        <div className="relative w-full flex justify-center">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={200}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full max-w-4xl z-10"
          >
            {challenges.map((challenge) => (
              <SwiperSlide key={challenge.id} className="flex justify-center">
                <div className="w-[360px] bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 flex flex-col items-center text-center border border-white/50">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-[180px] object-cover rounded-md"
                  />
                  <h3 className="text-lg font-bold mt-4 text-white">
                    {challenge.title}
                  </h3>
                  <p className="text-white/80">{challenge.description}</p>
                  <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Start
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="mt-16 px-6">
        <button
          onClick={() => navigate("/leaderboard")}
          className="text-3xl font-bold text-center block w-full text-green-900 hover:text-green-700 transition"
        >
          LeaderBoard
        </button>
        <div className="flex flex-col items-center mt-6 space-y-4">
          <div className="w-80 bg-orange-300/80 backdrop-blur-md flex items-center justify-between p-4 rounded-lg shadow-md border border-white/50">
            <span className="font-semibold text-white">Alice</span>
            <span className="font-bold text-white">200 Points</span>
          </div>
          <div className="w-80 bg-orange-300/80 backdrop-blur-md flex items-center justify-between p-4 rounded-lg shadow-md border border-white/50">
            <span className="font-semibold text-white">Timmy</span>
            <span className="font-bold text-white">150 Points</span>
          </div>
          <div className="w-80 bg-orange-300/80 backdrop-blur-md flex items-center justify-between p-4 rounded-lg shadow-md border border-white/50">
            <span className="font-semibold text-white">Mary</span>
            <span className="font-bold text-white">100 Points</span>
          </div>
        </div>
      </div>
    </div>
  );
}
