"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const attractions = [
  {
    title: "Haridwar - The Gateway to the Gods",
    description:
      "Famous for the Ganga Aarti at Har Ki Pauri, Haridwar is one of the seven holiest places in India.",
    image: "/haridwar.webp",
  },
  {
    title: "Rishikesh - Yoga Capital of the World",
    description:
      "Known for its yoga ashrams and the iconic Laxman Jhula, Rishikesh attracts spiritual seekers from around the world.",
    image: "/reshikesh.webp",
  },
  {
    title: "Nainital - The Lake District",
    description:
      "Surrounded by mountains, Nainital is famous for its picturesque lakes and pleasant weather.",
    image:
      "https://images.unsplash.com/photo-1610712147665-04400af97a32?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Auli - The Skiing Paradise of India 🏔️🎿",
    description:
      "Auli is a popular Himalayan ski resort and hill station in the northern Indian state of Uttarakhand.",
    image: "/auli-adventure.jpg",
  },
  {
    title: "Chopta - Mini Switzerland of India",
    description:
      "Chopta, Uttarakhand, is a breathtaking hill station and the base for the Tungnath Temple, the highest Shiva temple in the world.",
    image: "/chopta.jpg",
  },
];
const activities = [
  {
    title: "Skiing in Auli",
    image: "/auli-skiing-tour.jpg",
    icon: "🎿",
    description:
      "Experience the thrill of skiing in Auli, a paradise for snow sports lovers with breathtaking views of the Himalayas.",
    highlights: [
      "World-class ski slopes covered with powdery snow",
      "Ski training courses for beginners and professionals",
      "Breathtaking views of Nanda Devi, Trishul, and Mana Parvat",
      "Asia's longest Gondola ride from Joshimath to Auli",
      "Auli Artificial Lake – one of the world's highest man-made lakes",
      "Winter Sports Festival and National Skiing Championship",
    ],
  },
  {
    title: "River Rafting in Rishikesh",
    image: "/riverRafting.jpg",
    icon: "🚣‍♂️",
    description:
      "Feel the adrenaline rush while rafting through the rapids of the Ganges in Rishikesh, India's adventure capital.",
    highlights: [
      "Experience thrilling rapids ranging from Grade I to IV",
      "Popular rafting stretches: Brahmapuri to Rishikesh, Shivpuri to Rishikesh, and Marine Drive to Rishikesh",
      "Certified and experienced rafting guides for a safe experience",
      "Camping along the banks of the Ganges with bonfires and adventure activities",
      "Scenic views of lush forests and the Shivalik range during the rafting expedition",
      "Best time for rafting: September to June",
      "Ideal destination for adventure lovers, families, and corporate outings",
    ],
  },

  {
    title: "Trekking in the Valley of Flowers",
    image: "/trackingof vallyofflower.jpg",
    icon: "🥾",
    description:
      "Explore the mesmerizing beauty of the Valley of Flowers, a UNESCO World Heritage Site known for its vibrant flora.",
    highlights: [
      "Trek through a breathtaking landscape covered with over 500 species of alpine flowers",
      "Recognized as a UNESCO World Heritage Site for its unique biodiversity",
      "Ideal for nature lovers, botanists, and adventure seekers",
      "Witness rare and exotic flowers like the Blue Poppy, Cobra Lily, and Brahma Kamal",
      "Scenic trails surrounded by snow-capped Himalayan peaks",
      "Home to endangered species like the Asiatic Black Bear, Snow Leopard, and Musk Deer",
      "Visit Hemkund Sahib, a revered Sikh pilgrimage site at an altitude of 4,329 meters",
      "Best time to visit: July to September, when the flowers are in full bloom",
      "Moderate trek suitable for both beginners and experienced trekkers",
    ],
  },
  {
    title: "Camping and Star Gazing in Chopta",
    image: "/camp-in-chopta.jpg",
    icon: "⛺",
    description:
      "Escape into the wilderness of Chopta, known as the mini Switzerland of India, and enjoy a night under the stars.",
    highlights: [
      "Experience serene camping amidst lush meadows and pine forests",
      "Marvel at a breathtaking 360-degree view of the Himalayan peaks, including Nanda Devi, Trishul, and Chaukhamba",
      "Trek to Tungnath, the highest Shiva temple in the world at 3,680 meters",
      "Enjoy mesmerizing sunrises and sunsets over the snow-capped mountains",
      "Witness a crystal-clear night sky, perfect for stargazing and astrophotography",
      "Best time for camping: March to June and September to November",
    ],
  },
  {
    title: "Wildlife Safari in Jim Corbett National Park",
    image: "/junglesafari1.jpg",
    icon: "🐯",
    description:
      "Witness the majestic Royal Bengal Tiger and diverse wildlife in their natural habitat at Jim Corbett National Park.",
    highlights: [
      "Explore India's oldest national park, established in 1936",
      "Spot the elusive Royal Bengal Tiger in its natural habitat",
      "Encounter diverse wildlife, including leopards, elephants, deer, and over 600 species of birds",
      "Experience thrilling jeep and canter safaris through dense Sal forests and grasslands",
      "Stay in eco-friendly forest lodges and enjoy a rustic jungle experience",
      "Visit Dhikala, the most famous safari zone, for breathtaking wildlife sightings",
      "Discover the Ramganga River, home to crocodiles, otters, and various aquatic birds",
    ],
  },
  {
    title: "Paragliding in Mukteshwar",
    image: "/camp-purple-paragliding-mukteshwar-8246726.webp",
    icon: "🪂",
    description:
      "Soar like a bird over the picturesque landscapes of Mukteshwar, offering stunning views of the Himalayas.",
    highlights: [
      "Experience an exhilarating flight over lush green valleys and snow-capped Himalayan peaks",
      "Mukteshwar is one of the best paragliding destinations in Uttarakhand",
      "Enjoy tandem paragliding with experienced pilots ensuring a safe and thrilling adventure",
      "Witness breathtaking sunrise and sunset views while gliding in the sky",
      "Soar at altitudes of up to 2,200 meters, feeling the rush of wind against your face",
      "Capture stunning aerial views of forests, villages, and fruit orchards",
      "Combine paragliding with camping, trekking, and rock climbing for a complete adventure experience",
    ],
  },
  {
    title: "Bungee Jumping in Rishikesh",
    image: "/bungee-jumping-in-rishikesh.jpg",
    icon: "🤸‍♂️",
    description:
      "Experience the thrill of free-fall from India's highest bungee jumping point in Rishikesh.",
    highlights: [
      "Jump from India's highest fixed platform bungee jumping site at 83 meters",
      "Feel the ultimate adrenaline rush as you free-fall over the rocky cliffs of Rishikesh",
      "Get certified as a daredevil with an official bungee jumping certificate",
      "Enjoy breathtaking views of the lush Shivalik range and the Ganges River",
      "Located at Jumpin Heights, one of the best adventure sports centers in India",
      "Combine bungee jumping with other thrilling activities like giant swing and flying fox",
    ],
  },
];

