"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const paragraphs = [
    `Uttarakhand, known as the "Land of Gods," is a paradise for nature lovers and spiritual seekers. From the snow-clad peaks of the Himalayas to the holy rivers of the Ganges, Uttarakhand offers a blend of adventure, peace, and spirituality.`,
    `Home to the famous Char Dham pilgrimage sites — Yamunotri, Gangotri, Kedarnath, and Badrinath — Uttarakhand holds immense religious significance for Hindus. The state's sacred rivers and temples attract devotees and spiritual seekers from all over the world.`,
    `Beyond its spiritual allure, Uttarakhand offers breathtaking natural beauty. From the serene lakes of Nainital to the lush valleys of Mussoorie and the rugged trails of Auli, the state is a haven for trekkers, nature enthusiasts, and adventure lovers.`,
    `Uttarakhand is also rich in culture and tradition. The vibrant festivals, folk music, and traditional Garhwali and Kumaoni cuisine reflect the deep-rooted heritage of the region. The warmth and hospitality of the local people make every visitor feel at home.`,
    `Whether you're seeking a peaceful retreat in the mountains, a spiritual journey to the holy sites, or an adrenaline-pumping adventure in the great outdoors, Uttarakhand promises an unforgettable experience.`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-20 h-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-20 h-20 border-8 border-gray-200 rounded-full"></div>
              <div className="w-20 h-20 border-8 border-t-[#205781] rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          <p className="mt-4 text-lg font-serif text-gray-700">
            Loading Uttarakhand...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608497582912-bf412dc8963e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-serif"
          >
            Explore Uttarakhand
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mt-3 md:mt-4 merriweather max-w-3xl"
          >
            Discover the land of gods and breathtaking beauty
          </motion.p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="py-10 sm:py-12 md:py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 font-sans">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 sm:mb-6 font-serif">
            Welcome to Uttarakhand
          </h2>

          <div className="merriweather text-base sm:text-lg md:text-xl space-y-3 sm:space-y-4">
            {/* Desktop & Tablet View */}
            <div className="hidden sm:block space-y-4">
              {paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Mobile View with Toggle */}
            <div className="block sm:hidden space-y-4">
              {(showMore ? paragraphs : [paragraphs[0]]).map((para, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto"
                >
                  {para}
                </p>
              ))}

              <div className="text-center">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-[#205781] font-semibold underline focus:outline-none"
                >
                  {showMore ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-12 font-serif">
            Top Highlights of Uttarakhand
          </h2>

          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!overflow-visible"
            >
              {[
                {
                  title: "Himalayas",
                  description: "Experience the majestic snow-capped peaks.",
                  image:
                    "https://images.unsplash.com/photo-1623727705498-51a6a4154384?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "Spiritual Temples",
                  description: "Visit ancient temples and sacred sites.",
                  image:
                    "https://images.unsplash.com/photo-1650341259809-9314b0de9268?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "Adventure & Trekking",
                  description: "Explore the trails and untouched wilderness.",
                  image:
                    "https://images.unsplash.com/photo-1628152979775-851a3980851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzc0fHx1dHRhcmFraGFuZHxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  title: "Serene Lakes",
                  description: "Relax by the pristine mountain lakes.",
                  image: "/deoriyatal.webp",
                },
                {
                  title: "Rich Culture",
                  description:
                    "Experience the unique traditions and festivals.",
                  image: "/richculture.webp",
                },
                {
                  title: "Wildlife Sanctuaries",
                  description: "Discover the diverse flora and fauna.",
                  image: "/Best-Wildlife-Sanctuary-in-Uttarakhand.jpg",
                },
              ].map((highlight, index) => (
                <SwiperSlide key={index}>
                  <div className="group bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-[1.02] font-serif h-full">
                    <div className="w-full h-48 sm:h-56 overflow-hidden">
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover group-hover:brightness-90 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-12 text-center font-serif">
            <Link
              href="/Destinations"
              className="inline-block bg-[#205781] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
            >
              View All destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
