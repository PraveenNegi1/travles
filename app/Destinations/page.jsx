"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DestinationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608942025318-1191eeade556?q=80&w=2055&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg"
          >
            Uttarakhand - The Land of Gods
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mt-4 text-center"
          >
            Explore the beauty of the Himalayas and sacred temples
          </motion.p>
          <Link
            href="/district"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg"
          >
            Discover More
          </Link>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Discover Uttarakhand
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto"
        >
          Uttarakhand, known as the "Land of Gods," is home to the majestic
          Himalayas, sacred rivers, and spiritual pilgrimage sites. From the
          holy cities of Haridwar and Rishikesh to the breathtaking valleys of
          Nainital and Mussoorie, Uttarakhand offers a perfect blend of natural
          beauty and spiritual peace.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-blue-50 to-white rounded-lg">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Top Attractions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Haridwar - The Gateway to the Gods",
              description:
                "Famous for the Ganga Aarti at Har Ki Pauri, Haridwar is one of the seven holiest places in India.",
              image: "https://source.unsplash.com/400x300/?haridwar",
            },
            {
              title: "Rishikesh - Yoga Capital of the World",
              description:
                "Known for its yoga ashrams and the iconic Laxman Jhula, Rishikesh attracts spiritual seekers from around the world.",
              image: "https://source.unsplash.com/400x300/?rishikesh",
            },
            {
              title: "Nainital - The Lake District",
              description:
                "Surrounded by mountains, Nainital is famous for its picturesque lakes and pleasant weather.",
              image: "https://source.unsplash.com/400x300/?nainital",
            },
          ].map((attraction, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={attraction.image}
                alt={attraction.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {attraction.title}
                </h3>
                <p className="text-gray-600 mt-2">{attraction.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Adventure Activities
        </motion.h2>
        <ul className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto space-y-3">
          <li>🎿 Skiing in Auli</li>
          <li>🚣‍♂️ River Rafting in Rishikesh</li>
          <li>🥾 Trekking in the Valley of Flowers</li>
          <li>⛺ Camping and Star Gazing in Chopta</li>
          <li>🐯 Wildlife Safari in Jim Corbett National Park</li>
        </ul>
      </div>

      {/* Spiritual Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Spiritual Journey
        </motion.h2>
        <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          Uttarakhand is home to the famous Char Dham Yatra – Badrinath,
          Kedarnath, Gangotri, and Yamunotri. Pilgrims from across the globe
          visit these sacred shrines seeking blessings and spiritual peace.
        </p>
      </div>
    </div>
  );
};

export default DestinationPage;