const DestinationPage = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
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
            className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg merriweather"
          >
            Uttarakhand - The Land of Gods
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mt-4 text-center merriweather"
          >
            Explore the beauty of the Himalayas and sacred temples
          </motion.p>
          <Link
            href="/district"
            className="mt-6 inline-block bg-[#205781] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg"
          >
            Discover More
          </Link>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-blue-50 to-white rounded-lg merriweather">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Top Destinations
        </motion.h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="py-8 space-y-16 "
        >
          {attractions.map((attraction, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="w-full h-65 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {attraction.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{attraction.description}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container mx-auto px-4 py-16 merriweather">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Adventure Activities
        </motion.h2>
        <div className="space-y-12 max-w-4xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-center gap-6`}
              initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div className="md:w-1/2">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedActivity(activity)}
                />
              </motion.div>
              <motion.div
                className="md:w-1/2 text-center md:text-left"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center justify-center md:justify-start">
                  <span className="mr-2 text-3xl">{activity.icon}</span>
                  {activity.title}
                </h3>
                <p className="text-lg text-gray-600 mt-2 md:hidden">
                  {activity.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
        {selectedActivity && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 shadow-xl w-[750px] text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* <button
                className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl"
                onClick={() => setSelectedActivity(null)}
              >
                &times;
              </button> */}
              <div className="flex justify-center item-center">
                <Image
                  src={selectedActivity.image}
                  alt={selectedActivity.title}
                  width={500}
                  height={300}
                  className="rounded-lg mb-4"
                />
              </div>
              <h3 className="text-2xl font-semibold">
                {selectedActivity.title}
              </h3>
              <p className="text-lg text-gray-600 mt-2">
                {selectedActivity.description}
              </p>
              <p className="text-lg text-gray-600 mt-2">
                {selectedActivity.highlights}
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-4 py-16 merriweather">
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
          visit these sacred shrines seeking blessings and spiritual peace. The
          journey through the majestic Himalayas, serene rivers, and lush green
          valleys enhances the divine experience, making it a soul-enriching
          pilgrimage. The state's rich spiritual heritage, ancient temples, and
          sacred rituals create an aura of devotion, drawing seekers and
          devotees year after year to immerse themselves in faith and
          tranquility.
        </p>
      </div>
    </div>
  );
};

export default DestinationPage;
